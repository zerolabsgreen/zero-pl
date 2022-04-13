import { FullPurchaseDto, purchasesControllerFindOne } from "@energyweb/zero-protocol-labs-api-client"
import { useEffect, useMemo, useState } from "react"

const getPurchase = async (id: string): Promise<FullPurchaseDto> => {
  return await purchasesControllerFindOne(id)
}

const getAllPurchases = async (ids: string[], setPurchases: (purchases: FullPurchaseDto[]) => void): Promise<void> => {
  const purchases = await Promise.all(ids.map(async (id) => await getPurchase(id)))
  return setPurchases(purchases)
}

export const usePurchasesByIds = (purchaseIds: string[]) => {
  const [purchases, setPurchases] = useState<FullPurchaseDto[]>([])

  useEffect(() => {
    if (purchaseIds.length > 0 && purchases.length === 0) {
      getAllPurchases(purchaseIds, setPurchases)
    }
  }, [purchaseIds])

  return useMemo(() => ({ purchases }), [purchaseIds])
}
