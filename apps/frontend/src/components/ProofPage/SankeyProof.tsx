import {
  BatchDto,
  CertificateWithPurchasesDto,
  FindContractDto,
  FullPurchaseDto,
  useBatchControllerFindOne,
  useContractsControllerFindOne,
} from "@energyweb/zero-protocol-labs-api-client"
import { BigNumber } from "@ethersproject/bignumber"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { SankeyLink, SankeyNode } from "d3-sankey"
import dayjs from "dayjs"
import { useState } from "react"
import { useContractsByIds } from "../../hooks/fetch/useContractsByIds"
import { Unit } from "../../utils/enums"
import { formatPower, getRegionString } from "../../utils/formatters"
import PageSection from "../PageSection"
import Sankey from "../Sankey"
import Link from "../Sankey/Link"
import Node, { ExtendedNodeProperties, SankeyItemType } from "../Sankey/Node"
import SecondaryButton from "../SecondaryButton"
import { useCertificatesWithPurchases } from "../../hooks/fetch/useCertificatesWithPurchases"

const sankeyWidth = 1000

type SankeyData = {
  nodes: SankeyNode<ExtendedNodeProperties, Record<string, any>>[];
  links: SankeyLink<ExtendedNodeProperties, Record<string, any>>[];
}

export const createSankeyData = (
  contracts: FindContractDto[],
  batch: BatchDto,
  certificates: CertificateWithPurchasesDto[],
  purchases: FullPurchaseDto[]
): { sankeyData: SankeyData }  => {
  const contractsNodes: ExtendedNodeProperties[] = contracts.map(contract => ({
    id: contract.id,
    targetIds: [batch.redemptionStatementId],
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
    beneficiary: contract.purchases.map(p => p.filecoinNodeId).join(', ')
  }))

  const redemptionNode: ExtendedNodeProperties[] = [{
    id: batch.redemptionStatementId,
    targetIds: certificates.map(c => c.id),
    type: SankeyItemType.Redemption,
    volume: formatPower(batch.mintedVolume, { includeUnit: true, unit: Unit.MWh, withoutComma: true }),
  }]

  const certificatesNodes: ExtendedNodeProperties[] = certificates.map(certificate => ({
    id: certificate.id,
    targetIds: certificate.purchases ? certificate.purchases.map(p => p.id) : purchases.map(p => p.id),
    type: SankeyItemType.Certificate,
    volume: formatPower(certificate.energyWh, { includeUnit: true, unit: Unit.MWh, withoutComma: true }),
    period: `${dayjs(certificate.generationStart).utc().format('YYYY.MM.DD')} - ${dayjs(certificate.generationEnd).utc().format('YYYY.MM.DD')}`,
    energySources: [certificate.energySource],
    location: `${certificate.country}${getRegionString(certificate.region)}`,
    generator: certificate.generatorName
  }))

  const proofsNodes: ExtendedNodeProperties[] = purchases.map(purchase => ({
    id: purchase.id,
    type: SankeyItemType.Proof,
    volume: formatPower(purchase.recsSoldWh, { includeUnit: true, unit: Unit.MWh, withoutComma: true }),
    targetIds: [],
    period: `${dayjs(purchase.reportingStart).utc().format('YYYY.MM.DD')} - ${dayjs(purchase.reportingEnd).utc().format('YYYY.MM.DD')}`,
    energySources: [purchase.certificate.energySource],
    location: `${purchase.certificate.country}${getRegionString(purchase.certificate.region)}`,
    generator: purchase.certificate.generatorName,
    // missing type for purchase
    beneficiary: (purchase as any).filecoinNodeId
  }))

  const nodes: ExtendedNodeProperties[] = [...contractsNodes, ...redemptionNode, ...certificatesNodes, ...proofsNodes];

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
  })).filter(item => !!item)

  const sankeyData = { nodes, links }

  return { sankeyData }
}

type SankeyColors = {
  NonTargetColor: string;
  Contract: string;
  Certificate: string;
  Proof: string;
  Redemption: string;
}

const sankeyColors: SankeyColors = {
  NonTargetColor: '#CFCFCF',
  Contract: '#19355E',
  Certificate: '#61CB80',
  Proof: '#7FD9A2',
  Redemption: '#4480DB',
}

const sankeyNonTargetColors: SankeyColors = {
  NonTargetColor: '#CFCFCF',
  Contract: '#4e5766',
  Certificate: '#9fbfa8',
  Proof: '#9cb8a7',
  Redemption: '#829cc4',
}

