import { Container, Grid, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import BuyerSellerInformation from '../../components/buyer-seller-information/buyer-seller-information';
import PageSection from '../../components/page-section/page-section';
import DownloadSection from '../../components/download-section/download-section';
import TableList from '../../components/table-list/table-list';
import TableListProofs from '../../components/table-list-proofs/TableListProofs';
import Loading from '../../components/loading/loading';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { useProductPageEffects } from './ProofPage.effects';
import { FC } from 'react';

export const useStyles = makeStyles({
  pdTop: {
    paddingTop: '16px',
  },
});

export const ProductPage = () => {
  const { data, isLoading, isFetched, purchaseId } = useProductPageEffects();
  const classes = useStyles();

  return !isLoading && isFetched && data ? (
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
                  This page is a summary of the proof that the buyer <b>0x1234...ABCD</b> has
                  bought  <b>35 Mwh</b>  worth of <UnderlinedText>Renewable Energy Certificates</UnderlinedText>,
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
                  <TableList
                    data={data.certificate}
                    recsSold={data.recsSold}
                    sellerId={data.seller.id}
                  />
                </Grid>
                <Grid className={classes.pdTop} item xs={12}>
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
