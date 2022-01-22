import { FC } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { GenericTable } from '@zero-labs/zero-ui-components';
import BuyerSellerInformation from '../../components/buyer-seller-information/buyer-seller-information';
import PageSection from '../../components/page-section/page-section';
import DownloadSection from '../../components/download-section/download-section';
import TableListProofs from '../../components/table-list-proofs/TableListProofs';
import Loading from '../../components/loading/loading';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { useProductPageEffects, certificateInfoTableHeaders } from './effects';
import { shortifyEthAddr } from '../../components/ethereum-address/ethereum-address';

export const ProductPage = () => {
  const { certificateInfoTableData, data, isLoading, isFetched, purchaseId } = useProductPageEffects();

  return !isLoading && isFetched && certificateInfoTableData && data ? (
    <Container maxWidth={'xl'}>
      <Grid container>
        <Box sx={{ width: '100%' }}>
          <Grid item xs={12}>
            <Breadcrumbs
              breadcrumbList={[
                'Product Offer',
                'Proof ID: [productId]',
                'EAC Delivery Proof',
              ]}
            />
            <PageSection
              headingText={'Proof of Renewable Energy Consumption'}
              sectionHelpText={
                <div>
                  This page is a summary of the proof that the buyer <b>{shortifyEthAddr(data.buyer.blockchainAddress ?? '')}</b> has
                  bought <b>{data.recsSold} Mwh</b>  worth of <UnderlinedText>Renewable Energy Certificates</UnderlinedText>,
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
                recsTransactions={data.recsTransactions}
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
                <Grid item xs={12} sx={{ pt: '16px' }}>
                  <DownloadSection fileList={data.files} />
                </Grid>
              </Grid>
            </PageSection>
          </Grid>
        </Box>
        <Box width={'100%'}>
          <TableListProofs purchaseId={purchaseId} />
        </Box>
      </Grid>
    </Container>
  ) : (
    <Loading />
  );
};

const UnderlinedText: FC = ({ children }) => {
  return (
    <span style={{ textDecoration: 'underline' }}>
      {children}
    </span>
  )
}

export default ProductPage;
