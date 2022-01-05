import { FC } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { StyledButton } from '../buttons';
import { ProductOfferForm } from '../../containers/product-offer-form';
import { ProductOfferPayment } from '../../containers/product-offer-payment';
import { ReactComponent as EditIcon } from '../../assets/svg/edit.svg';
import { ReactComponent as SendIcon } from '../../assets/svg/send-message.svg';
import { useAcceptedOfferEffects } from './accepted-offer.effects';
import { useStyles } from './accepted-offer.style';

export const AcceptedOffer: FC = () => {
  const classes = useStyles();
  const { form } = useAcceptedOfferEffects();

  return (
    <form onSubmit={form.handleSubmit}>
      <Paper className={classes.paper}>
        <Typography className={classes.title}>
          Thanks for accepting the offer.
        </Typography>
        <Typography className={classes.subTitle}>Next Steps:</Typography>
        <ul className={classes.list}>
          <li>
            Fill in the information needed to retire the certificates in your
            name and choose your favorite payment method
          </li>
          <li>
            You will receive a payment confirmation to your email{' '}
            <a href="mailto: owner@FileVaults.io">owner@FileVaults.io</a>
          </li>
          <li>
            Once your payment has been processed you’ll receive an email with
            your requested product within 5 business days
          </li>
        </ul>
      </Paper>
      <Paper className={classes.formPaper}>
        <ProductOfferForm values={form.values} onChange={form.handleChange} />
        <ProductOfferPayment
          paymentTransactionUrl={form.values.crypto}
          handleTransactionUrlChange={form.handleChange}
        />
      </Paper>
      <Box className={classes.buttonsGroup}>
        <StyledButton
          variant="contained"
          className={classes.button}
          classes={{ endIcon: classes.endIcon }}
          endIcon={<EditIcon />}
        >
          Edit data
        </StyledButton>
        <StyledButton
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
          classes={{ endIcon: classes.endIcon }}
          endIcon={<SendIcon />}
        >
          Submit Information
        </StyledButton>
      </Box>
    </form>
  );
};
