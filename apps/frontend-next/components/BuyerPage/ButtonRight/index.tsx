import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { ReactComponent as RightArrowSvg } from './arrow.svg';

const ButtonRight = () => {
  return (
    <StyledButton>
      <RightArrowSvg />
    </StyledButton>
  );
};

export default ButtonRight;

const StyledButton = styled(Button)(({ theme }) => `
  width: 48px;
  height: 48px;
  background-color: ${theme.palette.background.paper};
  box-shadow: 0px 4px 10px rgba(160, 154, 198, 0.2);
  cursor: pointer;
  &:hover {
    & svg {
      & path {
        transition: all .1s ease-in;
        fill: ${theme.palette.primary.main}
      }
    }
  }
`)
