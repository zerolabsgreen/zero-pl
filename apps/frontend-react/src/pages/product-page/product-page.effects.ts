import { useParams } from 'react-router-dom';
import { usePurchasesControllerFindOne } from '@energyweb/zero-protocol-labs-api-client';

export const useProductPageEffects = () => {
  const { productId: purchaseId } = useParams();

  const { data, isLoading, isFetched } = usePurchasesControllerFindOne(
    purchaseId ?? ''
  );

  return { data, isLoading, isFetched, purchaseId };
};
