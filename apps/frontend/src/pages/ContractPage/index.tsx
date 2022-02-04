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
  const { contractTableData, data, isLoading, isFetched, contractId, totalAmount } = useProductPageEffects();

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
              headingText={'Renewable Energy Contract Receipt'}
              sectionHelpText={
                <div>
                  This page is a summary of the receipt that shows that the buyer <b>{shortifyEthAddr(data.buyer.blockchainAddress ?? '')}</b> holds
                  a contract over the delivery of <b>{formatPower(totalAmount, { unit: Unit.MWh, includeUnit: true })}</b> of <UnderlinedText>Renewable Energy Certificates</UnderlinedText>,
                  which will be delivered to the buyer <b>no later than</b> the specified delivery date and enables the buyer to make a preliminary sustainability claim.
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
