import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import { css } from '@emotion/css';
import CopyToClipboard from "../CopyToClipboard";

interface EthAddressPopoverProps {
  address: string;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  anchorEl: null;
}

const EthAddressPopover: FC<EthAddressPopoverProps> = ({ address, anchorEl, open, handleClose, handleOpen }) => {
  const userExplorerLink = `${window.config.BLOCK_EXPLORER}/address/${address}`;
  return (
    <Popover
      id="eth-address-popover"
      open={open}
      anchorEl={anchorEl}
      className={popoverClass}
      classes={{ paper: popoverContentClass }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      sx={{
        pointerEvents: 'none',
      }}
      onClose={handleClose}
      PaperProps={{ onMouseEnter: handleOpen, onMouseLeave: handleClose }}
      disableRestoreFocus
    >
      <Box padding="16px" width="470px">
        <Box display="flex" justifyContent="space-between" alignItems='center' mb="16px">
          <Typography color="primary" fontSize="18px">
            Address
          </Typography>
          <IconButton onClick={handleClose}>
            <ClearIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box display="flex" justifyContent="space-between" bgcolor="#f7f7f7" padding="10px 8px" >
          <Typography color="primary">
            {address}
          </Typography>
          <CopyToClipboard value={address} />
        </Box>
        <Box display="flex" justifyContent="flex-end" mt="16px">
          <a style={{ textDecoration: 'none' }} href={userExplorerLink} target="_blank" rel="noreferrer">
            <Typography color="secondary" fontSize="12px" fontWeight={600}>
              See on Explorer
            </Typography>
          </a>
        </Box>
      </Box>
    </Popover>
  )
}

export default EthAddressPopover;

const popoverClass = css`
  pointer-events: none;
`;

const popoverContentClass = css`
  pointer-events: auto;
`
