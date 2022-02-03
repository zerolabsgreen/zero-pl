import type { FC } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GenericTable } from '@zero-labs/zero-ui-components';
import { BuyerSellerInformation } from '../../components/BuyerSellerInformation';
import { PageSection } from '../../components/PageSection';
import { LoadingBlock } from '../../components/LoadingBlock';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { shortifyEthAddr } from '../../components/EthereumAddress';
import { formatPower, Unit } from '../../utils';
import { useProductPageEffects, contractTableHeaders } from './effects';

export const ContractPage = () => {
  const { contractTableData, data, isLoading, isFetched, contractId } = useProductPageEffects();

  return !isLoading && isFetched && contractTableData && data ? (
    <Container maxWidth={'xl'}>
      <Grid container>
        <Box sx={{ width: '100%' }}>
          <Grid item xs={12}>
            <Breadcrumbs
              breadcrumbList={[
                'Contract',
                `ID: ${contractId}`,
              ]}
            />
            <PageSection
              headingText={'Proof of Renewable Energy Consumption'}
              sectionHelpText={
                <div>
                  This page is a summary of the proof that the buyer <b>{shortifyEthAddr(data.buyer.blockchainAddress ?? '')}</b> has
                  bought <b>{formatPower(data.openVolume, { unit: Unit.MWh, includeUnit: true })}</b>  worth of <UnderlinedText>Renewable Energy Certificates</UnderlinedText>,
                  and that they have been <UnderlinedText>redeemed</UnderlinedText> in their name
                </div>
              }
            >
              <BuyerSellerInformation
                generationPeriod={{
                  fromDate: data.reportingStart,
                  toDate: data.reportingEnd,
                }}
                filecoinMinerIdList={[data.filecoinNode]}
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
                    headers={contractTableHeaders}
                    data={contractTableData}
                  />
                </Grid>
              </Grid>
            </PageSection>
          </Grid>
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

export default ContractPage;
