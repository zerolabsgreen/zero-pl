import { certificatesControllerFindOneWithPurchases, CertificateWithPurchasesDto } from "@energyweb/zero-protocol-labs-api-client"
import { useEffect, useMemo, useState } from "react"

const getCertificate = async (id: string): Promise<CertificateWithPurchasesDto> => {
  return await certificatesControllerFindOneWithPurchases(id)
}

const getAllPurchases = async (ids: string[], setCertificates: (purchases: CertificateWithPurchasesDto[]) => void): Promise<void> => {
  const certificates = await Promise.all(ids.map(async (id) => await getCertificate(id)))
  return setCertificates(certificates)
}

export const useCertificatesByIds = (certificateIds: string[]) => {
  const [certificates, setCertificates] = useState<CertificateWithPurchasesDto[]>([])

  useEffect(() => {
    if (certificateIds.length > 0 && certificates.length === 0) {
      getAllPurchases(certificateIds, setCertificates)
    }
  }, [certificateIds])

  return useMemo(() => ({ certificates }), [certificates])
}
