import * as d3 from "d3";
import chroma from "chroma-js";
import type { FC } from "react";
import { AddressZero } from "@ethersproject/constants";
import Box from "@mui/material/Box";
import { PurchasesControllerGetBlockchainEvents200Item } from "@energyweb/zero-protocol-labs-api-client";
import type { SankeyNode, SankeyLink } from "d3-sankey";
import Sankey from "../../common/Sankey";
import Link from "../../common/Sankey/Link";
import Node from "../../common/Sankey/Node";
import { certificateTransactions } from "./blockchainEvents";

enum SankeyParticipantType {
  Generator = 'Generator',
  Seller = 'Seller',
  Platform = 'Platform',
  Client = 'Client'
}

const names = {
  '0xAa86D3ad47d27c1fEF9931F7AE0538370CFd432A': 'Generator',
  '0xDb2A3F1EA71A62aB0Bc83adeB845823f55D0b828': 'Seller',
  '0xd927C3100b81C7883DfBEF67F92a4Ea1943fAE9E': 'Platform 1',
  '0x3ac6213896efb97151237f14d7eaa28e826cc63e': 'Platform 2',
  '0x8617658E4a8898CD8c41f95CdF4D3780791e6CF9': 'Buyer 2',
  '0x47a75ab6aed0b02e99cac618e94934c19fd5ed62': 'Client 1',
  '0x1cebd219499b76f0d8bf5f85e1cd3ae890ae4f92': 'Client 2',
  '0x78131cc7c6bb630574134e409a26c17d96e47cba': 'Client 3',
  '0xa8e865df2485b0f5809686abdffe8cb2930b6d15': 'Client 4',
  '0xcfdaf19c2eb5c75acd93bb93c368762f686b807f': 'Client 5',
  '0x346f8075725c16c5f99dc61e7dc8cdc6d2753fb6': 'Client 6',
  '0x13125d74928db2782abc14f3e342560f871a804e': 'Client 7',
}

type ExtendedNodeProperties = {
  name: string;
  type: SankeyParticipantType;
  address: string;
};

type SankeyData = {
  nodes: SankeyNode<ExtendedNodeProperties, Record<string, unknown>>[];
  links: SankeyLink<ExtendedNodeProperties, Record<string, unknown>>[];
}

const createSankeyData = (events: PurchasesControllerGetBlockchainEvents200Item[]): SankeyData => {
  const nodes: SankeyData['nodes'] = [];
  events.forEach(event => {
    if (nodes.find(node => node.address === event.to)) return;

    nodes.push({
      name: names[event.to] || event.to,
      address: event.to,
      type: names[event.to],
    })
  });

  const linksArr = events.filter(event => event.from !== AddressZero)
  const mergedLinksEvents = linksArr.map(link => {
    const allLinksWithSameAddresses = linksArr.filter(l => l.from === link.from && l.to === link.to)
    const moreThanOne = allLinksWithSameAddresses.length > 1;
    // const
    const mergedLink = allLinksWithSameAddresses.reduce((prev, current) => (
      {...prev, amount: parseInt(current.recs) + parseInt(prev.recs) }
    ), { from: link.from, to: link.to, recs: '0'  })
    return link
  })
  const truthyLinks = linksArr.map(event => event.to === AddressZero ? null : ({
    source: nodes.findIndex(node => node.address === event.from),
    target: nodes.findIndex(node => node.address === event.to),
    value: event.recs
  })).filter(item => !!item);

  const nonZeroNodes = nodes.filter(node => (node as any).to !== AddressZero || (node as any).from !== AddressZero)
  return {
    nodes: nonZeroNodes,
    links: truthyLinks as any
  }
}

interface SankeyViewProps {
  blockchainEvents: PurchasesControllerGetBlockchainEvents200Item[];
}

const SankeyView: FC<SankeyViewProps> = ({ blockchainEvents }) => {
  const sankeyData = createSankeyData([...blockchainEvents, ...certificateTransactions])

  return (
    <Box display="flex" justifyContent="center" pt="20px" sx={{ backgroundColor: '#fff' }}>
      <Sankey
          data={sankeyData}
          nodeWidth={100}
          nodePadding={40}
        >
          {({ graph }) => {
            const color = chroma.scale("Set2").classes(graph?.nodes?.length);
            const colorScale = d3
              .scaleLinear()
              .domain([0, graph?.nodes?.length])
              .range([0, 1]);

            return (
              <g>
                {graph &&
                  graph.links.map((link, i) => (
                    <Link
                      key={`sankey-link-${i}`}
                      link={link as any}
                      color={color(colorScale((link.source as any).index)).hex()}
                      maxWidth={30}
                    />
                  ))}
                {graph &&
                  graph.nodes.map((node, i) => (
                    <Node
                      key={`sankey-node-${i}`}
                      link={node as any}
                      color={color(colorScale(i)).hex()}
                      name={node.name}
                      height={30}
                      graph={graph}
                      address={node.address}
                    />
                  ))}
              </g>
            );
          }}
        </Sankey>
      </Box>
  )
}
export default SankeyView
