import { useState } from 'react';

export const useProductOfferPaymentEffects = () => {
  const [wirePayment, setWirePayment] = useState(true);
  const [cryptoPayment, setCryptoPayment] = useState(false);

  const handleWirePayment = () => {
    setWirePayment(!wirePayment);
    setCryptoPayment(!cryptoPayment);
  };

  const handleCryptoPayment = () => {
    setCryptoPayment(!cryptoPayment);
    setWirePayment(!wirePayment);
  };

  return {
    wirePayment,
    handleWirePayment,
    cryptoPayment,
    handleCryptoPayment,
  };
};
