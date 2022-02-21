import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { FindContractDto, useContractsControllerFindOne } from '@energyweb/zero-protocol-labs-api-client'
import { TableHeader, TableRowData } from "@zero-labs/zero-ui-components";
import { BigNumber } from '@ethersproject/bignumber';
import { styled } from "@mui/material/styles";
import EthereumAddress from "../../components/EthereumAddress";
import FuelType, { FuelTypeEnum } from "../../components/FuelType";
import { formatPower, Unit } from "../../utils";

export const contractTableHeaders: TableHeader = {
  orderId: { label: 'Order ID' },
  beneficiary: { label: 'Beneficiary' },
  product: { label: 'Product' },
  amount: { label: 'Amount (Open | Delivered)' },
  period: { label: 'Period' },
  energySource: { label: 'Energy Source' },
  region: { label: 'Country, Region' },
  contractDate: { label: 'Contract date' },
  deliveryDate: { label: 'Delivery date' },
  seller: { label: 'Seller' }
}

export const useProductPageEffects = () => {
  const { id: contractId } = useParams();

  const { data, isLoading, isFetched } = useContractsControllerFindOne(contractId ?? '');

  const totalAmount = (BigNumber.from(data?.openVolume ?? 0).add(BigNumber.from(data?.deliveredVolume ?? 0))).toString();

  const contractTableData: TableRowData<FindContractDto['id']>[] = [{
    id: data?.id ?? '',
    orderId: <EthereumAddress shortify clipboard address={data?.id ?? ''} />,
    product: data?.productType ?? '',
    beneficiary: data?.filecoinNode?.id ?? '',
    amount: data?.openVolume || data?.deliveredVolume
      ? <>
          {formatPower(totalAmount, { unit: Unit.MWh, includeUnit: true })}
          <br />
          <SmallText>
            ({formatPower(data.openVolume, { unit: Unit.MWh, includeUnit: true })} | {formatPower(data.deliveredVolume, { unit: Unit.MWh, includeUnit: true })})
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
    region: data?.countryRegionMap.map(item => (
      <div key={item.country+item.region}>
        {item.country}, {item.region}
      </div>
    )),
    contractDate: dayjs(data?.contractDate).isValid()
      ? dayjs(data?.contractDate).utc().format('YYYY-MM-DD')
      : '-',
    deliveryDate: dayjs(data?.deliveryDate).isValid()
      ? dayjs(data?.deliveryDate).utc().format('YYYY-MM-DD')
      : '-',
    seller: <EthereumAddress shortify clipboard address={data?.seller.blockchainAddress ?? ''} />
  }]

  return { contractTableData, data, isLoading, isFetched, contractId, totalAmount };
}

const SmallText = styled('span')`
  font-size: 14px;
  font-weight: 500;
`;
