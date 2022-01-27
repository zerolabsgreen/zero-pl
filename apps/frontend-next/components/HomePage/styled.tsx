import {styled} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const Wrapper = styled(Grid)(({ theme }) => `
  background-color: ${theme.palette.primary.main};
`);

export const WelcomeBlock = styled(Grid)`
  padding: 0 41px 0 40px;
  background-image: url('./welcome-bg.svg');
  background-size: cover;
  background-repeat: round;
`;

export const WelcomeTitle = styled(Typography)`
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  line-height: 51px;
  margin-bottom: 5px;
  padding-top: 105px;
`;

export const WelcomeSubtitle = styled(Typography)`
  font-size: 24px;
  font-weight: 600;
  line-height: 30px;
  text-align: center;
  margin-bottom: 48px;
  color: #fff;
`
