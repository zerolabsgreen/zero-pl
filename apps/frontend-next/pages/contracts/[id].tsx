import type { FC } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { ContractDto, useContractsControllerFindOne } from '@energyweb/zero-protocol-labs-api-client';
import { GenericTable, TableHeader, TableRowData } from '@zero-labs/zero-ui-components';
import BuyerSellerInformation from '../../components/ProofPage/BuyerSellerInformation';
import PageSection from '../../components/common/PageSection';
import LoadingBlock from '../../components/common/LoadingBlock';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import EthereumAddress, { shortifyEthAddr } from '../../components/common/EthereumAddress';
import FuelType, { FuelTypeEnum } from '../../components/common/FuelType';
import { formatPower, DisplayUnit } from '../../utils';

export const contractTableHeaders: TableHeader = {
  orderId: { label: 'Order ID' },
  beneficiary: { label: 'Beneficiary' },
  product: { label: 'Product' },
  amount: { label: 'Amount' },
  period: { label: 'Period' },
  generator: { label: 'Generator' },
  energySource: { label: 'Energy Source' },
  region: { label: 'Region' },
  contractDate: { label: 'Contract date' },
  seller: { label: 'Seller' }
}

export const ContractPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const contractId = id as string;
  const { data, isLoading, isFetched } = useContractsControllerFindOne(contractId ?? '');

  const contractTableData: TableRowData<ContractDto['id']>[] = [{
    id: data?.id ?? '',
    orderId: <EthereumAddress shortify clipboard address={data?.id ?? ''} />,
    product: data?.productType ?? '',
    beneficiary: data?.filecoinNode?.id ?? '',
    amount: data?.openVolume ? formatPower(data.openVolume, { unit: DisplayUnit.MWh, includeUnit: true }) : '',
    period: (
    <>{dayjs(data?.reportingStart).isValid()
      ? dayjs(data?.reportingStart).utc().format('YYYY-MM-DD')
      : '-'} <br />
     {dayjs(data?.reportingEnd).isValid()
      ? dayjs(data?.reportingEnd).utc().format('YYYY-MM-DD')
      : '-'}
    </>),
    generator: data?.purchases.map(purchase => purchase.certificate.generatorId).join(', ') ?? '',
    energySource: (
      <>
        {data?.energySources.map(energySource =>
          <FuelType
            key={`${data?.id}-${energySource}`}
            fuelType={energySource as FuelTypeEnum}
          />)
        }
      </>
    ),
    region: `${data?.country ?? ''}${data?.region ? ', ' + data?.region : ''}`,
    contractDate: dayjs(data?.contractDate).isValid()
      ? dayjs(data?.contractDate).utc().format('YYYY-MM-DD')
      : '-',
    seller: <EthereumAddress shortify clipboard address={data?.seller.blockchainAddress ?? ''} />
  }]

  return !isLoading && isFetched && data ? (
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
                  bought <b>{formatPower(data.openVolume, { unit: DisplayUnit.MWh, includeUnit: true })}</b>  worth of <UnderlinedText>Renewable Energy Certificates</UnderlinedText>,
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
