import { FC } from 'react';
import clsx from 'clsx';
import { Grid, Box, Typography } from '@material-ui/core';
import Info from '../info/info';
import UserAvatar from '../user-avatar/user-avatar';
import PageSection from '../page-section/page-section';
import FieldLabel from '../field-label/field-label';
import FieldValue from '../field-value/field-value';
import avatarImage from '../../assets/images/avatar.png';
import { Unit } from '../../utils';
import { useStyles } from './offer-summary-block.style';
import { useOfferSummaryBlockEffects } from './offer-summary-block.effects';
import { offerMockData } from '../../__mock__';

export const OfferSummaryBlock: FC = () => {
  const classes = useStyles();
  const { displayVolume, priceToPay, formattedReservedUntilDate } =
    useOfferSummaryBlockEffects({
      price: offerMockData.price,
      quantity: offerMockData.quantity,
      reservedUntil: offerMockData.reservedUntil,
    });

  return (
    <PageSection
      headingText={'Offer Summary'}
      sectionHelpText="This offer was created for you by"
      paperClassName={classes.sectionPaper}
      wrapperClassName={classes.wrapperClassName}
      headingTextClassName={classes.headingTextClassName}
      helperTextClassName={classes.helperText}
    >
      <Grid container>
        <Grid item xs={12} md={6} lg={4} xl={4}>
          <Box
            display="flex"
            justifyContent="space-between"
            className={classes.mainInfoWrapper}
          >
            <UserAvatar
              image={avatarImage}
              name={offerMockData.createdBy}
              name2={offerMockData.manager}
              position={offerMockData.position}
            />
            <Box className={classes.mainInfo}>
              <Box className={classes.infoItem}>
                <FieldLabel
                  labelText={'Request ID'}
                  className={classes.label}
                  sx={{ marginBottom: '9px' }}
                />
                <Typography className={clsx(classes.value, classes.secondary)}>
                  {offerMockData.requestId}
                </Typography>
              </Box>
              <Box className={classes.infoItem}>
                <FieldLabel
                  sx={{ marginBottom: { xs: '9px', md: '5px' } }}
                  labelText={'Offer ID'}
                  className={classes.label}
                />
                <Typography className={clsx(classes.value, classes.secondary)}>
                  {offerMockData.offerId}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={8}
          xl={8}
          className={classes.secondaryInfoWrapper}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              md={12}
              lg={6}
              xl={6}
              className={classes.secondaryInfo}
            >
              <Box className={classes.infoItem}>
                <Info
                  boxProps={{ display: 'flex ' }}
                  popoverContent="Product summary"
                >
                  <FieldLabel
                    mb={'9px'}
                    labelText={'Product summary'}
                    className={classes.label}
                  />
                </Info>
                <Typography className={classes.value}>
                  {offerMockData.productSummary}
                </Typography>
              </Box>
              <Box className={classes.infoItem}>
                <FieldLabel
                  mb={'5px'}
                  labelText={'Offer Reserved until'}
                  className={classes.label}
                />
                <FieldValue
                  valueText={formattedReservedUntilDate}
                  className={classes.value}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={6} xl={6}>
              <Grid container spacing={4}>
                <Grid item>
                  <Box className={classes.infoItem}>
                    <FieldLabel
                      mb={'11px'}
                      labelText={'Quantity'}
                      className={classes.label}
                    />
                    <Typography className={classes.value}>
                      {displayVolume}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Box className={classes.infoItem}>
                    <Info
                      boxProps={{ display: 'flex ' }}
                      popoverContent="Price"
                    >
                      <FieldLabel
                        mb={'11px'}
                        labelText={'Price'}
                        className={classes.label}
                      />
                    </Info>
                    <Typography className={classes.value}>
                      {offerMockData.price}
                      <span>$ / {Unit.MWh}</span>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Box className={classes.infoItem}>
                    <FieldLabel
                      mb={'11px'}
                      labelText={'Total to Pay'}
                      className={classes.label}
                    />
                    <Typography className={classes.value}>
                      {priceToPay} $
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Box maxWidth={260} className={classes.infoItem}>
                <FieldLabel
                  mb="7px"
                  labelText={'Accepted Payment methods'}
                  className={classes.label}
                />
                <Typography className={clsx(classes.value, classes.payment)}>
                  Wire Tranfer: {offerMockData.paymentMethods.wire} <br />
                  Crypto: {offerMockData.paymentMethods.crypto}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageSection>
  );
};