interface Props {
  proof: FullPurchaseDto
  redemptionStatementId?: string
}

export const SankeyProof = ({ proof }: Props) => {
  const [isExtendedSankey, setIsExtendedSankey] = useState(false)
  const btnText = isExtendedSankey ? 'See less' : 'See more'
  const handleBtnClick = () => setIsExtendedSankey(!isExtendedSankey)

  const {
    data: proofContract,
    isLoading: isContractLoading
  } = useContractsControllerFindOne(
    proof.contractId ?? '',
    {query:{enabled: Boolean(proof.contractId)}}
  )

  const { data: batch, isLoading: isBatchLoading } = useBatchControllerFindOne(
    proof.certificate.batchId || '',
    { query: { enabled: !!proof.certificate.batchId } }
  )

  const certificates = batch?.certificates
  const certificateIds = certificates?.map(c => c.id) ?? []

  const {
    data: certificatesWithPurchases,
    isLoading: areCertificatesLoading
  } = useCertificatesWithPurchases(certificateIds)

  const purchases = certificatesWithPurchases?.flatMap(c => c?.purchases?.map(p => ({...p,certificate: proof.certificate}))) ?? []
  const contractsIds = purchases.map(p => p.contractId ?? '')
  const validContractIds = contractsIds?.filter(c => Boolean(c))
  const { contracts } = useContractsByIds(validContractIds ?? [])

  const isLoading = isContractLoading || isBatchLoading || areCertificatesLoading

  if (proofContract && batch && !isLoading) {
    const { sankeyData } = !isExtendedSankey
      ? createSankeyData([proofContract], batch, [proof.certificate as CertificateWithPurchasesDto], [proof])
      : createSankeyData(contracts, batch, certificatesWithPurchases, purchases as any as FullPurchaseDto[])
    const sankeyHeight = isExtendedSankey && purchases.length > 2 ? purchases.length*50 : undefined

    if (isExtendedSankey && contracts.length < 1) return (<Loader />)

    return (
      <PageSection>
        <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontSize='20px' fontWeight={700} component="span" color="primary">
            Sankey view
          </Typography>
          <SecondaryButton onClick={handleBtnClick}>
            {btnText}
          </SecondaryButton>
        </Box>
        <Box textAlign="center" pt="40px">
          <Sankey
              data={sankeyData}
              nodeWidth={160}
              nodePadding={30}
              width={sankeyWidth}
              height={sankeyHeight}
            >
              {({ graph }) => {
                return (
                  <g>
                    {graph &&
                      graph.links.map((link, i) => {
                        const linkSource = link.source as any as SankeyLink<ExtendedNodeProperties, Record<string, any>>
                        const linkTarget = link.target as any as SankeyLink<ExtendedNodeProperties, Record<string, any>>
                        const linkColor = linkTarget.id === proof.id
                          || (link.target as any).id === proof.certificate.id
                          || linkSource.id === proofContract?.id
                            ? sankeyColors[linkSource.type as keyof(SankeyColors)]
                            : sankeyNonTargetColors[linkSource.type as keyof(SankeyColors)]
                        return (
                          <Link
                            key={`sankey-link-${i}`}
                            link={link}
                            color={linkColor}
                            beneficiary={linkSource.type === SankeyItemType.Contract
                              ? linkSource.beneficiary
                              : linkTarget.beneficiary}
                            centered={!isExtendedSankey}
                            hidePopoverBtn={linkSource.type === SankeyItemType.Redemption}
                          />
                        )
                      })
                    }
                    {graph &&
                      graph.nodes.map(node => {
                        const nonTargetNode = node.type === SankeyItemType.Certificate && node.id !== proof.certificate.id
                         || node.type === SankeyItemType.Proof && node.id !== proof.id
                         || node.type === SankeyItemType.Contract && node.id !== proofContract.id
                        const nodeColor = nonTargetNode
                            ? sankeyNonTargetColors[node.type]
                            : sankeyColors[node.type]
                        return (
                          <Node
                            key={`sankey-node-${node.id}`}
                            link={node}
                            color={nodeColor}
                            name={node.type}
                            graph={graph}
                            volume={node.volume}
                            textColor={nonTargetNode ? '#A0A0A0' : undefined}
                          />
                        )
                      })
                    }
                  </g>
                );
              }}
            </Sankey>
          </Box>
      </PageSection>
      )
  }

  return (
    <Loader />
  )
}


const Loader = () => {
  return (
    <Box width="100%" mt="30px" textAlign="center">
      <CircularProgress />
    </Box>
  )
}
