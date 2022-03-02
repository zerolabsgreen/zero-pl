import { FindContractDto } from "@energyweb/zero-protocol-labs-api-client";
import { BigNumber } from "@ethersproject/bignumber";

export const getContractTotalVolume = (contract: FindContractDto): number => {
  const openVolumeBn = BigNumber.from(contract?.openVolume ?? 0)
  const deliveredVolumeBn = BigNumber.from(contract?.deliveredVolume ?? 0)
  return openVolumeBn.add(deliveredVolumeBn).toNumber()
}
