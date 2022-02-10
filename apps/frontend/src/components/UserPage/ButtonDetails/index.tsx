import IconTop from './arrowTop.svg';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

interface ButtonDetailsProps {
  name: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isButtonUp: boolean;
}

const ButtonDetails = ({
  onClick,
  name,
  isButtonUp
}: ButtonDetailsProps) => {
  return (
    <StyledButton onClick={onClick}>
      {name}
      <StyledImg
        isBtnUp={isButtonUp}
        src={IconTop}
        alt="icon-top"
      />
    </StyledButton>
  );
};

const StyledButton = styled(Button)(({ theme }) => `
  width: 100%;
  height: 100%;
  padding: 10px 17px;
  background-color: ${theme.palette.secondary.main};
  box-shadow: 0px 4px 10px rgba(160, 154, 198, 0.2);
  cursor: pointer;
  font-family: Rajdhani;
  color: ${theme.palette.text.primary};
  font-size: 16px;
  font-weight: 700;
  text-transform: unset;
  &:hover {
    background-color: ${theme.palette.secondary.main},
  }
`);

const StyledImg = styled('img', { shouldForwardProp: (prop) => prop !== 'isBtnUp' })<{isBtnUp: boolean}>(({ isBtnUp }) => `
  margin-left: 20px;
  transform: ${!isBtnUp && 'rotate(180deg)'};
`);

export default ButtonDetails;
