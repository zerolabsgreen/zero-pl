import { Container, Grid, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import BuyerSellerInformation from '../../components/buyer-seller-information/buyer-seller-information';
import PageSection from '../../components/page-section/page-section';
import DownloadSection from '../../components/download-section/download-section';
import TableList from '../../components/table-list/table-list';
import TableListProofs from '../../components/table-list-proofs/TableListProofs';
import Info from '../../components/info/info';
import Loading from '../../components/loading/loading';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { useProductPageEffects } from './product-page.effects';

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
                'PurchaseID: [productId]',
                'REC Delivery Proof',
              ]}
            />
            <PageSection
              headingText={'REC Redeemed'}
              sectionHelpText={
                <div style={{ letterSpacing: '0.3px' }}>
                  This page is a summary of the proof that some{' '}
                  <Info
                    popoverContent={`RECs (Renewable Energy Certificates) , also known as EAC (Energy Attribute Certificate),
GOs (Guarantees of Origin) in the EU, and many other names in different markets.
RECs represent the proof that 1 unit of clean electricity (normally MWh)
was produced from renewable energy sources at a specific time point.
After electrons enter the grid, there is no way to trace it back to the source.
Hence, RECs serve as a tracking tool to prove renewable energy generation
and consumption, and are widely used for renewable energy procurement.`}
                    noIcon
                  >
                    RECs
                  </Info>{' '}
                  (Renewable Energy Certificates)
                  <br /> have been purchased and redeemed in the name of a
                  specific user.
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
                    mt={'30px'}
                    mb={'18px'}
                    fontWeight={700}
                    fontSize={'20px'}
                    color={'#2D1155'}
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

export default ProductPage;
