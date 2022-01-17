import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { CertificateDto, usePurchasesControllerFindOne } from '@energyweb/zero-protocol-labs-api-client'
import { TableHeader, TableRowData } from "@zero-labs/zero-ui-components";
import EthereumAddress from "../../components/ethereum-address/ethereum-address";
import FuelType, { FuelTypeEnum } from "../../components/fuel-type/fuel-type";

export const certificateInfoTableHeaders: TableHeader = {
  sellerId: { label: 'Seller ID', infoText: 'Seller ID represents the seller in EW Zero marketplace' },
  generatorName: { label: 'Generator name' },
  generatorId: { label: 'Generator ID', infoText: 'Generator ID represents the generator in EW Zero marketplace' },
  country: { label: 'Country', infoText: 'Location of the device generating the energy and RECs' },
  energySource: { label: 'Energy Source', infoText: 'Renewable energy source, e.g. wind, hydro, solar, etc.' },
  recsSold: { label: 'RECs Sold (MWh)', infoText: 'The number of RECs the buyer has bought and redeemed for their renewable energy consumption claims. 1 REC normally equals to 1 MWh of electricity produced with clean energy' },
  period: { label: 'Period', infoText: ' The “vintage”, or the dates between which the clean energy was produced. RECs require to certify consumption in a specific time frame to avoid double accounting' }
}

export const useProductPageEffects = () => {
  const { productId: purchaseId } = useParams();

  const { data, isLoading, isFetched } = usePurchasesControllerFindOne(purchaseId ?? '');

  const certificateInfoTableData: TableRowData<CertificateDto['id']>[] = [{
    id: data?.certificate.id ?? '',
    sellerId: <EthereumAddress shortify clipboard address={data?.seller?.id ?? ''} />,
    generatorName: data?.certificate?.generatorName ?? '',
    generatorId: data?.certificate?.generatorId ?? '',
    country: data?.certificate?.country ?? '',
    energySource: <FuelType fuelType={data?.certificate?.energySource as FuelTypeEnum} />,
    recsSold: data?.recsSold ? `${data.recsSold} MWh` : '',
    period: `${dayjs(data?.certificate?.generationStart).isValid()
      ? dayjs(data?.certificate?.generationStart).utc().format('YYYY-MM-DD')
      : '-'}
    / ${dayjs(data?.certificate?.generationEnd).isValid()
      ? dayjs(data?.certificate?.generationEnd).utc().format('YYYY-MM-DD')
      : '-'}`
  }]

  return { certificateInfoTableData, data, isLoading, isFetched, purchaseId };
}
