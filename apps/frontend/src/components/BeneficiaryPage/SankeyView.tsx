import type { FC } from "react";
import type { SankeyNode, SankeyLink } from "d3-sankey";
import Box from "@mui/material/Box";
import { BigNumber } from "@ethersproject/bignumber";
import { FindContractDto, PurchaseWithCertificateDto } from "@energyweb/zero-protocol-labs-api-client";
import Sankey from "../Sankey";
import Link from "../Sankey/Link";
import Node, { isEmptyContractNode } from "../Sankey/Node";
import { formatPower, Unit } from "../../utils";
import { Typography } from "@mui/material";

export enum SankeyItemType {
  Contract = 'Contract',
  Certificate = 'Certificate',
  Proof = 'Proof'
}

type BeneficiarySankeyColors = {
  NotDeliveredContract: string;
  Contract: string;
  Certificate: string;
  Proof: string;
}

const sankeyColors: BeneficiarySankeyColors = {
  NotDeliveredContract: '#D0CBF0',
  Contract: '#4480DB',
  Certificate: '#40FFBF',
  Proof: '#00D08A',
}

const sankeyWidth = 1100
const sankeyHeight = 700
const sankeyNodeSpacer = 40

const getNodeHeight = (blocksInColumn: number, blockEnergyAmount: number, columnEnergyAmount: number) => {
  const result = (sankeyHeight - (sankeyNodeSpacer*blocksInColumn)) * (blockEnergyAmount / columnEnergyAmount)
  return result < 25 ? 25 : result
}

export type ExtendedNodeProperties = {
  id: string;
  targetIds: string[];
  type: SankeyItemType;
  volume: string;
};

type SankeyData = {
  nodes: SankeyNode<ExtendedNodeProperties, Record<string, any>>[];
  links: SankeyLink<ExtendedNodeProperties, Record<string, any>>[];
}

type ColumnData = {
  [SankeyItemType.Contract]: {
    amountOfBlocksInColumn: number;
    columnTotalEnergy: number;
  };
  [SankeyItemType.Certificate]: {
    amountOfBlocksInColumn: number;
    columnTotalEnergy: number;
  };
  [SankeyItemType.Proof]: {
    amountOfBlocksInColumn: number;
    columnTotalEnergy: number;
  };
}

const createSankeyData = (contracts: FindContractDto[]): { sankeyData: SankeyData; columnData: ColumnData }  => {
  const contractsNodes: ExtendedNodeProperties[] = contracts.map(contract => ({
    id: contract.id,
    targetIds: contract.purchases.map(purchase => purchase.certificate.id),
    type: SankeyItemType.Contract,
    volume: formatPower(
      BigNumber.from(contract.openVolume ?? 0)
      .add(BigNumber.from(contract.deliveredVolume ?? 0))
      .toString(),
      { includeUnit: true, unit: Unit.MWh }
    )
  }))

  const allPurchases: PurchaseWithCertificateDto[] = contracts.flatMap(contract => contract.purchases)

  const certificatesNodes: ExtendedNodeProperties[] = allPurchases.map(purchase => ({
    id: purchase.certificate.id,
    targetIds: [purchase.id],
    type: SankeyItemType.Certificate,
    volume: formatPower(purchase.certificate.energyWh, { includeUnit: true, unit: Unit.MWh })
  }))

  const proofsNodes: ExtendedNodeProperties[] = allPurchases.map(purchase => ({
    id: purchase.id,
    type: SankeyItemType.Proof,
    volume: formatPower(purchase.certificate.energyWh, { includeUnit: true, unit: Unit.MWh }),
    targetIds: []
  }))

  const nodes: ExtendedNodeProperties[] = [...contractsNodes, ...certificatesNodes, ...proofsNodes];

  const linksArr = nodes.filter(node => node.targetIds.length > 0)
  const clonedLinks = linksArr.flatMap(link => {
    if (link.targetIds?.length === 1) {
      return { ...link, targetIds: link.targetIds[0] }
    }
    if (link.targetIds?.length > 1) {
      return link.targetIds.map(targetId => ({ ...link, targetIds: targetId }))
    }
    return link
  })
  const links = clonedLinks.map(link => ({
    source: nodes.findIndex(node => node.id === link.id),
    target: nodes.findIndex(node => node.id === link.targetIds),
    value: parseInt(nodes.find(node => node.id === link.targetIds)?.volume ?? '0')
  })).filter(item => !!item);

  const sankeyData = { nodes, links }

  const columnData: ColumnData = {
    [SankeyItemType.Contract]: {
      amountOfBlocksInColumn: contractsNodes.length,
      columnTotalEnergy: contractsNodes.reduce((prev, current) => prev + parseInt(current.volume ?? '0') , 0)
    },
    [SankeyItemType.Certificate]: {
      amountOfBlocksInColumn: certificatesNodes.length,
      columnTotalEnergy: certificatesNodes.reduce((prev, current) => prev + parseInt(current.volume ?? '0') , 0)
    },
    [SankeyItemType.Proof]: {
      amountOfBlocksInColumn: proofsNodes.length,
      columnTotalEnergy: proofsNodes.reduce((prev, current) => prev + parseInt(current.volume ?? '0') , 0)
    },
  }

  return {
    sankeyData,
    columnData
  }
}

interface SankeyViewProps {
  contracts: FindContractDto[];
}

const SankeyView: FC<SankeyViewProps> = ({ contracts }) => {
  const { sankeyData, columnData } = createSankeyData(contracts)
  const hasNodesAndLinks = sankeyData.nodes.length > 0 && sankeyData.links.length > 0
  console.log(contracts)
  if(!hasNodesAndLinks) {
    return (
    <Box textAlign="center" my="20px">
      <Typography component="span" variant="h4" color="primary">
        There are no transactions available
      </Typography>
    </Box>
    )
  }

  return (
    <Box display="flex" justifyContent="center" pt="20px" sx={{ backgroundColor: '#fff' }}>
      <Sankey
          data={sankeyData}
          nodeWidth={160}
          nodePadding={40}
          width={sankeyWidth}
          height={sankeyHeight}
        >
          {({ graph }) => {
            return (
              <g>
                {graph &&
                  graph.links.map((link, i) => (
                    <Link
                      key={`sankey-link-${i}`}
                      link={link}
                      color={sankeyColors[(link.source as any).type as keyof(BeneficiarySankeyColors)]}
                      maxWidth={22}
                    />
                  ))}
                {graph &&
                  graph.nodes.map((node) => (
                    <Node
                      key={`sankey-node-${node.id}`}
                      link={node}
                      color={isEmptyContractNode(node)
                        ? sankeyColors.NotDeliveredContract
                        : sankeyColors[node.type]
                      }
                      name={`${node.type} ${node.volume}`}
                      height={!isEmptyContractNode(node)
                        ? getNodeHeight(
                            columnData[node.type].amountOfBlocksInColumn,
                            parseInt(node.volume),
                            columnData[node.type].columnTotalEnergy
                          )
                        : 30
                      }
                      graph={graph}
                      volume={node.volume}
                      fullAddress={`${node.type} ID: ${node.id}`}
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
