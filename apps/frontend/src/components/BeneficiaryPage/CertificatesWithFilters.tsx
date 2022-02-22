import { css } from "@emotion/css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography"
import { FormSelect, GenericTable, SelectOption, TableHeader, TableRowData } from "@zero-labs/zero-ui-components";
import dayjs from "dayjs";
import { BigNumber } from "@ethersproject/bignumber";
import { FC, useCallback, useMemo, useState } from "react";
import { FindContractDto, FullPurchaseDto } from "@energyweb/zero-protocol-labs-api-client";
import PageSection from "../PageSection"
import { ReactComponent as SankeySVG } from '../../assets/svg/sankey.svg';
import { ReactComponent as ListSVG } from '../../assets/svg/list.svg';
import EthereumAddress from "../EthereumAddress";
import { Unit, formatPower, ProductEnumType } from "../../utils";
import FuelType, { FuelTypeEnum } from "../FuelType";
import ButtonRight from "./ButtonRight";
import { useNavigate } from "react-router";
import SankeyView from "./SankeyView";

interface CertificatesWithFiltersProps {
  userId: string;
  certificateType: CertificateBlocksEnum;
  handleCertificateTypeChange: (event: SelectChangeEvent) => void;
  contracts?: FindContractDto[];
  transactionsData?: FullPurchaseDto[];
}

const enum ViewModeEnum {
  List = 'List',
  Sankey = 'Sankey'
}

