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

enum SankeyParticipantType {
  Generator = 'Generator',
  Seller = 'Seller',
  Platform = 'Platform',
  Client = 'Client'
}

const names = {
  '0xAa86D3ad47d27c1fEF9931F7AE0538370CFd432A': 'Generator',
  '0xDb2A3F1EA71A62aB0Bc83adeB845823f55D0b828': 'Seller',
  '0xd927C3100b81C7883DfBEF67F92a4Ea1943fAE9E': 'Platform',
  '0x8617658E4a8898CD8c41f95CdF4D3780791e6CF9': 'Client'
}

type ExtendedNodeProperties = {
  name: string;
  type: SankeyParticipantType;
  address: string;
};

type SankeyData = {
  nodes: SankeyNode<ExtendedNodeProperties, Record<string, unknown>>[];
  links: SankeyLink[];
}

const createSankeyData = (events: PurchasesControllerGetBlockchainEvents200Item[]): SankeyData => {
  const nodes: SankeyData['nodes'] = [];
  events.forEach(event => {
    if (nodes.find(node => node.address === event.to)) return;

    nodes.push({
      name: names[event.to],
      address: event.to,
      type: SankeyParticipantType.Generator
    })
  });
  const linksArr = events.filter(event => event.from !== AddressZero)
  const links = linksArr.map(event => event.to === AddressZero ? null : ({
    source: nodes.findIndex(node => node.address === event.from),
    target: nodes.findIndex(node => node.address === event.to),
    value: event.recs
  })).filter(item => !!item);
  return {
    nodes: nodes.filter(node => node.address !== AddressZero),
    links
  }
}

interface SankeyViewProps {
  blockchainEvents: PurchasesControllerGetBlockchainEvents200Item[];
}

const SankeyView: FC<SankeyViewProps> = ({ blockchainEvents }) => {
  const sankeyData = createSankeyData(blockchainEvents)

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
                      link={link}
                      color={color(colorScale(link.source.index)).hex()}
                      maxWidth={30}
                    />
                  ))}
                {graph &&
                  graph.nodes.map((node, i) => (
                    <Node
                      key={`sankey-node-${i}`}
                      link={node}
                      color={color(colorScale(i)).hex()}
                      name={node.name}
                      height={30}
                      graph={graph}
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
