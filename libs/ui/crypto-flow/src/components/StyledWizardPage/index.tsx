import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

export const WizardPageWrapper = styled(Grid)(
  ({ theme }) => `
  background-color: ${theme.palette.primary.main};
  background-image: url('./globus.svg');
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  min-height: 100vh;
`
);

export const WizardContentWrapper = styled(Grid)`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitleWrapper = styled(Box)`
  margin: 70px 0 37px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled(Typography)`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
`;

export const Subtitle = styled(Typography)`
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  max-width: 380px;
  margin-top: 18px;
`;
