import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { CertificateDto, usePurchasesControllerFindOne } from '@energyweb/zero-protocol-labs-api-client'
import { TableHeader, TableRowData } from "@zero-labs/zero-ui-components";
import EthereumAddress from "../../components/EthereumAddress";
import FuelType, { FuelTypeEnum } from "../../components/FuelType";
import { formatPower, Unit } from "../../utils";

export const certificateInfoTableHeaders: TableHeader = {
  proofId: { label: 'Certificate ID', infoText: 'Certificate ID represents the identifier of certificate in EW Zero marketplace' },
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

export const useProductPageEffects = () => {
  const { productId: purchaseId } = useParams();

  const { data, isLoading, isFetched } = usePurchasesControllerFindOne(purchaseId ?? '');

  const certificateInfoTableData: TableRowData<CertificateDto['id']>[] = [{
    id: data?.certificate.id ?? '',
    proofId: <EthereumAddress shortify clipboard address={data?.certificate?.id ?? ''} />,
    product: data?.certificate?.productType ?? '',
    beneficiary: data?.filecoinNode?.id ?? '',
    amount: data?.recsSoldWh ? formatPower(data.recsSoldWh, { unit: Unit.MWh, includeUnit: true }) : '',
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
    region: `${data?.certificate?.country}${data?.certificate?.region ? ", " + data?.certificate?.region : ''}`,
    redemptionDate: dayjs(data?.certificate?.redemptionDate).isValid()
      ? dayjs(data?.certificate?.redemptionDate).utc().format('YYYY-MM-DD')
      : '-',
    seller: <EthereumAddress shortify clipboard address={data?.certificate?.initialSellerId ?? ''} />
  }]

  return {
    certificateInfoTableData,
    data,
    redemptionFile: data?.redemptionStatement ? {
      fileName: data.redemptionStatement,
      url: data.redemptionStatement
    } : undefined,
    attestationFile: data?.attestation,
    isLoading,
    isFetched,
    purchaseId
  };
}
