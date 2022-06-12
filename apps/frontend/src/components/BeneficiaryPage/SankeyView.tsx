import type { FC } from "react";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import type { SankeyNode, SankeyLink } from "d3-sankey";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { BigNumber } from "@ethersproject/bignumber";
import { maxBy, uniq } from 'lodash'
import { BatchDto, CertificateWithPurchasesDto, FindContractDto, PurchaseDto } from "@energyweb/zero-protocol-labs-api-client";
import Sankey from "../Sankey";
import Link from "../Sankey/Link";
import Node, { ExtendedNodeProperties, isEmptyContractNode, SankeyItemType } from "../Sankey/Node";
import { formatPower, getRegionString, Unit } from "../../utils";
import { useBatchesByIds } from "../../hooks/fetch/useBatchesByIds";
import { useCertificatesByIds } from "../../hooks/fetch/useCertificatesByIds";

type BeneficiarySankeyColors = {
  NotDeliveredContract: string;
  Contract: string;
  Certificate: string;
  Proof: string;
  Redemption: string;
  NonTargetColor?: string;
}

const sankeyColors: BeneficiarySankeyColors = {
  NotDeliveredContract: '#D0CBF0',
  Contract: '#19355E',
  Certificate: '#61CB80',
  Proof: '#7FD9A2',
  Redemption: '#4480DB',
}

const sankeyNonTargetColors: BeneficiarySankeyColors = {
  NotDeliveredContract: '#D0CBF0',
  NonTargetColor: '#CFCFCF',
  Contract: '#4e5766',
  Certificate: '#9fbfa8',
  Proof: '#9cb8a7',
  Redemption: '#829cc4',
}

const sankeyWidth = 1000

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
  [SankeyItemType.Redemption]: {
    amountOfBlocksInColumn: number;
    columnTotalEnergy: number;
  };
  heightMultiplier: number
}

const createSankeyData = (
  contracts: FindContractDto[],
  batches: BatchDto[],
  certificates: CertificateWithPurchasesDto[],
  fullView: boolean,
  beneficiary: string
): { sankeyData: SankeyData; columnData: ColumnData }  => {
  const onlyDeliveredContracts = contracts.filter(c => Number(c.deliveredVolume) !== 0)
  const contractsNodes: ExtendedNodeProperties[] = onlyDeliveredContracts.map(contract => ({
    id: contract.id,
    targetIds: contract.purchases.map(p => batches.find(b => b.id === p.certificate.batchId)?.redemptionStatementId ?? ''),
    type: SankeyItemType.Contract,
    volume: formatPower(
      BigNumber.from(contract.openVolume ?? 0)
      .add(BigNumber.from(contract.deliveredVolume ?? 0))
      .toString(),
      { includeUnit: true, unit: Unit.MWh, withoutComma: true }
    ),
    period: `${dayjs(contract.reportingStart).utc().format('YYYY.MM.DD')} - ${dayjs(contract.reportingEnd).utc().format('YYYY.MM.DD')}`,
    energySources: contract.energySources,
    location: contract.countryRegionMap.map(pair => `${pair.country}${getRegionString(pair.region)}`).join('; '),
    beneficiary: contract.filecoinNode.id
  }))

  const redemptionNodes: ExtendedNodeProperties[] = batches.map(batch => ({
    id: batch.redemptionStatementId,
    targetIds: certificates.filter(c => c.batchId === batch.id).map(c => c.id),
    type: SankeyItemType.Redemption,
    volume: formatPower(batch.mintedVolume, { includeUnit: true, unit: Unit.MWh, withoutComma: true })
  }))

  const allPurchases: PurchaseDto[] = certificates.flatMap(c => c.purchases)
  const purchasesToUse = fullView
    ? allPurchases
    : allPurchases.filter(p => p.filecoinNodeId === beneficiary)

  const certificatesNodes: ExtendedNodeProperties[] = certificates.map(certificate => ({
    id: certificate.id,
    targetIds: purchasesToUse.filter(p => p.certificateId === certificate.id).map(p => p.id),
    type: SankeyItemType.Certificate,
    volume: formatPower(certificate.energyWh, { includeUnit: true, unit: Unit.MWh, withoutComma: true }),
    period: `${dayjs(certificate.generationStart).utc().format('YYYY.MM.DD')} - ${dayjs(certificate.generationEnd).utc().format('YYYY.MM.DD')}`,
    energySources: [certificate.energySource],
    location: `${certificate.country}${getRegionString(certificate.region)}`,
    generator: certificate.generatorName
  }))

  const proofsNodes: ExtendedNodeProperties[] = purchasesToUse.map(purchase => {
    const certificate = certificates.find(c => c.id === purchase.certificateId)
    return {
      id: purchase.id,
      type: SankeyItemType.Proof,
      volume: formatPower(purchase.recsSoldWh, { includeUnit: true, unit: Unit.MWh, withoutComma: true }),
      targetIds: [],
      period: `${dayjs(purchase.reportingStart).utc().format('YYYY.MM.DD')} - ${dayjs(purchase.reportingEnd).utc().format('YYYY.MM.DD')}`,
      energySources: [certificate?.energySource ?? ''],
      location: `${certificate?.country ?? ''}${getRegionString(certificate?.region ?? '')}`,
      generator: certificate?.generatorName ?? '',
      beneficiary: purchase.filecoinNodeId
    }
  })

  const nodes: ExtendedNodeProperties[] = [...contractsNodes, ...redemptionNodes, ...certificatesNodes, ...proofsNodes];

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
    value: link.type === SankeyItemType.Contract
    ? parseInt(nodes.find(node => node.id === link.id)?.volume ?? '0')
    : parseInt(nodes.find(node => node.id === link.targetIds)?.volume ?? '0'),
    beneficiary: link.type === SankeyItemType.Contract
      ? link.beneficiary
      : nodes.find(node => node.id === link.targetIds)?.beneficiary
  })).filter(item => !!item);

  const sankeyData = { nodes, links }

  const columnData: ColumnData = {
    [SankeyItemType.Contract]: {
      amountOfBlocksInColumn: contractsNodes.length,
      columnTotalEnergy: contractsNodes.reduce((prev, current) => prev + parseInt(current.volume ?? '0') , 0),
      openAmount: contracts.reduce((prev, current) => prev + parseInt(formatPower(current.openVolume, { unit: Unit.MWh })), 0),
      deliveredAmount: contracts.reduce((prev, current) => prev + parseInt(formatPower(current.deliveredVolume, { unit: Unit.MWh, withoutComma: true })), 0),
    },
    [SankeyItemType.Certificate]: {
      amountOfBlocksInColumn: certificatesNodes.length,
      columnTotalEnergy: certificatesNodes.reduce((prev, current) => prev + parseInt(current.volume ?? '0') , 0)
    },
    [SankeyItemType.Proof]: {
      amountOfBlocksInColumn: proofsNodes.length,
      columnTotalEnergy: proofsNodes.reduce((prev, current) => prev + parseInt(current.volume ?? '0') , 0)
    },
    [SankeyItemType.Redemption]: {
      amountOfBlocksInColumn: redemptionNodes.length,
      columnTotalEnergy: redemptionNodes.reduce((prev, current) => prev + parseInt(current.volume ?? '0') , 0)
    },
    heightMultiplier: contractsNodes.length,
  }
  const mltpArr = [
    columnData.Contract,
    columnData.Certificate,
    columnData.Proof
  ]

  columnData.heightMultiplier = maxBy(mltpArr, 'amountOfBlocksInColumn')?.amountOfBlocksInColumn ?? 0

  return {
    sankeyData,
    columnData
  }
}

