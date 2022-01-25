import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import { BreadcrumbsLinks } from '../../components';
import { PaperBox } from '../../components/PaperBox';
import PageSection from '../../components/PageSection';
import { CertificateBlocksEnum, useUserPageEffects } from './effects';
import FieldLabel from '../../components/FieldLabel';
import FieldValue from '../../components/FieldValue';
import { ReactComponent as ZeroLabsLogo } from '../../assets/svg/zero-labs-logo.svg'
import { ReactComponent as RedeemedCertificateSVG } from '../../assets/svg/certificate_locked.svg';
import { ReactComponent as TransferableCertificateSVG } from '../../assets/svg/user_income.svg';
import { ReactComponent as ContractsSVG } from '../../assets/svg/certificate_timer.svg';
import { CertificatesWithFilters, YearlyCertificatesTable } from './components';


export const UserPage = () => {
  const {
    breadcrumbs,
    mockUserName,
    mockUserAddress,
    selectedBlock,
    handleRedeemedSelect,
    handleTransferableSelect,
    handleContractsSelect,
    mockRedeemedData,
    mockTransferableData,
    mockContractsData,
    handleCertificateTypeChange
  } = useUserPageEffects();
  const theme = useTheme();

  return (
    <Container maxWidth={'xl'}>
      <Grid container>
        <Grid item xs={12}>
          <BreadcrumbsLinks items={breadcrumbs} />
          <PageSection regularCase headingText={'User page'}>
            <PaperBox bgColor={theme.palette.background.default}>
              <Grid container>
                <Grid item xs={12} md={3}>
                  <Box display="flex" alignItems={'center'}>
                    <ZeroLabsLogo />
                    <Box marginLeft="10px">
                      <Typography color="primary" fontWeight={700} fontSize="14px" lineHeight="16px">
                        {mockUserName}
                      </Typography>
                      <Typography color="primary" fontSize='10px' fontWeight={500} lineHeight={'13px'} >
                        {mockUserAddress}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    mb={2}
                  >
                    <FieldLabel width='90px' fontSize={'14px'} lineHeight={"16px"} labelText={'Name'} />
                    <FieldValue fontSize={'14px'} lineHeight={"16px"} valueText={'Zero labs'} />
                  </Box>
                  <Box
                    display={'flex'}
                    alignItems={'flex-start'}
                    mb={2}
                  >
                    <FieldLabel width='90px' fontSize={'14px'} lineHeight={"16px"} labelText={'Description'} />
                    <FieldValue fontSize={'14px'} lineHeight={"16px"} valueText={'Zero Labs is the company bringing Renewable Energy Certificates onto the blockchain'} />
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    mb={2}
                  >
                    <FieldLabel width='200px' fontSize={'14px'} lineHeight={"16px"} labelText={'Extra information'} />
                    <FieldValue fontSize={'14px'} lineHeight={"16px"} valueText={' '} />
                  </Box>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    mb={2}
                  >
                    <FieldLabel width='200px' fontSize={'14px'} lineHeight={"16px"} labelText={'Filecoin Miner ID'} />
                    <FieldValue fontSize={'14px'} lineHeight={"16px"} valueText={'f02576'} />
                  </Box>
                </Grid>
              </Grid>
            </PaperBox>
            <Grid container spacing={"30px"} pt="24px">
              <Grid item xs={12} md={4}>
                <YearlyCertificatesTable
                  icon={RedeemedCertificateSVG}
                  title="Redeemed RECS"
                  subtitle="Amounts of RECs redeemed in the name of this user"
                  items={mockRedeemedData}
                  selected={selectedBlock === CertificateBlocksEnum.Redeemed}
                  handleClick={handleRedeemedSelect}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <YearlyCertificatesTable
                  icon={TransferableCertificateSVG}
                  title="Transferable RECS"
                  subtitle="Amounts of unredeemed RECs owned by this user, available to be transfered"
                  items={mockTransferableData}
                  selected={selectedBlock === CertificateBlocksEnum.Transferable}
                  handleClick={handleTransferableSelect}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <YearlyCertificatesTable
                  icon={ContractsSVG}
                  title="Contracts"
                  subtitle="Future RECs that the seller has contractually promised to this user"
                  items={mockContractsData}
                  selected={selectedBlock === CertificateBlocksEnum.Contracts}
                  handleClick={handleContractsSelect}
                />
              </Grid>
            </Grid>
          </PageSection>
          <CertificatesWithFilters
            certificateType={selectedBlock}
            handleCertificateTypeChange={handleCertificateTypeChange}
          />
        </Grid>
      </Grid>
    </Container>
  )
};
