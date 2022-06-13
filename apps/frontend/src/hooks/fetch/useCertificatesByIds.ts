import { certificatesControllerFindOneWithPurchases, CertificateWithPurchasesDto } from "@energyweb/zero-protocol-labs-api-client"
import { useEffect, useMemo, useState } from "react"

const getCertificate = async (id: string): Promise<CertificateWithPurchasesDto> => {
  return await certificatesControllerFindOneWithPurchases(id)
}

const getAllPurchases = async (
  ids: string[],
  setCertificates: (purchases: CertificateWithPurchasesDto[]) => void,
  setLoading: (value: boolean) => void
): Promise<void> => {
  setLoading(true)
  const certificates = await Promise.all(ids.map(async (id) => await getCertificate(id)))
  setLoading(false)
  return setCertificates(certificates)
}

export const useCertificatesByIds = (certificateIds: string[]) => {
  const [certificates, setCertificates] = useState<CertificateWithPurchasesDto[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (certificateIds.length > 0 && certificates.length !== certificateIds.length) {
      getAllPurchases(certificateIds, setCertificates, setIsLoading)
    }
  }, [certificateIds])

  return useMemo(() => ({ certificates, isLoading }), [certificates])
}
