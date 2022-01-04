import { Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PageSection from '../../components/page-section/page-section';
import Loading from '../../components/loading/loading';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import TableListPurchase from '../../components/table-list-purchase/table-list-purchase';
import PurchaseBuyerInformation from '../../components/purchase-buyer-information/purchase-buyer-information';
import { usePurchasePageEffects } from './purchase-page.effects';

export const useStyles = makeStyles({
  pdTop: {
    paddingTop: '16px',
  },
});

export const PurchasePage = () => {
  const { transactionsData, isLoading, isFetched } = usePurchasePageEffects();

  return !isLoading && transactionsData && isFetched ? (
    <Container maxWidth={'xl'}>
    <Grid container>
      <Grid item xs={12}>
        <Breadcrumbs
          breadcrumbList={[
            'Product Offer',
            'PurchaseID: [productId]',
            'REC Delivery Proof',
          ]}
        />
        <PageSection headingText={'Purchase History'}>
          <PurchaseBuyerInformation
            generationPeriod={{
              fromDate: transactionsData[0]?.certificate.generationStart,
              toDate: transactionsData[0]?.certificate.generationEnd,
            }}
            buyerId={transactionsData[0]?.buyer.id}
            buyerName={transactionsData[0]?.buyer.name}
            filecoinMinerIdList={transactionsData[0]?.filecoinNodes}
            recsAmount={transactionsData[0]?.recsTransactions}
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
                Purchase information
              </Typography>
              <TableListPurchase data={transactionsData} />
            </Grid>
          </Grid>
        </PageSection>
      </Grid>
    </Grid>
    </Container>
  ) : (
    <Loading />
  );
};

export default PurchasePage;
