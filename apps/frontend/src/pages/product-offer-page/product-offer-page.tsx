import { FC } from 'react';
import { Grid, Box } from '@material-ui/core';
import {
  OfferSummaryBlock,
  AcceptedOffer,
  ProductSummaryDetails,
} from '../../components';
import { StyledButton } from '../../components/buttons';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import NotificationStrip from '../../components/notification-strip/notification-strip';
import { ProductSummaryBlock } from '../../containers';
import { DeclineOfferModal } from '../../containers/modals';
import { ReactComponent as MailIcon } from '../../assets/svg/mail.svg';
import { ReactComponent as CloseIcon } from '../../assets/svg/close.svg';
import { ReactComponent as OkIcon } from '../../assets/svg/ok.svg';
import { useProductOfferPageEffects } from './ProductOfferPage.effects';
import { useStyles } from './product-offer-page.style';

export const ProductOfferPage: FC = () => {
  const classes = useStyles();
  const {
    offerAccepted,
    declineModalOpen,
    handleModalOpen,
    handleModalClose,
    handleAcceptOffer,
  } = useProductOfferPageEffects();

  return (
    <>
      <DeclineOfferModal
        open={declineModalOpen}
        handleClose={handleModalClose}
      />
      <Box className={classes.stripWrapper}>
        <NotificationStrip text="You're received an Offer" height={72} />
      </Box>

      <Grid container>
        <Grid item xs={12} className={classes.wrapper}>
          <Breadcrumbs
            breadcrumbList={['Product Offer', 'PurchaseID: [productId]']}
          />
          <OfferSummaryBlock />
          <ProductSummaryBlock />
          {offerAccepted ? (
            <AcceptedOffer />
          ) : (
            <>
              <Box className={classes.buttonsGroup}>
                <StyledButton
                  variant="contained"
                  classes={{ endIcon: classes.endIcon }}
                  href="mailto:someone@yoursite.com"
                  endIcon={<MailIcon />}
                >
                  Contact Support
                </StyledButton>
                <StyledButton
                  variant="contained"
                  onClick={handleModalOpen}
                  classes={{ endIcon: classes.endIcon }}
                  endIcon={<CloseIcon />}
                >
                  Decline Offer
                </StyledButton>
                <StyledButton
                  variant="contained"
                  color="primary"
                  onClick={handleAcceptOffer}
                  classes={{ endIcon: classes.endIcon }}
                  endIcon={<OkIcon />}
                >
                  Accept Offer
                </StyledButton>
              </Box>
              <ProductSummaryDetails />
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ProductOfferPage;
