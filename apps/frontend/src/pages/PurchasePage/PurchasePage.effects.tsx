import { Link, useParams } from "react-router-dom";
import {
  FilecoinNodesControllerGetTransactions200TransactionsItem,
  PurchaseDto,
  purchasesControllerFindOne,
  useFilecoinNodesControllerGetTransactions
} from '@energyweb/zero-protocol-labs-api-client';
import { useEffect, useState } from "react";
import { TableHeader, TableRowData } from "@zero-labs/zero-ui-components";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import EthereumAddress from "../../components/ethereum-address/ethereum-address";
import { ButtonRight } from "../../components/button-right/button-right";

dayjs.extend(utc);

export const purchaseInfoHeaders: TableHeader = {
  purchaseId: { label: 'Purchase ID' },
  sellerName: { label: 'Seller name' },
  generatorId: { label: 'Generator ID' },
  country: { label: 'Country' },
  energySource: { label: 'Energy Source' },
  amountPurchased: { label: 'Amount Purchased' },
  purchaseDate: { label: 'Purchase Date' },
  action: { label: '' }
}

export const usePurchasePageEffects = () => {
  const [transactionsData, setTransactionsData] = useState<PurchaseDto[]>([]);
  const { productId } = useParams();

  const { data, isLoading, isFetched } = useFilecoinNodesControllerGetTransactions(productId ?? '');
  const transactions = data?.transactions;

  const fetchAllTransactionsData = async (transactions: FilecoinNodesControllerGetTransactions200TransactionsItem[]) => {
    const newTxsData = await Promise.all(
      transactions.map(
        async (tx) => await purchasesControllerFindOne(`${tx.id}`)
      )
    )
    setTransactionsData(newTxsData);
  }

  useEffect(() => {
    if(transactions && transactions.length > 0) {
      fetchAllTransactionsData(transactions);
    }
  }, [transactions])

  const purchaseInfoTableData: TableRowData<PurchaseDto['id']>[] = transactionsData.map(tx => ({
    id: tx.id,
    purchaseId: <EthereumAddress shortify clipboard address={tx.id} />,
    sellerName: tx.seller.name,
    generatorId: tx.certificate.generatorId,
    country: tx.certificate.country,
    energySource: tx.certificate.energySource,
    amountPurchased: `${tx.recsSold} MWh`,
    purchaseDate: `${dayjs(tx.certificate.generationStart).isValid()
      ? dayjs(tx.certificate.generationStart)
          .utc()
          .format('YYYY-MM-DD')
      : '-'} / ${dayjs(tx.certificate.generationEnd).isValid()
      ? dayjs(tx.certificate.generationEnd)
          .utc()
          .format('YYYY-MM-DD')
      : '-'}`,
    action: (
      <Link to={`/partners/filecoin/purchases/${tx.id}`}>
        <ButtonRight />
      </Link>
    )
  }))

  return { transactionsData, purchaseInfoTableData, isLoading, isFetched };
}
