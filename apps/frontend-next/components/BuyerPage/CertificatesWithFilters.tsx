import { useRouter } from "next/router";
import { css } from "@emotion/css";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress";
import { FormSelect, GenericTable, SelectOption, TableHeader, TableRowData } from "@zero-labs/zero-ui-components";
import dayjs from "dayjs";
import { BigNumber } from "@ethersproject/bignumber";
import { FC, useState } from "react";
import { ContractDto, FilecoinNodesControllerGetTransactions200TransactionsItem, useFilecoinNodesControllerFindOneWithContracts, useFilecoinNodesControllerGetTransactions } from "@energyweb/zero-protocol-labs-api-client";
import PageSection from "../common/PageSection"
// import { ReactComponent as SankeySVG } from '../../assets/sankey.svg';
// import { ReactComponent as ListSVG } from '../../assets/list.svg';
import EthereumAddress from "../common/EthereumAddress";
import { DisplayUnit, formatPower } from "../../utils";
import FuelType, { FuelTypeEnum } from "../common/FuelType";
import ButtonRight from "./ButtonRight";

interface CertificatesWithFiltersProps {
  filecoinNodeId: string;
}

const CertificatesWithFilters: FC<CertificatesWithFiltersProps> = ({ filecoinNodeId }) => {
  const router = useRouter();
  const [certificateType, setCertificateType] = useState<CertificateBlocksEnum>(CertificateBlocksEnum.Redeemed);
  const handleCertificateTypeChange = (event: SelectChangeEvent) => {
    setCertificateType(event.target.value as CertificateBlocksEnum)
  };
  const title = certificateType === CertificateBlocksEnum.Redeemed ? 'REC Redemptions' : 'Contracts (Futures)'
  const headers = certificateType === CertificateBlocksEnum.Redeemed ? redeemedRecsHeaders : contractsHeaders;

  const { data: filecoinNodeTransactions, isLoading: areTransactionsLoading } = useFilecoinNodesControllerGetTransactions(filecoinNodeId);
  const { data: filecoinNodeContracts, isLoading: areContractsLoading } = useFilecoinNodesControllerFindOneWithContracts(filecoinNodeId);

  const redeemedRecsTableData: TableRowData<FilecoinNodesControllerGetTransactions200TransactionsItem['id']>[] = filecoinNodeTransactions?.transactions?.map(tx => ({
    id: tx.id,
    proofId: <EthereumAddress shortify clipboard address={tx.id ?? ''} />,
    product: tx.generation.productType,
    beneficiary: filecoinNodeId,
    amount: `${filecoinNodeTransactions.recsTotal} ${DisplayUnit.MWh}`,
    period: (
    <>
      {dayjs(tx.generation.generationStartLocal).isValid()
        ? dayjs(tx.generation.generationStartLocal).utc().format('YYYY-MM-DD')
        : '-'} <br />
      {dayjs(tx.generation.generationEndLocal).isValid()
        ? dayjs(tx.generation.generationEndLocal).utc().format('YYYY-MM-DD')
        : '-'}
    </>),
    generatorId: tx.generation.generatorId,
    energySource: <FuelType fuelType={tx.generation.energySource as FuelTypeEnum} />,
    region: `${tx.generation.country}, ${tx.generation.region}`,
    seller: <EthereumAddress shortify clipboard address={tx.sellerId} />,
    action: <ButtonRight onClick={() => router.push(`/proofs/${tx.id}`)} />
  }));


  const contractTableData: TableRowData<ContractDto['id']>[] = filecoinNodeContracts?.contracts?.map((contract) => {
    const totalAmount = (BigNumber.from(contract?.openVolume ?? 0).add(BigNumber.from(contract?.deliveredVolume ?? 0))).toString();
    return {
    id: contract?.id ?? '',
    orderId: <EthereumAddress shortify clipboard address={contract?.id ?? ''} />,
    product: contract?.productType ?? '',
    beneficiary: contract?.filecoinNode?.id ?? '',
    amount: contract?.openVolume || contract?.deliveredVolume
      ? <>
          {formatPower(totalAmount, { unit: DisplayUnit.MWh, includeUnit: true })}
          <br />
          <SmallText>
            ({formatPower(contract.openVolume, { unit: DisplayUnit.MWh, includeUnit: true })} | {formatPower(contract.deliveredVolume, { unit: DisplayUnit.MWh, includeUnit: true })})
          </SmallText>
        </>
      : '',
    period: (
    <>{dayjs(contract?.reportingStart).isValid()
      ? dayjs(contract?.reportingStart).utc().format('YYYY-MM-DD')
      : '-'} <br />
     {dayjs(contract?.reportingEnd).isValid()
      ? dayjs(contract?.reportingEnd).utc().format('YYYY-MM-DD')
      : '-'}
    </>),
    energySource: (
      <>
        {contract?.energySources.map(energySource =>
          <FuelType
            key={`${contract?.id}-${energySource}`}
            fuelType={energySource as FuelTypeEnum}
          />)
        }
      </>
    ),
    region: `${contract?.countries?.join(', ') ?? ''}`,
    contractDate: dayjs(contract?.contractDate).isValid()
      ? dayjs(contract?.contractDate).utc().format('YYYY-MM-DD')
      : '-',
    deliveryDate: dayjs(contract?.deliveryDate).isValid()
      ? dayjs(contract?.deliveryDate).utc().format('YYYY-MM-DD')
      : '-',
    seller: <EthereumAddress shortify clipboard address={contract?.seller.blockchainAddress ?? ''} />,
    action: <ButtonRight onClick={() => router.push(`/contracts/${contract.id}`)} />
  }}) ?? [];

  const tableData = certificateType === CertificateBlocksEnum.Redeemed ? redeemedRecsTableData : contractTableData;

  const theme = useTheme();
  const isLoading = areContractsLoading || areTransactionsLoading;

  if (isLoading) return <CircularProgress />;

  return (
    <PageSection>
      <FormSelect
        value={certificateType}
        options={certificatesTypeOptions}
        handleChange={handleCertificateTypeChange}
        selectClassName={css`
          background-color: ${theme.palette.secondary.light};
          max-width: 150px;
          & .MuiSvgIcon-root {
            fill: ${theme.palette.secondary.main}
          }
        `}
        menuClassName={css`& ul { padding: 0;} `}
        CustomMenuItem={StyledMenuItem}
      />
      <Box display={'flex'} mt="34px" justifyContent={'space-between'} alignItems={'center'}>
        <Typography
          mt={'15px'}
          mb={'18px'}
          fontWeight={700}
          fontSize={'20px'}
          color='primary'
        >
          {title}
        </Typography>
        {/* temporary hidden */}
        {/* <Box display={'flex'}>
          <SecondaryButton startIcon={<ListSVG />} sx={{ marginRight: '10px' }}>
            list view
          </SecondaryButton>
          <SecondaryButton startIcon={<SankeySVG />}>
            sankey view
          </SecondaryButton>
        </Box> */}
      </Box>
      <Box mt="20px">
        <GenericTable headers={headers} data={tableData} />
      </Box>
    </PageSection>
  )
}


