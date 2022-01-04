import { FC } from 'react';
import { Grid, Box, BoxProps, Typography } from '@mui/material';
import { useStyles } from './wire-transfer-information.styles';

interface WireTransferInformationProps {
  accountHolder: string;
  iban: string;
  swift: string;
  amount: string;
  currency: string;
  transferConcept: string;
  boxProps?: BoxProps;
}

export const WireTransferInformation: FC<WireTransferInformationProps> = ({
  accountHolder,
  iban,
  swift,
  amount,
  currency,
  transferConcept,
  boxProps,
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.wrapper} {...boxProps}>
      <Grid container alignItems="center" className={classes.item}>
        <Grid item xs={12} md={5}>
          <Typography className={classes.label}>Account Holder</Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography className={classes.value}>{accountHolder}</Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.item}>
        <Grid item xs={12} md={5}>
          <Typography className={classes.label}>IBAN</Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography className={classes.value}>{iban}</Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.item}>
        <Grid item xs={12} md={5}>
          <Typography className={classes.label}>SWIFT</Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography className={classes.value}>{swift}</Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.item}>
        <Grid item xs={12} md={5}>
          <Typography className={classes.label}>Amount</Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography className={classes.value}>{amount}</Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.item}>
        <Grid item xs={12} md={5}>
          <Typography className={classes.label}>Currency</Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography className={classes.value}>{currency}</Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.item}>
        <Grid item xs={12} md={5}>
          <Typography className={classes.label}>Transfer Concept</Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography className={classes.value}>{transferConcept}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
