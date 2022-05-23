import type { FC } from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { CertificateDto } from '@energyweb/zero-protocol-labs-api-client';
import { GenericTable, TableHeader, TableRowData } from '@zero-labs/zero-ui-components';
import BuyerSellerInformation from '../../components/ProofPage/BuyerSellerInformation';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import PageSection from '../../components/common/PageSection';
import EthereumAddress, { shortifyEthAddr } from '../../components/common/EthereumAddress';
import DownloadSection from '../../components/common/DownloadSection';
import FuelType, { FuelTypeEnum } from '../../components/common/FuelType';
import { exampleData } from '../../components/ProofsExamplePage/exampleData';
import { TableListProofsExample } from '../../components/ProofsExamplePage/TableListProofsExample';
import { DisplayUnit, formatPower } from '../../utils';

const ProofExamplePage: NextPage = () => {
  return (
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
                  This page is a summary of the proof that the buyer <b>{shortifyEthAddr(exampleData.buyer.blockchainAddress ?? '')}</b> has
                  bought <b>{formatPower(exampleData.certificate.energy, { unit: DisplayUnit.MWh, includeUnit: true })}</b>  worth of <UnderlinedText>Renewable Energy Certificates</UnderlinedText>,
                  and that they have been <UnderlinedText>redeemed</UnderlinedText> in their name
                </div>
              }
            >
              <BuyerSellerInformation
                generationPeriod={{
                  fromDate: exampleData.certificate.generationStart,
                  toDate: exampleData.certificate.generationEnd,
                }}
                filecoinMinerIdList={exampleData.filecoinNode}
                buyer={exampleData.buyer}
                seller={exampleData.seller}
              />
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    mt={'50px'}
                    mb={'18px'}
                    // fontWeight={700}
                    fontSize={'20px'}
                    color='primary'
                    sx={{ fontWeight: 700 }}
                  >
                    Certificate information
                  </Typography>
                  <GenericTable
                    headers={certificateInfoTableHeaders}
                    data={certificateInfoTableData}
                  />
                </Grid>
                <Grid item xs={12} sx={{ pt: '16px' }}>
                  <DownloadSection fileList={exampleData.files} />
                </Grid>
              </Grid>
            </PageSection>
          </Grid>
        </Box>
        <Box width={'100%'}>
          <TableListProofsExample />
        </Box>
      </Grid>
    </Container>
  )
};

export default ProofExamplePage;

const UnderlinedText: FC = ({ children }) => {
  return (
    <span style={{ textDecoration: 'underline' }}>
      {children}
    </span>
  )
}

const purchaseId = '5253751e-9072-4c05-a3ae-e42428baa429';

const certificateInfoTableData: TableRowData<CertificateDto['id']>[] = [{
  id: exampleData.certificate.id ?? '',
  proofId: <EthereumAddress shortify clipboard address={exampleData.certificate.id ?? ''} />,
  product: exampleData.certificate.productType ?? '',
  beneficiary: exampleData.certificate.beneficiary ?? '',
  amount: exampleData.certificate?.energy ? formatPower(exampleData.certificate.energy, { unit: DisplayUnit.MWh, includeUnit: true }) : '',
  period: (
  <>{dayjs(exampleData.certificate.generationStart).isValid()
    ? dayjs(exampleData.certificate.generationStart).utc().format('YYYY-MM-DD')
    : '-'} <br />
   {dayjs(exampleData.certificate.generationEnd).isValid()
    ? dayjs(exampleData.certificate.generationEnd).utc().format('YYYY-MM-DD')
    : '-'}
  </>),
  generatorId: exampleData.certificate.generatorId ?? '',
  energySource: <FuelType fuelType={exampleData.certificate.energySource as FuelTypeEnum} />,
  region: `${exampleData.certificate.country}, ${exampleData.certificate.region}`,
  seller: <EthereumAddress shortify clipboard address={exampleData.certificate?.initialSellerId ?? ''} />
}]

const certificateInfoTableHeaders: TableHeader = {
  proofId: { label: 'Proof ID', infoText: 'Proof ID represents the identifier of proof in EW Zero marketplace' },
  beneficiary: { label: 'Beneficiary', infoText: 'The ID of the redemption beneficiary' },
  product: { label: 'Product', infoText: 'Type of purchased EAC' },
  amount: { label: 'Amount', infoText: 'The number of EACs the buyer has bought and redeemed for their renewable energy consumption claims. 1 REC normally equals to 1 MWh of electricity produced with clean energy' },
  period: { label: 'Period', infoText: ' The “vintage”, or the dates between which the clean energy was produced. EACs require to certify consumption in a specific time frame to avoid double accounting' },
  generatorId: { label: 'Generator ID', infoText: 'ID of the device generating the energy and EACs' },
  energySource: { label: 'Energy Source', infoText: 'Renewable energy source, e.g. wind, hydro, solar, etc.' },
  region: { label: 'Region', infoText: 'Location of the device generating the energy and EACs' },
  seller: { label: 'Seller', infoText: 'ID of the EAC seller' }
}
