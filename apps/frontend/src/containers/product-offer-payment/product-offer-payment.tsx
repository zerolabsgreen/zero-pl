import { FC } from 'react';
import { Box } from '@mui/material';
import SwitchLabels from '../../components/switch-label/switch-label';
import { WireTransferInstructions } from '../wire-transfer-instructions';
import { CryptoPaymentInstructions } from '../../components/crypto-payment-instructions';
import { useProductOfferPaymentEffects } from './product-offer-payment.effects';
import { useStyles } from './product-offer-payment.style';

interface ProductOfferPaymentProps {
  paymentTransactionUrl: string;
  handleTransactionUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProductOfferPayment: FC<ProductOfferPaymentProps> = ({
  paymentTransactionUrl,
  handleTransactionUrlChange,
}) => {
  const classes = useStyles();

  const { wirePayment, cryptoPayment, handleWirePayment, handleCryptoPayment } =
    useProductOfferPaymentEffects();

  return (
    <Box>
      <Box className={classes.switchWrapper}>
        <SwitchLabels
          labelName={'I’ll pay with a Wire transfer'}
          boxProps={{ className: classes.switch, mr: 8 }}
          checked={wirePayment}
          setChecked={handleWirePayment}
        />
        <SwitchLabels
          labelName={'I’ll pay with crypto'}
          boxProps={{ className: classes.switch }}
          checked={cryptoPayment}
          setChecked={handleCryptoPayment}
        />
      </Box>
      {wirePayment && <WireTransferInstructions />}
      {cryptoPayment && (
        <CryptoPaymentInstructions
          paymentTransactionUrl={paymentTransactionUrl}
          handleTransactionUrlChange={handleTransactionUrlChange}
        />
      )}
    </Box>
  );
};
