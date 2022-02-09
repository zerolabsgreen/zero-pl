import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { SelectChangeEvent } from '@mui/material/Select';
import { FilecoinNodesControllerGetTransactions200TransactionsItem, FullPurchaseDto, purchasesControllerFindOne, useBuyersControllerFindOne, useFilecoinNodesControllerFindOne, useFilecoinNodesControllerFindOneWithContracts, useFilecoinNodesControllerGetTransactions } from '@energyweb/zero-protocol-labs-api-client';
import LoadingBlock from '../../components/common/LoadingBlock';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import PageSection from '../../components/common/PageSection';
import CertificatesWithFilters, { CertificateBlocksEnum } from '../../components/UserPage/CertificatesWithFilters';
import UserInfoBlock from '../../components/UserPage/UserInfoBlock';
import YearlyCertificatesTable, { CertificatePerYear } from '../../components/UserPage/YearlyCertificatesTable';
import { ReactComponent as RedeemedCertificateSVG } from '../../assets/certificate_locked.svg';
import { ReactComponent as ContractsSVG } from '../../assets/certificate_timer.svg';
import { formatPower } from '../../utils';
import { useEffect, useState } from 'react';

dayjs.extend(utc);

const currentYear = new Date(Date.now()).getFullYear();
const yearsToUse: CertificatePerYear[] = [
  { year: currentYear-1, amount: 0 },
  { year: currentYear, amount: 0 },
  { year: currentYear+1, amount: 0 },
  { year: currentYear+2, amount: 0 },
]

const BuyerPage: NextPage = () => {
  const router = useRouter();
  const { id, certType } = router.query;
  const certificateType = certType as CertificateBlocksEnum ?? CertificateBlocksEnum.Redeemed;

  const filecoinNodeId = id as string;
  const handleCertificateTypeChange = (event: SelectChangeEvent) => {
    router.push({
        pathname: `/user/${id}`,
        query: { certType: encodeURI(event.target.value as CertificateBlocksEnum) },
    });
  };

  const handleRedeemedSelect = () => {
    router.push({
      pathname: `/user/${id}`,
      query: { certType: encodeURI(CertificateBlocksEnum.Redeemed) },
    });
  }
  const handleContractsSelect = () => {
    router.push({
      pathname: `/user/${id}`,
      query: { certType: encodeURI(CertificateBlocksEnum.Contracts) },
    });
  }

  const {
    data: filecoinNode,
    isLoading: isFilecoinNodeLoading
  } = useFilecoinNodesControllerFindOne(filecoinNodeId, {
    query: { enabled: !!filecoinNodeId }
  });

  const {
    data: buyer,
    isLoading: isBuyerLoading
  } = useBuyersControllerFindOne(filecoinNode?.buyerId, {
    query: { enabled: !!filecoinNode?.buyerId }
  });

  const [transactionsData, setTransactionsData] = useState<FullPurchaseDto[]>([]);
  const { data: filecoinNodeTransactions, isLoading: areTransactionsLoading } = useFilecoinNodesControllerGetTransactions(filecoinNodeId);
  const transactions = filecoinNodeTransactions?.transactions;

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

  const yearlyRedeemedData = yearsToUse.map(yearItem => {
    const allTransactionsFromYear = transactionsData.filter(purchase => dayjs(purchase.certificate.generationStart).get('year') === yearItem.year);
    return {
      ...yearItem,
      amount: allTransactionsFromYear?.reduce(
        (prev, current) => prev + parseFloat(formatPower(current.certificate.energy)), yearItem.amount)
    }
  });

  const { data: filecoinNodeContracts, isLoading: areContractsLoading } = useFilecoinNodesControllerFindOneWithContracts(filecoinNodeId);

  const yearlyContractsData = yearsToUse.map(yearItem => {
    const allContractsFromYear = filecoinNodeContracts?.contracts?.filter(contract => dayjs(contract.contractDate).get('year') === yearItem.year);
    return {
      ...yearItem,
      amount: allContractsFromYear?.reduce(
        (prev, current) => prev + (parseFloat(formatPower(current.openVolume)) + parseFloat(formatPower(current.deliveredVolume))), yearItem.amount)
    }
  });

  const isLoading = isFilecoinNodeLoading || isBuyerLoading || areTransactionsLoading || areContractsLoading;

  return !isLoading && buyer && filecoinNode && filecoinNodeContracts && filecoinNodeTransactions ? (
    <Container maxWidth={'xl'}>
    <Grid container>
      <Grid item xs={12}>
        <Breadcrumbs
          breadcrumbList={[
            'Product Offer',
            `Miner ID: ${id}`,
            'User Page',
          ]}
        />
        <PageSection headingText={'User Page'}>
          <UserInfoBlock
            userName={buyer.name}
            userAddress={buyer.blockchainAddress}
            filecoinNodes={buyer.filecoinNodes}
            buyerId={buyer.id}
          />
          <Grid container spacing={"30px"} pt="24px">
              <Grid item xs={12} md={4}>
                <YearlyCertificatesTable
                  icon={RedeemedCertificateSVG}
                  title="Redeemed RECS"
                  subtitle="Amounts of RECs redeemed in the name of this user"
                  items={yearlyRedeemedData}
                  selected={certificateType === CertificateBlocksEnum.Redeemed}
                  handleClick={handleRedeemedSelect}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <YearlyCertificatesTable
                  icon={ContractsSVG}
                  title="Contracts"
                  subtitle="Future RECs that the seller has contractually promised to this user"
                  items={yearlyContractsData}
                  selected={certificateType === CertificateBlocksEnum.Contracts}
                  handleClick={handleContractsSelect}
                />
              </Grid>
            </Grid>
        </PageSection>
        <CertificatesWithFilters
          certificateType={certificateType}
          handleCertificateTypeChange={handleCertificateTypeChange}
          contracts={filecoinNodeContracts.contracts}
          transactionsData={transactionsData}
        />
      </Grid>
    </Grid>
    </Container>
  ) : (
    <LoadingBlock />
  );
};

export default BuyerPage;

