import { Container, Grid, Typography } from '@mui/material';
import { GenericTable } from '@zero-labs/zero-ui-components';
import PageSection from '../../components/page-section/page-section';
import Loading from '../../components/loading/loading';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import PurchaseBuyerInformation from '../../components/purchase-buyer-information/purchase-buyer-information';
import { purchaseInfoHeaders, usePurchasePageEffects } from './effects';

export const PurchasePage = () => {
  const { transactionsData, purchaseInfoTableData, isLoading, isFetched } = usePurchasePageEffects();

  return !isLoading && transactionsData && isFetched ? (
    <Container maxWidth={'xl'}>
    <Grid container>
      <Grid item xs={12}>
        <Breadcrumbs
          breadcrumbList={[
            'Product Offer',
            'Miner ID: [productId]',
            'Purchase history',
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
                color='primary'
              >
                Purchase information
              </Typography>
              <GenericTable headers={purchaseInfoHeaders} data={purchaseInfoTableData} />
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