interface SankeyViewProps {
  contracts: FindContractDto[];
  fullView: boolean;
  beneficiary: string;
}

const SankeyView: FC<SankeyViewProps> = ({ contracts, fullView, beneficiary }) => {
  const batchesIds = contracts.flatMap(c => c.purchases.map(p => p.certificate.batchId ?? '')) ?? []
  const filteredBatchesIds = uniq(batchesIds.filter(id => Boolean(id)))
  const { batches } = useBatchesByIds(filteredBatchesIds)
  const userPurchases = contracts.flatMap(contract => contract.purchases)
  const certificatesIds = uniq(userPurchases.map(p => p.certificate.id))
  const { certificates } = useCertificatesByIds(certificatesIds)

  if (!batches.length || !certificates.length) return <Loader />

  const { sankeyData, columnData } = createSankeyData(contracts, batches, certificates, fullView, beneficiary)
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

  const multipliedHeight = columnData.heightMultiplier*80
  const sankeyHeight = multipliedHeight > 750 ? multipliedHeight : 750;

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
                      const linkSource = link.source as any
                      const linkTarget = link.target as any
                      const nonTargetId =
                        linkSource.type === SankeyItemType.Contract && !contracts.some(c => c.id === linkSource.id)
                        || linkSource.type === SankeyItemType.Certificate && !userPurchases.some(p => p.id === linkTarget.id)
                      const linkColor = nonTargetId
                        ? sankeyNonTargetColors[linkSource.type as keyof(BeneficiarySankeyColors)]
                        : sankeyColors[linkSource.type as keyof(BeneficiarySankeyColors)]
                      const centerLink = linkSource.type === SankeyItemType.Contract && contracts.length < 4
                        || (linkSource.type === SankeyItemType.Certificate && userPurchases.length < 4 &&  !fullView)
                      return (
                        <Link
                          key={`sankey-link-${i}`}
                          beneficiary={linkSource.type === SankeyItemType.Contract
                            ? linkSource.beneficiary
                            : linkTarget.beneficiary}
                          link={link}
                          color={linkColor ?? '#000'}
                          centered={centerLink}
                          hidePopoverBtn={linkSource.type === SankeyItemType.Redemption}
                        />
                      )
                    })
                  }
                  {graph &&
                    graph.nodes.map(node => {
                      const nonTargetNode = node.type === SankeyItemType.Contract && !contracts.some(c => c.id === node.id)
                        || node.type === SankeyItemType.Proof && !userPurchases.some(p => p.id === node.id)
                      const nodeColor = nonTargetNode
                        ? sankeyNonTargetColors[node.type]
                        : isEmptyContractNode(node)
                          ? sankeyColors.NotDeliveredContract
                          : sankeyColors[node.type]
                      return (
                        <Node
                          key={`sankey-node-${node.id}`}
                          link={node}
                          color={nodeColor}
                          name={node.type}
                          graph={graph}
                          volume={node.volume}
                          minHeight={isEmptyContractNode(node) ? 30 : undefined}
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
          paddingRight="160px"
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
            <b>{columnData.Redemption.columnTotalEnergy}</b> MWh
          </TotalText>
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

const TotalText = styled(Typography)`
  font-weight: 600;
  font-size: 14px;
`

const Loader = () => (
  <Box width="100%" mt="30px" textAlign="center">
    <CircularProgress />
  </Box>
)
