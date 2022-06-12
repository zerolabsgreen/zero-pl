import { CertificateWithPurchasesDto, certificatesControllerFindOneWithPurchases } from "@energyweb/zero-protocol-labs-api-client"
import { useEffect, useMemo, useState } from "react"

const getPurchase = async (id: string): Promise<CertificateWithPurchasesDto> => {
  return await certificatesControllerFindOneWithPurchases(id)
}

const getAllPurchases = async (
  ids: string[],
  setPurchases: (purchases: CertificateWithPurchasesDto[]) => void
): Promise<void> => {
  const purchases = await Promise.all(ids.map(async (id) => await getPurchase(id)))
  return setPurchases(purchases)
}

export const useCertificatesWithPurchases = (certificateIds: string[]) => {
  const [data, setData] = useState<CertificateWithPurchasesDto[] | undefined>(undefined)

  useEffect(() => {
    if (certificateIds.length > 0 && data === undefined) {
      getAllPurchases(certificateIds, setData)
    }
  }, [certificateIds])

  const isLoading = data === undefined

  return useMemo(() => ({ data: data ?? [], isLoading }), [data, isLoading])
}
