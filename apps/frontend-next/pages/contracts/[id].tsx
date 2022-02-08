import type { FC } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { BigNumber } from '@ethersproject/bignumber';
import { styled } from '@mui/material/styles';
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
  amount: { label: 'Amount (Open | Delivered)' },
  period: { label: 'Period' },
  energySource: { label: 'Energy Source' },
  region: { label: 'Region' },
  contractDate: { label: 'Contract date' },
  deliveryDate: { label: 'Delivery date' },
  seller: { label: 'Seller' }
}

export const ContractPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const contractId = id as string;
  const { data, isLoading, isFetched } = useContractsControllerFindOne(contractId ?? '');

  const totalAmount = (BigNumber.from(data?.openVolume ?? 0).add(BigNumber.from(data?.deliveredVolume ?? 0))).toString();
  const contractTableData: TableRowData<ContractDto['id']>[] = [{
    id: data?.id ?? '',
    orderId: <EthereumAddress shortify clipboard address={data?.id ?? ''} />,
    product: data?.productType ?? '',
    beneficiary: data?.filecoinNode?.id ?? '',
    amount: data?.openVolume || data?.deliveredVolume
      ? <>
          {formatPower(totalAmount, { unit: DisplayUnit.MWh, includeUnit: true })}
          <br />
          <SmallText>
            ({formatPower(data.openVolume, { unit: DisplayUnit.MWh, includeUnit: true })} | {formatPower(data.deliveredVolume, { unit: DisplayUnit.MWh, includeUnit: true })})
          </SmallText>
        </>
      : '',
    period: (
    <>{dayjs(data?.reportingStart).isValid()
      ? dayjs(data?.reportingStart).utc().format('YYYY-MM-DD')
      : '-'} <br />
     {dayjs(data?.reportingEnd).isValid()
      ? dayjs(data?.reportingEnd).utc().format('YYYY-MM-DD')
      : '-'}
    </>),
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
    region: `${data?.countries?.join(', ') ?? ''}`,
    contractDate: dayjs(data?.contractDate).isValid()
      ? dayjs(data?.contractDate).utc().format('YYYY-MM-DD')
      : '-',
    deliveryDate: dayjs(data?.deliveryDate).isValid()
      ? dayjs(data?.deliveryDate).utc().format('YYYY-MM-DD')
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
              headingText={'Renewable Energy Contract Receipt'}
              sectionHelpText={
                <div>
                  This page is a summary of the receipt that shows that the buyer <b>{shortifyEthAddr(data.buyer.blockchainAddress ?? '')}</b> holds
                  a contract over the delivery of <b>{formatPower(totalAmount, { unit: DisplayUnit.MWh, includeUnit: true })}</b> of <UnderlinedText>Renewable Energy Certificates</UnderlinedText>,
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

const SmallText = styled('span')`
  font-size: 14px;
  font-weight: 500;
`;

export default ContractPage;
