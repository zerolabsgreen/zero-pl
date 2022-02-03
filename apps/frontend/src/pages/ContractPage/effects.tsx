import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { ContractDto, useContractsControllerFindOne } from '@energyweb/zero-protocol-labs-api-client'
import { TableHeader, TableRowData } from "@zero-labs/zero-ui-components";
import EthereumAddress from "../../components/EthereumAddress";
import FuelType, { FuelTypeEnum } from "../../components/FuelType";
import { formatPower, Unit } from "../../utils";

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

export const useProductPageEffects = () => {
  const { id: contractId } = useParams();

  const { data, isLoading, isFetched } = useContractsControllerFindOne(contractId ?? '');

  const contractTableData: TableRowData<ContractDto['id']>[] = [{
    id: data?.id ?? '',
    orderId: <EthereumAddress shortify clipboard address={data?.id ?? ''} />,
    product: data?.productType ?? '',
    beneficiary: data?.filecoinNode?.id ?? '',
    amount: data?.openVolume ? formatPower(data.openVolume, { unit: Unit.MWh, includeUnit: true }) : '',
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

  return { contractTableData, data, isLoading, isFetched, contractId };
}
