import { usePurchasesControllerGetBlockchainEvents } from '@energyweb/zero-protocol-labs-api-client';

export const useTableListProofsEffects = (purchaseId: string) => {
  const { data: blockchainEvents, isLoading } = usePurchasesControllerGetBlockchainEvents(purchaseId);
  return { blockchainEvents, isLoading };
}
