import type { FC } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CertificateDto, usePurchasesControllerFindOne } from '@energyweb/zero-protocol-labs-api-client';
import { GenericTable, TableHeader, TableRowData } from '@zero-labs/zero-ui-components';
import BuyerSellerInformation from '../../components/ProofPage/BuyerSellerInformation'
import PageSection from '../../components/common/PageSection';
import DownloadSection from '../../components/common/DownloadSection';
import LoadingBlock from '../../components/common/LoadingBlock';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import EthereumAddress, { shortifyEthAddr } from '../../components/common/EthereumAddress';
import FuelType, { FuelTypeEnum } from '../../components/common/FuelType';
import TableListProofs from '../../components/ProofPage/TableListProofs';
import { DisplayUnit, formatPower } from '../../utils';


const ProofPage: NextPage = () => {
  const router = useRouter();
  const { id: purchaseId } = router.query;
  const { data, isLoading, isFetched } = usePurchasesControllerFindOne((purchaseId as string) ?? '');

  const certificateInfoTableData: TableRowData<CertificateDto['id']>[] = [{
    id: data?.certificate.id ?? '',
    proofId: <EthereumAddress shortify clipboard address={data?.certificate?.id ?? ''} />,
    product: data?.certificate?.productType ?? '',
    beneficiary: data?.certificate?.beneficiary ?? '',
    amount: data?.certificate?.energy ? formatPower(data.certificate.energyWh, { unit: DisplayUnit.MWh, includeUnit: true }) : '',
    period: (
    <>{dayjs(data?.certificate?.generationStart).isValid()
      ? dayjs(data?.certificate?.generationStart).utc().format('YYYY-MM-DD')
      : '-'} <br />
     {dayjs(data?.certificate?.generationEnd).isValid()
      ? dayjs(data?.certificate?.generationEnd).utc().format('YYYY-MM-DD')
      : '-'}
    </>),
    generatorId: data?.certificate?.generatorId ?? '',
    energySource: <FuelType fuelType={data?.certificate?.energySource as FuelTypeEnum} />,
    region: `${data?.certificate?.country}, ${data?.certificate?.region}`,
    redemptionDate: dayjs(data?.certificate?.redemptionDate).isValid()
      ? dayjs(data?.certificate?.redemptionDate).utc().format('YYYY-MM-DD')
      : '-',
    seller: <EthereumAddress shortify clipboard address={data?.certificate?.initialSellerId ?? ''} />
  }]

  return !isLoading && isFetched && data ? (
    <Container maxWidth={'xl'}>
      <Grid container>
        <Box sx={{ width: '100%' }}>
          <Grid item xs={12}>
            <Breadcrumbs
              breadcrumbList={[
                'Product Offer',
                `Proof ID: ${purchaseId}`,
                'EAC Delivery Proof',
              ]}
            />
            <PageSection
              headingText={'Proof of Renewable Energy Consumption'}
              sectionHelpText={
                <div>
                  This page is a summary of the proof that the buyer <b>{shortifyEthAddr(data.buyer.blockchainAddress ?? '')}</b> has
                  bought <b>{formatPower(data.certificate.energy, { unit: DisplayUnit.MWh, includeUnit: true })}</b>  worth of <UnderlinedText>Renewable Energy Certificates</UnderlinedText>,
                  and that they have been <UnderlinedText>redeemed</UnderlinedText> in their name
                </div>
              }
            >
              <BuyerSellerInformation
                generationPeriod={{
                  fromDate: data.certificate.generationStart,
                  toDate: data.certificate.generationEnd,
                }}
                filecoinMinerIdList={data.filecoinNode}
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
          <TableListProofs purchaseId={purchaseId as string} />
        </Box>
      </Grid>
    </Container>
  ) : (
    <LoadingBlock />
  );
};

export default ProofPage;

const UnderlinedText: FC = ({ children }) => {
  return (
    <span style={{ textDecoration: 'underline' }}>
      {children}
    </span>
  )
};

const certificateInfoTableHeaders: TableHeader = {
  proofId: { label: 'Proof ID', infoText: 'Proof ID represents the identifier of proof in EW Zero marketplace' },
  beneficiary: { label: 'Beneficiary', infoText: 'The ID of the redemption beneficiary' },
  product: { label: 'Product', infoText: 'Type of purchased EAC' },
  amount: { label: 'Amount', infoText: 'The number of EACs the buyer has bought and redeemed for their renewable energy consumption claims. 1 REC normally equals to 1 MWh of electricity produced with clean energy' },
  period: { label: 'Period', infoText: ' The “vintage”, or the dates between which the clean energy was produced. EACs require to certify consumption in a specific time frame to avoid double accounting' },
  generatorId: { label: 'Generator ID', infoText: 'ID of the device generating the energy and EACs' },
  energySource: { label: 'Energy Source', infoText: 'Renewable energy source, e.g. wind, hydro, solar, etc.' },
  region: { label: 'Region', infoText: 'Location of the device generating the energy and EACs' },
  redemptionDate: { label: 'Redemption date', infoText: 'The date of EAC redemption' },
  seller: { label: 'Seller', infoText: 'ID of the EAC seller' }
}
