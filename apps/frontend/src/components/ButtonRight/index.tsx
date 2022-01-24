import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Icon from './arrow.svg';

export const ButtonRight = () => {
  return (
    <StyledButton>
      <img src={Icon} />
    </StyledButton>
  );
};

const StyledButton = styled(Button)(({ theme }) => `
  width: 48px;
  height: 48px;
  background-color: ${theme.palette.background.paper};
  box-shadow: 0px 4px 10px rgba(160, 154, 198, 0.2);
  cursor: pointer;
`)
