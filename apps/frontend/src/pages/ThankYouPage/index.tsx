import { FC } from 'react';
import styled from '@mui/material/styles/styled';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import BitcoinGlobusImg from '../../assets/svg/globus.svg';

export const ThankYouPage: FC = () => {
  const theme = useTheme();
  return (
    <StyledGrid
      bgcolor={theme.palette.primary.main}
      style={bgStyle}
    >
      <Grid item>
        <Typography
          color={'secondary'}
          fontSize={'32px'}
          lineHeight={'41px'}
          fontWeight={700}
          textAlign={'center'}
          mb={'12px'}
        >
          Thank you for submitting your request
        </Typography>
        <Typography
          color={theme.palette.text.primary}
          fontSize={'20px'}
          lineHeight={'24px'}
          fontWeight={500}
          textAlign={'center'}
        >
          Our team will be in contact with you very soon
        </Typography>
      </Grid>
    </StyledGrid>
  );
};

const bgStyle = {
  backgroundImage: `url(${BitcoinGlobusImg})`,
}

const StyledGrid = styled(Grid)`
  height: calc(100vh - 88px);
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
