import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { FilecoinColors } from '../../../../utils'

interface RemoveMinerIdModalProps {
  open: boolean;
  id: number | undefined;
  handleClose: () => void;
  handleRemove: (id: number | undefined) => void;
  isFilecoin: boolean;
}

export const RemoveMinerIdModal: FC<RemoveMinerIdModalProps> = ({
  open,
  id,
  handleClose,
  handleRemove,
  isFilecoin
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <StyledPaper>
        <Typography
          color="primary"
          variant="h5"
          component="span"
          textAlign="center"
          sx={{ fontSize: { sm: '16px' } }}
        >
          Are you sure you want to remove this Miner ID / Address ?
        </Typography>
        <StyledBtnGroup>
          <StyledButton
            cancelBtn
            isFilecoin={isFilecoin}
            variant="contained"
            onClick={handleClose}
          >
            Cancel
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={() => handleRemove(id)}
            isFilecoin={isFilecoin}
          >
            Remove
          </StyledButton>
        </StyledBtnGroup>
      </StyledPaper>
    </Modal>
  );
};

const StyledPaper = styled(Paper)(({ theme }) => `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  background-color: ${theme.palette.background.paper};
  box-shadow: 24px;
  padding: 20px;
  text-align: center;
  ${theme.breakpoints.down('sm')} {
    width: 80%;
  };
`);

const StyledBtnGroup = styled(Box)`
  margin-top: 20px;
  @media (max-width: 403px) {
    display: flex;
    flex-direction: column;
  };
`;

const StyledButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'isFilecoin' })<{isFilecoin?: boolean, cancelBtn?: boolean}>(({ theme, isFilecoin, cancelBtn }) => `
  color: ${theme.palette.background.paper};
  background-color: ${isFilecoin && FilecoinColors.primary};
  &:hover {
    background-color: ${isFilecoin ? FilecoinColors.primaryLight : theme.palette.secondary.main};
    color: ${isFilecoin && FilecoinColors.primary}
  };
  margin-right: ${cancelBtn && '15px'};
  @media (max-width: 403px) {
    margin-right: ${cancelBtn && '0'};
    margin-bottom: ${cancelBtn && '5px'};
  };
`)
