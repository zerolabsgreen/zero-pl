import { useParams } from 'react-router';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  FilecoinNodesControllerGetTransactions200TransactionsItem,
  FullPurchaseDto,
  purchasesControllerFindOne,
  useBuyersControllerFindOne,
  useFilecoinNodesControllerFindOne,
  useFilecoinNodesControllerFindOneWithContracts,
  useFilecoinNodesControllerGetTransactions
} from '@energyweb/zero-protocol-labs-api-client';
import LoadingBlock from '../../components/LoadingBlock';
import Breadcrumbs from '../../components/Breadcrumbs';
import PageSection from '../../components/PageSection';
import CertificatesWithFilters, { CertificateBlocksEnum } from '../../components/BeneficiaryPage/CertificatesWithFilters';
import UserInfoBlock from '../../components/BeneficiaryPage/UserInfoBlock';
import YearlyCertificatesTable, { CertificatePerYear } from '../../components/BeneficiaryPage/YearlyCertificatesTable';
import { ReactComponent as RedeemedCertificateSVG } from '../../assets/svg/certificate_locked.svg';
import { ReactComponent as ContractsSVG } from '../../assets/svg/certificate_timer.svg';
import { formatPower, Unit } from '../../utils';
import SankeyView from '../../components/BeneficiaryPage/SankeyView';
import SecondaryButton from '../../components/SecondaryButton';
import { useBeneficiaryNewUIRedirect } from '../../hooks/useBeneficiaryNewUIRedirect';

dayjs.extend(utc);

const currentYear = new Date(Date.now()).getFullYear();
const yearsToUse: CertificatePerYear[] = [
  { year: currentYear-1, amount: 0 },
  { year: currentYear, amount: 0 },
  { year: currentYear+1, amount: 0 },
  { year: currentYear+2, amount: 0 },
]

const BeneficiaryPage: FC = () => {
  useBeneficiaryNewUIRedirect()
  
  const { minerId } = useParams();

  const [seeFullSankey, setSeeFullSankey] = useState(false)
  const toggleSankeyMode = () => setSeeFullSankey(!seeFullSankey)

  const [certificateType, setCertificateType] = useState(CertificateBlocksEnum.Redeemed)

  const filecoinNodeId = minerId as string;
  const handleCertificateTypeChange = (event: SelectChangeEvent) => {
    setCertificateType(event.target.value as CertificateBlocksEnum)
  }

  const handleRedeemedSelect = () => {
    setCertificateType(CertificateBlocksEnum.Redeemed)
  }
  const handleContractsSelect = () => {
    setCertificateType(CertificateBlocksEnum.Contracts)
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
  } = useBuyersControllerFindOne(filecoinNode?.buyerId as string, {
    query: { enabled: !!filecoinNode?.buyerId }
  });

  const [transactionsData, setTransactionsData] = useState<FullPurchaseDto[]>([]);
  const {
    data: filecoinNodeTransactions,
    isLoading: areTransactionsLoading
  } = useFilecoinNodesControllerGetTransactions(filecoinNodeId);
  const transactions = filecoinNodeTransactions?.transactions;

  const fetchAllTransactionsData = useCallback(async (transactions: FilecoinNodesControllerGetTransactions200TransactionsItem[]) => {
    const newTxsData = await Promise.all(
      transactions.map(
        async (tx) => await purchasesControllerFindOne(`${tx.id}`)
      )
    )
    setTransactionsData(newTxsData);
  }, [transactions])

  useEffect(() => {
    if(transactions && transactions.length > 0) {
      fetchAllTransactionsData(transactions);
    }
  }, [transactions])


  const yearlyRedeemedData = useMemo(() => yearsToUse.map(yearItem => {
    const allTransactionsFromYear = transactionsData.filter(purchase => dayjs(purchase.reportingEnd).get('year') === yearItem.year);
    return {
      ...yearItem,
      amount: allTransactionsFromYear?.reduce(
        (prev, current) => prev + parseInt(formatPower(current.recsSoldWh, { unit: Unit.MWh, withoutComma: true })), yearItem.amount)
    }
  }), [transactionsData]);

  const { data: filecoinNodeContracts, isLoading: areContractsLoading } = useFilecoinNodesControllerFindOneWithContracts(filecoinNodeId);

  const yearlyContractsData = useMemo(() => yearsToUse.map(yearItem => {
    const allContractsFromYear = filecoinNodeContracts?.contracts?.filter(contract => dayjs(contract.reportingEnd).get('year') === yearItem.year);

    return {
      ...yearItem,
      amount: allContractsFromYear?.reduce(
        (prev, current) => prev + Number(formatPower(current.openVolume, { withoutComma: true, unit: Unit.MWh }))
      , yearItem.amount) ?? yearItem.amount
    }
  }), [filecoinNodeContracts]);

  const isLoading = isFilecoinNodeLoading || isBuyerLoading || areTransactionsLoading || areContractsLoading;

  return !isLoading && buyer && filecoinNode && filecoinNodeContracts && filecoinNodeTransactions ? (
    <Container maxWidth={'xl'} sx={{ paddingBottom: '40px' }}>
    <Grid container>
      <Grid item xs={12}>
        <Breadcrumbs
          breadcrumbList={[
            'Product Offer',
            `Miner ID: ${filecoinNodeId}`,
            'Beneficiary Page',
          ]}
        />
        <PageSection headingText={'Beneficiary Page'}>
          <UserInfoBlock
            minerId={filecoinNodeId}
            userName={buyer.name}
            userAddress={buyer.blockchainAddress}
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
          userId={filecoinNodeId}
          certificateType={certificateType}
          handleCertificateTypeChange={handleCertificateTypeChange}
          contracts={filecoinNodeContracts.contracts}
          transactionsData={transactionsData}
        />
        <PageSection>
          <Typography
            mt={'15px'}
            mb={'18px'}
            fontWeight={700}
            fontSize={'20px'}
            color='primary'
          >
            Sankey view
          </Typography>
          <Box display='flex' justifyContent="flex-end" width="100%">
            <SecondaryButton onClick={toggleSankeyMode}>
              {seeFullSankey ? 'see less' : 'see more'}
            </SecondaryButton>
          </Box>
          <SankeyView
            contracts={filecoinNodeContracts.contracts}
            fullView={seeFullSankey}
            beneficiary={filecoinNodeId}
          />
        </PageSection>
      </Grid>
    </Grid>
    </Container>
  ) : (
    <LoadingBlock />
  );
};

export default BeneficiaryPage;

