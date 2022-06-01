import { batchControllerFindOne, BatchDto } from "@energyweb/zero-protocol-labs-api-client"
import { useEffect, useMemo, useState } from "react"

const getBatch = async (id: string): Promise<BatchDto> => {
  return await batchControllerFindOne(id)
}

const getAllBatches = async (ids: string[], setBatches: (batches: BatchDto[]) => void): Promise<void> => {
  const batches = await Promise.all(ids.map(async (id) => await getBatch(id)))
  return setBatches(batches)
}

export const useBatchesByIds = (batchesIds: string[]) => {
  const [batches, setBatches] = useState<BatchDto[]>([])

  useEffect(() => {
    if (batchesIds.length > 0 && batches.length !== batchesIds.length) {
      getAllBatches(batchesIds, setBatches)
    }
  }, [batchesIds])

  return useMemo(() => ({ batches }), [batches])
}