const CertificatesWithFilters: FC<CertificatesWithFiltersProps> = ({
  userId,
  certificateType,
  handleCertificateTypeChange,
  contracts = [],
  transactionsData = []
}) => {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState(ViewModeEnum.List);
  const handleListView = () => setViewMode(ViewModeEnum.List)
  const handleSankeyView = () => setViewMode(ViewModeEnum.Sankey)
  const [productType, setProductType] = useState<ProductEnumType | 'Any'>('Any')

  const handleProductTypeChange = useCallback((event: SelectChangeEvent) => {
    setProductType(event.target.value as ProductEnumType)
  }, [])

  const title = certificateType === CertificateBlocksEnum.Redeemed ? 'REC Redemptions' : 'Contracts (Futures)'
  const headers = certificateType === CertificateBlocksEnum.Redeemed ? redeemedRecsHeaders : contractsHeaders;

  const redeemedRecsTableData: TableRowData<FullPurchaseDto['id']>[] = useMemo(() => transactionsData.map(tx => ({
    id: tx.id,
    proofId: <EthereumAddress shortify clipboard address={tx.id} />,
    beneficiary: userId,
    product: tx.certificate.productType,
    amount: formatPower(tx.certificate.energyWh, {
      unit: Unit.MWh,
      includeUnit: true,
    }),
    period: `${dayjs(tx.certificate.generationStart).isValid()
      ? dayjs(tx.certificate.generationStart)
          .utc()
          .format('YYYY-MM-DD')
      : '-'} / ${dayjs(tx.certificate.generationEnd).isValid()
      ? dayjs(tx.certificate.generationEnd)
          .utc()
          .format('YYYY-MM-DD')
      : '-'}`,
    generatorId: tx.certificate.generatorId,
    energySource: <FuelType fuelType={tx.certificate.energySource as FuelTypeEnum} />,
    region: `${tx.certificate.country}, ${tx.certificate.region}`,
    seller: tx.seller.name ?? '',
    action: <ButtonRight onClick={() => navigate(`/partners/filecoin/purchases/${tx.id}`)} />
    })), [transactionsData]);


  const contractTableData: TableRowData<FindContractDto['id']>[] = useMemo(() => contracts.map((contract) => {
    const totalAmount = (BigNumber.from(contract?.openVolume ?? 0).add(BigNumber.from(contract?.deliveredVolume ?? 0))).toString();
    return {
    id: contract?.id ?? '',
    orderId: <EthereumAddress shortify clipboard address={contract?.id ?? ''} />,
    product: contract?.productType ?? '',
    beneficiary: contract?.filecoinNode?.id ?? '',
    amount: contract?.openVolume || contract?.deliveredVolume
      ? <>
          {formatPower(totalAmount, { unit: Unit.MWh, includeUnit: true })}
          <br />
          <SmallText>
            ({formatPower(contract.openVolume, { unit: Unit.MWh, includeUnit: true })} | {formatPower(contract.deliveredVolume, { unit: Unit.MWh, includeUnit: true })})
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
    location: contract?.countryRegionMap.map(item => (
      <div key={item.country+item.region}>
        {item.country}, {item.region}
      </div>
    )),
    contractDate: dayjs(contract?.contractDate).isValid()
      ? dayjs(contract?.contractDate).utc().format('YYYY-MM-DD')
      : '-',
    deliveryDate: dayjs(contract?.deliveryDate).isValid()
      ? dayjs(contract?.deliveryDate).utc().format('YYYY-MM-DD')
      : '-',
    seller: contract?.seller.name,
    action: <ButtonRight onClick={() => navigate(`/partners/filecoin/contracts/${contract.id}`)} />
  }}), [contracts]);

  const tableData = certificateType === CertificateBlocksEnum.Redeemed ? redeemedRecsTableData : contractTableData;
  const filteredTableData = productType !== 'Any' ? tableData.filter(row => row.product.includes(productType)) : tableData
  const theme = useTheme();

  return (
    <PageSection>
      <Box display={'flex'}>
        <FormSelect
          value={certificateType}
          options={certificatesTypeOptions}
          handleChange={handleCertificateTypeChange}
          selectClassName={css`
            height: 48px;
            background-color: ${theme.palette.secondary.light};
            max-width: 150px;
            & .MuiSvgIcon-root {
              fill: ${theme.palette.secondary.main}
            }
          `}
          menuClassName={css`& ul { padding: 0;} `}
          CustomMenuItem={StyledMenuItem}
        />
        <FormSelect
          value={productType as ProductEnumType}
          options={productTypeOptions}
          handleChange={handleProductTypeChange}
          selectClassName={css`
            margin-left: 20px;
            height: 48px;
            max-width: 150px;
            & .MuiSvgIcon-root {
              fill: ${theme.palette.secondary.main}
            }
          `}
          menuClassName={css`& ul { padding: 0;} `}
          CustomMenuItem={StyledMenuItem}
        />
      </Box>
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
        <Box display={'flex'}>
          <SecondaryButton
            active={viewMode === ViewModeEnum.List}
            onClick={handleListView}
            startIcon={<ListSVG />}
            sx={{ marginRight: '10px' }}
          >
            List view
          </SecondaryButton>
          <SecondaryButton
            active={viewMode === ViewModeEnum.Sankey}
            onClick={handleSankeyView}
            startIcon={<SankeySVG />}
          >
            Sankey view
          </SecondaryButton>
        </Box>
      </Box>
      <Box mt="20px">
        {viewMode === ViewModeEnum.List
          ? <GenericTable headers={headers} data={filteredTableData} />
          : <SankeyView contracts={contracts} />
        }
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

const productTypeOptions: SelectOption[] = [
  { label: 'Any', value: 'Any' },
  { label: ProductEnumType.REC, value: ProductEnumType.REC },
  { label: ProductEnumType.IREC, value: ProductEnumType.IREC },
  { label: ProductEnumType.GO, value: ProductEnumType.GO },
  { label: ProductEnumType.TIGR, value: ProductEnumType.TIGR },
  { label: ProductEnumType.LGC, value: ProductEnumType.LGC },
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
  amount: { label: 'Amount (Open | Delivered)' },
  period: { label: 'Period' },
  energySource: { label: 'Energy Source' },
  location: { label: 'Location' },
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

const SecondaryButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'active' })<{ active?: boolean }>(({ theme, active }) => `
  background-color: ${active ? theme.palette.secondary.main : theme.palette.background.paper};
  color: ${active ? theme.palette.text.primary : theme.palette.primary.main};
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0px 4px 10px rgba(160, 154, 198, 0.2);
  border-radius: 5px;
  padding: 10px 12px;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  & path {
    fill: ${active && theme.palette.primary.main}
  }
  &:hover {
    background-color: ${theme.palette.secondary.main};
    color: ${theme.palette.text.primary};
    & path {
      fill: ${theme.palette.primary.main}
    }
  }
`)

const SmallText = styled('span')`
  font-size: 14px;
  font-weight: 500;
`;

export default CertificatesWithFilters
