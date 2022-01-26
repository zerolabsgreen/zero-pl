import Grid, { GridProps } from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { styled, Theme } from "@mui/material/styles";
import { FilecoinColors } from "../../utils";
import BitcoinGlobusImg from '../../assets/svg/globus.svg';
import FilecoinGlobusImg from '../../assets/svg/filecoinGlobus.svg';
import Step, { StepProps } from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

interface WrapperProps extends GridProps {
  isFilecoin?: boolean;
}

export const GridWrapper = styled(Grid, { shouldForwardProp: (prop) => prop !== 'isFilecoin' })<WrapperProps>(({ theme, isFilecoin }) => `
  min-height: 100vh;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  background-color: ${isFilecoin ? FilecoinColors.background : theme.palette.primary.main};
  background-image: ${isFilecoin ? `url(${FilecoinGlobusImg})` : `url(${BitcoinGlobusImg})`};
`);

interface ResponsiveGridProps extends GridProps {
  smDownScreen?: boolean;
};

export const ResponsiveGrid = styled(Grid, { shouldForwardProp: (prop) => prop !== 'smDownScreen' })<ResponsiveGridProps>(({ smDownScreen }) => `
  margin: 0 auto;
  padding: ${smDownScreen ? '0 15px' : '0'};
  display: flex;
  flex-direction: column;
  align-items: center;
`)

export const BoxWrapper = styled(Box)(({ theme }) => `
  margin: 70px 0 37px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${theme.breakpoints.down('sm')} {
    margin: 55px 0 49px 0;
  };
`)

interface StyledTypographyProps extends TypographyProps {
  isFilecoin?: boolean;
}

export const StepTitle = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isFilecoin' })<StyledTypographyProps>(({ theme, isFilecoin }) => `
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  color: ${isFilecoin ? FilecoinColors.primary : theme.palette.secondary.main};
`)

export const StepSubtitle = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isFilecoin' })<StyledTypographyProps>(({ theme, isFilecoin }) => `
  max-width: 383px;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  color: ${isFilecoin ? FilecoinColors.simpleText : theme.palette.text.primary};
`)

export const StyledForm = styled('form')(({ theme }) => `
  display: flex;
  flex-direction: column;
  width: 488px;
  ${theme.breakpoints.down('sm')} {
    width: 100%
  };
`)

interface StyledStepProps extends StepProps {
  isFilecoin?: boolean;
}

const getFillColor = (isFilecoin: boolean | undefined, active: boolean | undefined, theme: Theme) => {
  if (isFilecoin && active) return theme.palette.secondary.main;
  if (isFilecoin && !active) return FilecoinColors.primary;
  if (!isFilecoin && active) return theme.palette.secondary.main;
  return theme.palette.text.secondary;
}

export const StyledStep = styled(Step, { shouldForwardProp: (prop) => prop !== 'isFilecoin' })<StyledStepProps>(({ isFilecoin, active, theme }) => `
  & .MuiStepLabel-iconContainer {
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: 2px solid ${getFillColor(isFilecoin, active, theme)};
    & .Mui-active {
      color: 'transparent';
    };
    & .MuiSvgIcon-root {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      & circle {
        display: none;
      };
    };
  };
  & .MuiStepIcon-text {
    font-size: 15px;
    font-weight: 500;
    fill: ${getFillColor(isFilecoin, active, theme)};
  };
  & .MuiStepLabel-labelContainer {
    color: ${getFillColor(isFilecoin, active, theme)};
    & .Mui-active {
      color: ${getFillColor(isFilecoin, active, theme)};
    };
  };
`)

export const StyledLabel = styled(StepLabel)(({ theme }) => `
  width: 100px;
  ${theme.breakpoints.down('sm')} {
    width: 60px;
  };
`);

export const ButtonsWrapper = styled(Box)(({ theme }) => `
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
   & .MuiButton-root {
      background-color: ${theme.palette.background.paper};
      color: ${theme.palette.primary.main};
      font-size: 16px;
      font-weight: 700;
      box-shadow: 0px 4px 10px rgba(160, 154, 198, 0.2);
      border-radius: 5px;
    };
    ${theme.breakpoints.down('sm')} {
      margin-top: 16px;
    };
`);

export const BelowFormTextWrapper = styled(Box)(({ theme }) => `
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 81px;
  margin-bottom: 9px;
  ${theme.breakpoints.down('lg')} {
    margin-top: 98px;
    margin-bottom: 43px;
  };
  ${theme.breakpoints.down('sm')} {
    margin-top: 72px;
    margin-bottom: 34px;
  };
`);

export const BelowFormTitle = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isFilecoin' })<StyledTypographyProps>(({ theme, isFilecoin }) => `
  color: ${isFilecoin ? FilecoinColors.primary : theme.palette.secondary.main};
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  line-height: 30px;
  max-width: 450px;
`);

export const BelowFormText = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isFilecoin' })<StyledTypographyProps>(({ theme, isFilecoin }) => `
  color: ${isFilecoin ? FilecoinColors.simpleText : theme.palette.text.primary};
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  max-width: 685px;
  line-height: 24px;
  margin-top: 9px;
  ${theme.breakpoints.down('lg')} {
    margin-top: 43px;
  };
  ${theme.breakpoints.down('sm')} {
    margin-top: 34px;
  };
`);

export const ReadMoreSpan = styled('span', { shouldForwardProp: (prop) => prop !== 'isFilecoin' })<{ isFilecoin: boolean }>(({ theme, isFilecoin }) => `
  cursor: pointer;
  color: ${isFilecoin ? FilecoinColors.primary : theme.palette.secondary.main};
`);