export enum CertificateBlocksEnum {
  Redeemed = 'Redeemed',
  Contracts = 'Contracts'
}

const certificatesTypeOptions: SelectOption[] = [
  { label: CertificateBlocksEnum.Redeemed, value: CertificateBlocksEnum.Redeemed },
  { label: CertificateBlocksEnum.Contracts, value: CertificateBlocksEnum.Contracts }
]

const redeemedRecsHeaders: TableHeader = {
  proofId: { label: 'Proof ID' },
  beneficiary: { label: 'Beneficiary' },
  product: { label: 'Product' },
  amount: { label: 'Amount' },
  period: { label: 'Period' },
  generatorId: { label: 'Generator ID' },
  energySource: { label: 'Energy Source' },
  region: { label: 'Region' },
  seller: { label: 'Seller' },
  action: { label: '' }
}

const contractsHeaders: TableHeader = {
  orderId: { label: 'Order ID' },
  beneficiary: { label: 'Beneficiary' },
  product: { label: 'Product' },
  amount: { label: 'Amount' },
  period: { label: 'Period' },
  energySource: { label: 'Energy Source' },
  region: { label: 'Region' },
  contractDate: { label: 'Contract date' },
  deliveryDate: { label: 'Delivery date' },
  seller: { label: 'Seller' },
  action: { label: '' }
}

const StyledMenuItem = styled(MenuItem)(({ theme }) => `
  color: ${theme.palette.primary.main};
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  padding: 14px 16px;
  &:hover {
    background-color: ${theme.palette.secondary.main};
    color: ${theme.palette.text.primary};
  };
  & .Mui-selected {
    color: ${theme.palette.primary.main};
  };
`);

// const SecondaryButton = styled(Button)(({ theme }) => `
//   background-color: ${theme.palette.background.paper};
//   color: ${theme.palette.primary.main};
//   border: 1px solid rgba(0, 0, 0, 0.05);
//   box-shadow: 0px 4px 10px rgba(160, 154, 198, 0.2);
//   border-radius: 5px;
//   padding: 14px 16px;
//   font-size: 16px;
//   font-weight: 700;
//   line-height: 20px;
//   &:hover {
//     background-color: ${theme.palette.secondary.main};
//     color: ${theme.palette.background.paper};
//     & path {
//       fill: ${theme.palette.primary.main}
//     }
//   }
// `)

const SmallText = styled('span')`
  font-size: 14px;
  font-weight: 500;
`;

export default CertificatesWithFilters
