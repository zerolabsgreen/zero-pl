import { FC } from 'react';
import { Grid, Typography } from '@material-ui/core';
import BitcoinGlobusImg from '../../assets/svg/globus.svg';
import { variables } from '@energyweb/zero-protocol-labs-theme';
import { useStyles } from './thank-you-page.style';

export const ThankYouPage: FC = () => {
  const classes = useStyles();
  return (
    <Grid
      className={classes.grid}
      bgcolor={variables.primaryColor}
      style={{
        backgroundImage: `url(${BitcoinGlobusImg})`,
      }}
    >
      <Grid item>
        <Typography
          color={variables.secondaryColor}
          fontSize={'32px'}
          lineHeight={'41px'}
          fontWeight={700}
          textAlign={'center'}
          mb={'12px'}
        >
          Thank you for submitting your request
        </Typography>
        <Typography
          color={variables.white}
          fontSize={'20px'}
          lineHeight={'24px'}
          fontWeight={500}
          textAlign={'center'}
        >
          Our team will be in contact with you very soon
        </Typography>
      </Grid>
    </Grid>
  );
};
