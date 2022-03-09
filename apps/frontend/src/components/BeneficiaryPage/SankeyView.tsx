import type { FC } from "react";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import type { SankeyNode, SankeyLink } from "d3-sankey";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BigNumber } from "@ethersproject/bignumber";
import { FindContractDto, PurchaseWithCertificateDto } from "@energyweb/zero-protocol-labs-api-client";
import Sankey from "../Sankey";
import Link from "../Sankey/Link";
import Node, { isEmptyContractNode, isContractNode } from "../Sankey/Node";
import { formatPower, Unit } from "../../utils";

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
  Certificate: '#61CB80',
  Proof: '#7FD9A2',
}

const sankeyWidth = 1000
const sankeyHeight = 700
const sankeyNodeSpacer = 40

const getNodeHeight = (blocksInColumn: number, blockEnergyAmount: number, columnEnergyAmount: number, spacer?: number) => {
  const nodeSpacer = spacer ?? sankeyNodeSpacer
  const result = (sankeyHeight - (nodeSpacer*blocksInColumn)) * (blockEnergyAmount / columnEnergyAmount)
  return result < 40 ? 40 : result
}

export type ExtendedNodeProperties = {
  id: string;
  targetIds: string[];
  type: SankeyItemType;
  volume: string;
  period: string;
  status?: string;
  generator?: string;
  energySources: string[];
  location: string;
};

type SankeyData = {
  nodes: SankeyNode<ExtendedNodeProperties, Record<string, any>>[];
  links: SankeyLink<ExtendedNodeProperties, Record<string, any>>[];
}

type ColumnData = {
  [SankeyItemType.Contract]: {
    amountOfBlocksInColumn: number;
    columnTotalEnergy: number;
    openAmount: number;
    deliveredAmount: number;
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
    ),
    period: `${dayjs(contract.reportingStart).utc().format('YYYY.MM.DD')} - ${dayjs(contract.reportingEnd).utc().format('YYYY.MM.DD')}`,
    energySources: contract.energySources,
    location: contract.countryRegionMap.map(pair => `${pair.country}, ${pair.region}`).join('; '),
    // status?: string;
  }))

  const allPurchases: PurchaseWithCertificateDto[] = contracts.flatMap(contract => contract.purchases)

  const certificatesNodes: ExtendedNodeProperties[] = allPurchases.map(purchase => ({
    id: purchase.certificate.id,
    targetIds: [purchase.id],
    type: SankeyItemType.Certificate,
    volume: formatPower(purchase.certificate.energyWh, { includeUnit: true, unit: Unit.MWh }),
    period: `${dayjs(purchase.reportingStart).utc().format('YYYY.MM.DD')} - ${dayjs(purchase.reportingEnd).utc().format('YYYY.MM.DD')}`,
    energySources: [purchase.certificate.energySource],
    location: `${purchase.certificate.country}, ${purchase.certificate.region}`,
    generator: purchase.certificate.generatorName
  }))

  const proofsNodes: ExtendedNodeProperties[] = allPurchases.map(purchase => ({
    id: purchase.id,
    type: SankeyItemType.Proof,
    volume: formatPower(purchase.certificate.energyWh, { includeUnit: true, unit: Unit.MWh }),
    targetIds: [],
    period: `${dayjs(purchase.reportingStart).utc().format('YYYY.MM.DD')} - ${dayjs(purchase.reportingEnd).utc().format('YYYY.MM.DD')}`,
    energySources: [purchase.certificate.energySource],
    location: `${purchase.certificate.country}, ${purchase.certificate.region}`,
    generator: purchase.certificate.generatorName
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
      columnTotalEnergy: contractsNodes.reduce((prev, current) => prev + parseInt(current.volume ?? '0') , 0),
      openAmount: contracts.reduce((prev, current) => prev + parseInt(formatPower(current.openVolume, { unit: Unit.MWh })), 0),
      deliveredAmount: contracts.reduce((prev, current) => prev + parseInt(formatPower(current.deliveredVolume, { unit: Unit.MWh })), 0),
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
  beneficiary?: string;
}

const SankeyView: FC<SankeyViewProps> = ({ contracts, beneficiary }) => {
  const { sankeyData, columnData } = createSankeyData(contracts)
  const hasNodesAndLinks = sankeyData.nodes.length > 0 && sankeyData.links.length > 0
  if (!hasNodesAndLinks) {
    return (
    <Box textAlign="center" my="20px">
      <Typography component="span" variant="h4" color="primary">
        There are no transactions available
      </Typography>
    </Box>
    )
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      pt="20px"
      sx={{ backgroundColor: '#fff' }}
    >
      <Box margin="auto">
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
                    graph.links.map((link, i) => {
                      const linkWidth = getNodeHeight(
                        columnData[(link.target as any).type as SankeyItemType].amountOfBlocksInColumn,
                        (link.target as any).value,
                        columnData[(link.target as any).type as SankeyItemType].columnTotalEnergy
                      )
                      const linkColor = sankeyColors[(link.source as any).type as keyof(BeneficiarySankeyColors)]
                      return (
                        <Link
                          key={`sankey-link-${i}`}
                          beneficiary={beneficiary}
                          link={link}
                          color={linkColor}
                          width={linkWidth}
                        />
                      )
                    })
                  }
                  {graph &&
                    graph.nodes.map(node => {
                      const nodeHeight = !isEmptyContractNode(node)
                        ? isContractNode(node)
                          ? node.sourceLinks?.reduce(
                              (prev, current) => prev + getNodeHeight(
                                  columnData[SankeyItemType.Certificate].amountOfBlocksInColumn,
                                  current.value,
                                  columnData[SankeyItemType.Certificate].columnTotalEnergy,
                                ),
                            0)
                          : getNodeHeight(
                            columnData[node.type].amountOfBlocksInColumn,
                            parseInt(node.volume),
                            columnData[node.type].columnTotalEnergy
                          )
                        : 30

                      return (
                        <Node
                          key={`sankey-node-${node.id}`}
                          link={node}
                          color={sankeyColors[node.type]}
                          height={nodeHeight}
                          name={node.type}
                          graph={graph}
                          volume={node.volume}
                        />
                      )
                    })
                  }
                </g>
              );
            }}
          </Sankey>
        </Box>
        <Box
          width={sankeyWidth}
          display="flex"
          justifyContent="space-between"
          marginX="auto"
          paddingRight="150px"
        >
          <Box>
            <TotalText color="primary">
              <b>{columnData.Contract.deliveredAmount}</b> MWh DELIVERED
            </TotalText>
            <TotalText color="textSecondary">
              <b>{columnData.Contract.openAmount}</b> MWh OPEN
            </TotalText>
          </Box>
          <TotalText color="primary">
            <b>{columnData.Certificate.columnTotalEnergy}</b> MWh
          </TotalText>
          <TotalText color="primary" marginRight="10px">
            <b>{columnData.Proof.columnTotalEnergy}</b> MWh
          </TotalText>
        </Box>
      </Box>
  )
}
export default SankeyView

const TotalText = styled(Typography)(({ theme }) => `
  font-weight: 600;
  font-size: 14px;
`)
