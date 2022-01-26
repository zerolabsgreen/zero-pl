import { FC } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import styled from '@mui/material/styles/styled';
import Breadcrumbs from '../../components/Breadcrumbs';
import { NotificationStrip } from './components/notification-strip';
import { ProductSummaryBlock } from './components/product-summary-block';
import { DeclineOfferModal } from './components/decline-offer-modal';
import { OfferSummaryBlock } from './components/offer-summary-block';
import { AcceptedOffer } from './components/accepted-offer';
import { ProductSummaryDetails } from './components/product-summary-details';
import { OfferStyledButton } from './components/offer-styled-button';

import { ReactComponent as MailIcon } from '../../assets/svg/mail.svg';
import { ReactComponent as CloseIcon } from '../../assets/svg/close.svg';
import { ReactComponent as OkIcon } from '../../assets/svg/ok.svg';

import { useProductOfferPageEffects } from './effects';

export const ProductOfferPage: FC = () => {
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
      <StripWrapper>
        <NotificationStrip text="You're received an Offer" height={72} />
      </StripWrapper>

      <Grid container>
        <Wrapper item xs={12}>
          <Breadcrumbs
            breadcrumbList={['Product Offer', 'PurchaseID: [productId]']}
          />
          <OfferSummaryBlock />
          <ProductSummaryBlock />
          {offerAccepted ? (
            <AcceptedOffer />
          ) : (
            <>
              <ButtonsGroupWrapper>
                <OfferStyledButton
                  variant="contained"
                  href="mailto:someone@yoursite.com"
                  endIcon={<MailIcon />}
                >
                  Contact Support
                </OfferStyledButton>
                <OfferStyledButton
                  variant="contained"
                  onClick={handleModalOpen}
                  endIcon={<CloseIcon />}
                >
                  Decline Offer
                </OfferStyledButton>
                <OfferStyledButton
                  variant="contained"
                  color="primary"
                  onClick={handleAcceptOffer}
                  endIcon={<OkIcon />}
                >
                  Accept Offer
                </OfferStyledButton>
              </ButtonsGroupWrapper>
              <ProductSummaryDetails />
            </>
          )}
        </Wrapper>
      </Grid>
    </>
  );
};

const Wrapper = styled(Grid)(({ theme }) => `
  margin-top: 72px;
  padding: 0 24px 32px 24px;
  ${theme.breakpoints.down('md')} {
    padding: 0 16px 32px 16px;
  };
`)

const StripWrapper = styled(Box)`
  position: absolute;
  width: 100%;
  left: 0;
`

const ButtonsGroupWrapper = styled(Box)(({ theme }) => `
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  ${theme.breakpoints.down('md')} {
    flex-direction: column;
  };
`)

export default ProductOfferPage;
