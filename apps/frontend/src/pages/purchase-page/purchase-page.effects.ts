import { useParams } from "react-router-dom";
import {
  FilecoinNodesControllerGetTransactions200TransactionsItem,
  PurchaseDto,
  purchasesControllerFindOne,
  useFilecoinNodesControllerGetTransactions
} from '@energyweb/zero-protocol-labs-api-client';
import { useEffect, useState } from "react";

export const usePurchasePageEffects = () => {
  const [transactionsData, setTransactionsData] = useState<PurchaseDto[]>([]);
  const { productId } = useParams();

  const { data, isLoading, isFetched } = useFilecoinNodesControllerGetTransactions(productId);
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

  return { transactionsData, isLoading, isFetched };
}
