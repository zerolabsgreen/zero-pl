import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
  FilecoinNodesControllerGetTransactions200TransactionsItem,
  FullPurchaseDto,
  purchasesControllerFindOne,
  useFilecoinNodesControllerGetTransactions
} from '@energyweb/zero-protocol-labs-api-client';
import { GenericTable, TableHeader, TableRowData } from '@zero-labs/zero-ui-components';
import EthereumAddress from '../../components/common/EthereumAddress';
import LoadingBlock from '../../components/common/LoadingBlock';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import PageSection from '../../components/common/PageSection';
import PurchaseBuyerInformation from '../../components/BuyerPage/PurchaseBuyerInformation';
import ButtonRight from '../../components/BuyerPage/ButtonRight';
import { formatPower, DisplayUnit } from '../../utils';

dayjs.extend(utc);

const BuyerPage: NextPage = () => {
  const [transactionsData, setTransactionsData] = useState<FullPurchaseDto[]>([]);
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, isFetched } = useFilecoinNodesControllerGetTransactions((id as string) ?? '');
  const transactions = data?.transactions;

  const fetchAllTransactionsData = async (transactions: FilecoinNodesControllerGetTransactions200TransactionsItem[]) => {
    const newTxsData = await Promise.all(
      transactions.map(
        async (tx) => await purchasesControllerFindOne(`${tx.id}`)
      )
    )
    setTransactionsData(newTxsData);
  }

  useEffect(() => {
    if(transactions && transactions.length > 0) {
      fetchAllTransactionsData(transactions);
    }
  }, [transactions])

  const purchaseInfoTableData: TableRowData<FullPurchaseDto['id']>[] = transactionsData.map(tx => ({
    id: tx.id,
    purchaseId: <EthereumAddress shortify clipboard address={tx.id} />,
    sellerName: tx.seller.name,
    generatorId: tx.certificate.generatorId,
    country: tx.certificate.country,
    energySource: tx.certificate.energySource,
    amountPurchased: tx.certificate.energy ? formatPower(tx.certificate.energy, { unit: DisplayUnit.MWh, includeUnit: true }) : '',
    generationPeriod: `${dayjs(tx.certificate.generationStart).isValid()
      ? dayjs(tx.certificate.generationStart)
          .utc()
          .format('YYYY-MM-DD')
      : '-'} / ${dayjs(tx.certificate.generationEnd).isValid()
      ? dayjs(tx.certificate.generationEnd)
          .utc()
          .format('YYYY-MM-DD')
      : '-'}`,
    action: (<ButtonRight onClick={() => router.push(`/proofs/${tx.id}`)} />)
  }))

  return !isLoading && transactionsData.length > 0 && isFetched ? (
    <Container maxWidth={'xl'}>
    <Grid container>
      <Grid item xs={12}>
        <Breadcrumbs
          breadcrumbList={[
            'Product Offer',
            `Miner ID: ${id}`,
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
    <LoadingBlock />
  );
};

export default BuyerPage;

const purchaseInfoHeaders: TableHeader = {
  purchaseId: { label: 'Purchase ID' },
  sellerName: { label: 'Seller name' },
  generatorId: { label: 'Generator ID' },
  country: { label: 'Country' },
  energySource: { label: 'Energy Source' },
  amountPurchased: { label: 'Amount Purchased' },
  generationPeriod: { label: 'Period of Generation' },
  action: { label: '' }
}
