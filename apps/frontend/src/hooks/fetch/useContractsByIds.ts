import { contractsControllerFindOne, FindContractDto } from "@energyweb/zero-protocol-labs-api-client"
import { uniqBy } from "lodash"
import { useEffect, useMemo, useState } from "react"

const getContract = async (id: string): Promise<FindContractDto> => {
  return await contractsControllerFindOne(id)
}

const getAllContracts = async (
  ids: string[],
  setContracts: (contracts: FindContractDto[]) => void
): Promise<void> => {
  const contracts = await Promise.all(ids.map(async (id) => await getContract(id)))
  const uniqContracts = uniqBy(contracts, 'id')
  return setContracts(uniqContracts)
}

export const useContractsByIds = (contractsIds: string[]) => {
  const [contracts, setContracts] = useState<FindContractDto[]>([])

  useEffect(() => {
    if (contractsIds.length > 0 && contracts.length === 0) {
      getAllContracts(contractsIds, setContracts)
    }
  }, [contractsIds])

  return useMemo(() => ({ contracts }), [contracts])
}
