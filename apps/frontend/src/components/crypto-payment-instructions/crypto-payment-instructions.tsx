import { FC } from 'react';
import { Grid, Box, Typography, FormLabel, TextField } from '@material-ui/core';
import { CryptoPaymentInformation } from '../../components/crypto-payment-information';
import { useStyles } from './crypto-payment-instructions.style';
import { cryptoPaymentDataMock } from '../../__mock__';

interface CryptoPaymentInstructionsProps {
  paymentTransactionUrl: string;
  handleTransactionUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CryptoPaymentInstructions: FC<CryptoPaymentInstructionsProps> = ({
  paymentTransactionUrl,
  handleTransactionUrlChange,
}) => {
  const classes = useStyles();

  return (
    <>
      <Box>
        <Typography className={classes.title}>
          Crypto Payment instructions
        </Typography>
      </Box>
      <Grid container>
        <Grid container sx={{ mt: { xs: 2, md: 3 }, mb: { xs: 0, md: 1 } }}>
          <Grid item xs={12} md={6} className={classes.fieldWrapper}>
            <FormLabel className={classes.label}>
              Payment Transaction URL
            </FormLabel>
            <TextField
              fullWidth
              id="crypto"
              name="crypto"
              className={classes.field}
              value={paymentTransactionUrl}
              onChange={handleTransactionUrlChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className={classes.formDescriptionItem}>
              <Typography className={classes.descriptionTitle}>
                [Optional]
              </Typography>
              <Typography className={classes.descriptionText}>
                URL of the payment transaction pubblicly accessible in a
                blockchain explorer
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} sx={{ pr: { xs: 0, md: 1, lg: 7.2 } }}>
          <CryptoPaymentInformation
            blockchain={cryptoPaymentDataMock.blockchain}
            address={cryptoPaymentDataMock.address}
            transferConcept={cryptoPaymentDataMock.transferConcept}
            amountAndCurrency={
              <>
                {cryptoPaymentDataMock.amountAndCurrency.map((item) => (
                  <span key={item}>{item} </span>
                ))}
              </>
            }
            boxProps={{ sx: { mt: { xs: 0, md: 2 } } }}
          />
        </Grid>
      </Grid>
    </>
  );
};
