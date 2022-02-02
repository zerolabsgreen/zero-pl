import Button, { ButtonProps } from "@mui/material/Button";
import Grid, { GridProps } from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { FilecoinColors } from "../../utils";

interface WrapperProps extends GridProps {
  isFilecoin?: boolean;
}

export const Wrapper = styled(Grid, { shouldForwardProp: (prop) => prop !== 'isFilecoin' })<WrapperProps>(({ theme, isFilecoin }) => `
  background-color: ${isFilecoin ? FilecoinColors.background : theme.palette.primary.main};
  background-image: ${isFilecoin ? "url(/svg/filecoinGlobus.svg)" : "url(/svg/globus.svg)"};
  min-height: 92vh;
  display: flex;
  background-repeat: no-repeat;
  background-position: center;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  ${theme.breakpoints.down('lg')} {
    justify-content: center;
  };
`);

interface BackButtonProps extends ButtonProps {
  isFilecoin?: boolean;
}

export const BackButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'isFilecoin' })<BackButtonProps>(({ theme, isFilecoin }) => `
  background-color: ${theme.palette.background.paper};
  box-shadow: 0px 4px 10px rgba(160, 154, 198, 0.2);
  border: none;
  border-radius: 5px;
  color: ${theme.palette.primary.main};
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
  padding: 14px 21px;
  &:hover {
    background-color: ${isFilecoin ? FilecoinColors.primary : theme.palette.secondary.main};
    & .MuiButton-endIcon svg path {
      fill: ${isFilecoin ? FilecoinColors.primaryLight : theme.palette.primary.main}
    }
  };
  ${theme.breakpoints.down('lg')} {
    margin-top: 109px;
  };
  ${theme.breakpoints.down('sm')} {
    margin-top: 32px;
  };
`)
