import type { FC } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GenericTable } from '@zero-labs/zero-ui-components';
import { BuyerSellerInformation } from '../../components/BuyerSellerInformation';
import { PageSection } from '../../components/PageSection';
import { DownloadSection } from '../../components/DownloadSection';
// import { TableListProofs } from '../../components/TableListProofs';
import { LoadingBlock } from '../../components/LoadingBlock';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { shortifyEthAddr } from '../../components/EthereumAddress';
import { useProductPageEffects, certificateInfoTableHeaders } from './effects';
import { formatPower, Unit } from '../../utils';
import { SankeyProof } from '../../components/ProofPage';

export const ProofPage = () => {
  const { certificateInfoTableData, data, redemptionFile, attestationFile, isLoading, isFetched, purchaseId } = useProductPageEffects();
  return !isLoading && isFetched && certificateInfoTableData && data ? (
    <Container maxWidth={'xl'}>
      <Grid container>
        <Box sx={{ width: '100%' }}>
          <Grid item xs={12}>
            <Breadcrumbs
              breadcrumbList={[
                'Product Offer',
                `Proof ID: ${purchaseId}`,
                'EAC Delivery Proof',
              ]}
            />
            <PageSection
              headingText={'Proof of Renewable Energy Consumption'}
              sectionHelpText={
                <div>
                  This page is a summary of the proof that the buyer <b>{shortifyEthAddr(data.buyer.blockchainAddress ?? '')}</b> has
                  bought <b>{formatPower(data.certificate.energyWh, { unit: Unit.MWh, includeUnit: true })}</b>  worth of <UnderlinedText>Renewable Energy Certificates</UnderlinedText>,
                  and that they have been <UnderlinedText>redeemed</UnderlinedText> in their name
                </div>
              }
            >
              <BuyerSellerInformation
                generationPeriod={{
                  fromDate: data.certificate.generationStart,
                  toDate: data.certificate.generationEnd,
                }}
                filecoinMinerIdList={data.filecoinNodes}
                buyer={data.buyer}
                seller={data.seller}
              />
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    mt={'50px'}
                    mb={'18px'}
                    fontWeight={700}
                    fontSize={'20px'}
                    color='primary'
                  >
                    Certificate information
                  </Typography>
                  <GenericTable
                    headers={certificateInfoTableHeaders}
                    data={certificateInfoTableData}
                  />
                </Grid>
                <Grid container justifyContent="space-between" spacing={2}>
                  <Grid item md={6} xs={12} sx={{ pt: '16px' }}>
                    <DownloadSection
                      title="Download Official Attestation"
                      fileList={attestationFile ? [attestationFile] : []}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} sx={{ pt: '16px' }}>
                    <DownloadSection
                      title="Download Redemption Statement"
                      fileList={redemptionFile ? [redemptionFile] : []}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </PageSection>
          </Grid>
        </Box>
        <Box width={'100%'}>
          {/* <TableListProofs purchaseId={purchaseId} /> */}
          <SankeyProof proof={data} />
        </Box>
      </Grid>
    </Container>
  ) : (
    <LoadingBlock />
  );
};

const UnderlinedText: FC = ({ children }) => {
  return (
    <span style={{ textDecoration: 'underline' }}>
      {children}
    </span>
  )
}

export default ProofPage;
