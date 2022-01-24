/* This can be later moved to a common component folder in case it can be re-used */

import { FC, SVGProps, useState } from "react";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider";
import useTheme from "@mui/material/styles/useTheme";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { SelectChangeEvent } from "@mui/material/Select/Select";
import { styled } from "@mui/material/styles";
import { ReactComponent as EyeGreySVG } from '../../assets/svg/eye_grey.svg';
import { ReactComponent as SankeySVG } from '../../assets/svg/sankey.svg';
import { ReactComponent as ListSVG } from '../../assets/svg/list.svg';

import PageSection from "../../components/PageSection";
import { CertificateBlocksEnum } from "./effects";
import { FormSelect, GenericTable, SelectOption, TableHeader, TableRowData } from "@zero-labs/zero-ui-components";
import EthereumAddress from "../../components/EthereumAddress";
import FuelType, { FuelTypeEnum } from "../../components/FuelType";
import { ButtonRight } from "../../components/ButtonRight";


/* YearlyCertificatesTable block */

export type CertificatePerYear = {
  year: number;
  amount: number;
}

interface YearlyCertificatesTableProps {
  icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
  subtitle: string;
  items: CertificatePerYear[];
  handleClick?: () => void;
  selected?: boolean;
}

export const YearlyCertificatesTable: FC<YearlyCertificatesTableProps> = ({
  icon: Icon, title, subtitle, handleClick, selected = false, items
}) => {
  const theme = useTheme();
  const totalAmount = items.reduce((prev, current) => prev + current.amount, 0);

  return (
    <Box sx={{ cursor: 'pointer' }} onClick={handleClick}>
      <Box width="100%" display="flex" alignItems={'flex-end'} mb="14px">
        <Icon />
        <Box ml="16px" width="100%">
          <Typography color={selected ? 'secondary' : 'primary'} fontSize="24px" fontWeight={'bold'} lineHeight={'24px'}>
            {title}
          </Typography>
          <Typography color={selected ? 'secondary' : 'primary'} fontSize="10px" fontWeight={500} lineHeight={'13px'}>
            {subtitle}
          </Typography>
        </Box>
        <EyeGreySVG />
      </Box>
      <Box p="16px" bgcolor={selected ? '#BEFFE9' : theme.palette.background.default} borderRadius={'10px'} display={'flex'}>
        <Box>
          <Typography color="primary" fontSize={'14px'} fontWeight={500} lineHeight={'16px'} mb="4px">
            ALL
          </Typography>
          <Typography color="primary" fontSize={'16px'} fontWeight={700} lineHeight={'20px'}>
            {totalAmount}
          </Typography>
        </Box>
        <StyledDivider orientation="vertical" />
        {items.map(item => (
          <Box key={`${title}-${item.year}-${item.amount}`} mr="40px">
            <Typography color={item.amount === 0 ? 'inherit' : 'primary'} fontSize={'14px'} fontWeight={500} lineHeight={'16px'} mb="4px">
              {item.year}
            </Typography>
            <Typography color={item.amount === 0 ? 'inherit' : 'primary'} fontSize={'16px'} fontWeight={700} lineHeight={'20px'}>
              {item.amount}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

const StyledDivider = styled(Divider)`
  height: 38px;
  width: 1px;
  background-color: #D0CBF0;
  margin: 0px 24px;
`

/* CertificatesWithFilters block */

interface CertificatesWithFiltersProps {
  certificateType: CertificateBlocksEnum;
  handleCertificateTypeChange: (event: SelectChangeEvent) => void;
}

const certificatesTypeOptions: SelectOption[] = [
  { label: CertificateBlocksEnum.Redeemed, value: CertificateBlocksEnum.Redeemed },
  { label: CertificateBlocksEnum.Transferable, value: CertificateBlocksEnum.Transferable },
  { label: CertificateBlocksEnum.Contracts, value: CertificateBlocksEnum.Contracts }
]

const yearsOptions: SelectOption[] = [
  { label: '2020', value: '2020' },
  { label: '2021', value: '2021' },
  { label: '2022', value: '2022' },
  { label: '2023', value: '2023' },
]

const eacTypesOptions: SelectOption[] = [
  { label: 'All EAC types', value: 'all' }
]

export const certificateTableHeaders: TableHeader = {
  purchaseId: { label: 'Purchase ID' },
  beneficiary: { label: 'Beneficiary' },
  product: { label: 'Product' },
  amount: { label: 'Amount' },
  period: { label: 'Period' },
  generator: { label: 'Generator' },
  energySource: { label: 'Energy Source' },
  region: { label: 'Region' },
  redemptionDate: { label: 'Redemption date' },
  seller: { label: 'Seller' },
  action: { label: '' }
}

export const certificateTableMock: TableRowData<string>[] = [
  { id: '0xABD...123-1', purchaseId: <EthereumAddress address='0xABD...123' clipboard />, beneficiary: 'F025211', product: 'GO', amount: '35 MWh', period: "2021-03-04  2021-04-04", generator: <EthereumAddress address="0xCEF...456" visibility />, energySource: <FuelType fuelType={FuelTypeEnum.HYDRO} />, region: 'Norway, Oslo', redemptionDate: '2022-01-04', seller: <EthereumAddress address="0xSEL...MTH" visibility />, action: (<ButtonRight />)  },
  { id: '0x564...322', purchaseId: <EthereumAddress address='0x564...322' clipboard />, beneficiary: 'Filecoin F025222', product: 'GO', amount: '105 MWh', period: "2021-06", generator: <EthereumAddress address="0xCEF...456" visibility />, energySource: <FuelType fuelType={FuelTypeEnum.SOLAR} />, region: 'Germany, Frankfurt', redemptionDate: '2022-01-04', seller: <EthereumAddress address="0xSEL...MTH" visibility />, action: (<ButtonRight />)  },
  { id: '0xABD...123-2', purchaseId: <EthereumAddress address='0xABD...123' clipboard />, beneficiary: 'Filecoin Miner F621432', product: 'I-REC', amount: '72 MWh', period: <span>2021-09 <br/> 2021-11</span>, generator: <EthereumAddress address="0xCEF...456" visibility />, energySource: <FuelType fuelType={FuelTypeEnum.WIND} />, region: 'China, Shenzen', redemptionDate: '2022-01-04', seller: <EthereumAddress address="0xSEL...MTH" visibility />, action: (<ButtonRight />)  },
]

const useCertificatesWithFiltersEffects = () => {
  const [selectedYear, setSelectedYear] = useState(`${new Date().getFullYear()}`)
  const [selectedEacType, setSelectedEacType] = useState('all');

  const handleYearChange = (event: SelectChangeEvent) => setSelectedYear(event.target.value);
  const handleEacTypeChange = (event: SelectChangeEvent) => setSelectedEacType(event.target.value);

  return { selectedYear, handleYearChange, selectedEacType, handleEacTypeChange }
}

export const CertificatesWithFilters: FC<CertificatesWithFiltersProps> = ({
  certificateType, handleCertificateTypeChange
}) => {
  const { selectedYear, handleYearChange, selectedEacType, handleEacTypeChange } = useCertificatesWithFiltersEffects();
  return (
    <PageSection>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
          <Box width="30%">
            <FormSelect
              value={certificateType}
              options={certificatesTypeOptions}
              handleChange={handleCertificateTypeChange}
            />
          </Box>
          <Box width="30%" mx={"16px"}>
            <FormSelect
              value={selectedYear}
              options={yearsOptions}
              handleChange={handleYearChange}
            />
          </Box>
          <Box width="30%">
            <FormSelect
              value={selectedEacType}
              options={eacTypesOptions}
              handleChange={handleEacTypeChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', paddingLeft: '75px' }}>
          <Box mr="40px">
            <Typography color={'primary'} fontSize={'14px'} fontWeight={500} lineHeight={'16px'} mb="8px">
              RECs <br /> Purchased
            </Typography>
            <Typography color={'primary'} fontSize={'16px'} fontWeight={700} lineHeight={'20px'}>
              500
            </Typography>
          </Box>
          <Box mr="40px">
            <Typography color={'primary'} fontSize={'14px'} fontWeight={500} lineHeight={'16px'} mb="8px">
              RECs <br /> transfered
            </Typography>
            <Typography color={'primary'} fontSize={'16px'} fontWeight={700} lineHeight={'20px'}>
              0
            </Typography>
          </Box>
          <Box mr="40px">
            <Typography color={'primary'} fontSize={'14px'} fontWeight={500} lineHeight={'16px'} mb="8px">
              of which <br /> Retired
            </Typography>
            <Typography color={'primary'} fontSize={'16px'} fontWeight={700} lineHeight={'20px'}>
              0
            </Typography>
          </Box>
          <Box mr="40px">
            <Typography color={'primary'} fontSize={'14px'} fontWeight={500} lineHeight={'16px'} mb="8px">
              RECs <br /> Available
            </Typography>
            <Typography color={'primary'} fontSize={'16px'} fontWeight={700} lineHeight={'20px'}>
              500
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box display={'flex'} mt="34px" justifyContent={'space-between'} alignItems={'center'}>
        <Typography color="primary" fontSize={'20px'} fontWeight={700} lineHeight={'24px'}>
          REC Transfers
        </Typography>
        <Box display={'flex'}>
          <SecondaryButton startIcon={<ListSVG />} sx={{ marginRight: '10px' }}>
            list view
          </SecondaryButton>
          <SecondaryButton startIcon={<SankeySVG />}>
            sankey view
          </SecondaryButton>
        </Box>
      </Box>
      <Box mt="20px">
        <GenericTable
          headers={certificateTableHeaders}
          data={certificateTableMock}
        />
      </Box>
    </PageSection>
  )
}

const SecondaryButton = styled(Button)(({ theme }) => `
  background-color: ${theme.palette.background.paper};
  color: ${theme.palette.primary.main};
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0px 4px 10px rgba(160, 154, 198, 0.2);
  border-radius: 5px;
  padding: 14px 16px;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  &:hover {
    background-color: ${theme.palette.secondary.main};
    color: ${theme.palette.background.paper};
    & path {
      fill: ${theme.palette.primary.main}
    }
  }
`)
