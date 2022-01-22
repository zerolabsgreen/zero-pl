import { useState } from 'react';

export const useProductOfferPageEffects = () => {
  const [declineModalOpen, setDeclineModalOpen] = useState(false);
  const [offerAccepted, setOfferAccepted] = useState(false);

  const handleModalOpen = () => setDeclineModalOpen(true);
  const handleModalClose = () => setDeclineModalOpen(false);
  const handleAcceptOffer = () => setOfferAccepted(true);

  return {
    offerAccepted,
    declineModalOpen,
    handleModalOpen,
    handleModalClose,
    handleAcceptOffer,
  };
};
