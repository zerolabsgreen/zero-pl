import { FC, ReactElement } from 'react';
import { Grid, Box, BoxProps, Typography } from '@material-ui/core';
import CopyToClipboard from '../copy-to-clipboard/copy-to-clipboard';
import { useStyles } from './crypto-payment-information.style';

interface CryptoPaymentInformationProps {
  blockchain: string;
  address: string;
  amountAndCurrency: string | ReactElement;
  transferConcept: string;
  boxProps?: BoxProps;
}

export const CryptoPaymentInformation: FC<CryptoPaymentInformationProps> = ({
  blockchain,
  address,
  amountAndCurrency,
  transferConcept,
  boxProps,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper} {...boxProps}>
      <Grid container alignItems="center" className={classes.item}>
        <Grid item xs={12} md={4}>
          <Typography className={classes.label}>Blockchain</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography className={classes.value}>{blockchain}</Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.item}>
        <Grid item xs={12} md={4}>
          <Typography className={classes.label}>Address</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box display="flex" alignItems="flex-star">
            <Typography className={classes.value} noWrap mr={0.7}>
              {address}
            </Typography>
            <CopyToClipboard value={address} />
          </Box>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.item}>
        <Grid item xs={12} md={4} alignSelf="flex-start">
          <Typography className={classes.label}>Amount & currency</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography className={classes.value}>{amountAndCurrency}</Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.item}>
        <Grid item xs={12} md={4}>
          <Typography className={classes.label}>Transfer Concept</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography className={classes.value}>{transferConcept}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
