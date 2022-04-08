import { FullPurchaseDto, useContractsControllerFindOne } from "@energyweb/zero-protocol-labs-api-client"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { createSankeyData } from "../BeneficiaryPage/SankeyView"
import PageSection from "../PageSection"
import Sankey from "../Sankey"
import Link from "../Sankey/Link"
import Node from "../Sankey/Node"

interface Props {
  proof: FullPurchaseDto
}

const sankeyWidth = 1000

type SankeyColors = {
  NonTargetColor: string;
  Contract: string;
  Certificate: string;
  Proof: string;
}

enum SankeyItemType {
  Contract = 'Contract',
  Certificate = 'Certificate',
  Proof = 'Proof'
}

const sankeyColors: SankeyColors = {
  NonTargetColor: '#CFCFCF',
  Contract: '#4480DB',
  Certificate: '#61CB80',
  Proof: '#7FD9A2',
}

export const SankeyProof = ({ proof }: Props) => {
  const {
    data: contract,
  } = useContractsControllerFindOne(
    proof.contractId ?? '',
    {query:{enabled: Boolean(proof.contractId)}}
  )

  const beneficiary = proof.filecoinNodes.map(node => node.id)?.join(', ')

  if (contract) {
    const { sankeyData } = createSankeyData([contract])
    const sankeyHeight = contract.purchases.length*150

    return (
      <PageSection>
        <Typography fontSize={'20px'} fontWeight={700} component="span" color="primary">
          Sankey view
        </Typography>
        <Box textAlign="center" pt="40px">
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
                        const linkColor = (link.source as any).id === proof.certificate.id
                          || (link.target as any).id === proof.certificate.id
                            ? sankeyColors[(link.source as any).type as keyof(SankeyColors)]
                            : sankeyColors.NonTargetColor
                        return (
                          <Link
                            key={`sankey-link-${i}`}
                            link={link}
                            color={linkColor}
                            beneficiary={beneficiary}
                          />
                        )
                      })
                    }
                    {graph &&
                      graph.nodes.map(node => {
                        const nonTargetNode = node.type === SankeyItemType.Certificate && node.id !== proof.certificate.id
                         || node.type === SankeyItemType.Proof && node.id !== proof.id
                        const nodeColor = nonTargetNode
                            ? sankeyColors.NonTargetColor
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

  return (null)
}
