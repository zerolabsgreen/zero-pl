import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import type { FC } from "react";
import { css } from '@emotion/css';
import { styled, useTheme } from "@mui/material/styles";
import { shortifyEthAddr } from "../EthereumAddress";
import FuelType, { FuelTypeEnum } from "../FuelType";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { SankeyItemType } from "./Node";

interface SankeyLinkPopoverProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  anchorEl: null;
  type?: string;
  id?: string;
  amount?: string;
  beneficiary?: string;
  period?: string;
  generator?: string;
  sources?: string[];
  location?: string[];
  link?: string;
  targetId: string;
}

const SankeyLinkPopover: FC<SankeyLinkPopoverProps> = ({
  anchorEl,
  open,
  amount,
  beneficiary,
  handleClose,
  handleOpen,
  type,
  id,
  targetId,
  period,
  generator,
  sources,
  location
}) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const viewItem = () => {
    const urlType = type === SankeyItemType.Certificate ? 'purchases' : 'contracts'
    return navigate(`/partners/filecoin/${urlType}/${targetId}`)
  }
  return (
    <Popover
      id="sankey-link-popover"
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
      <Wrapper>
        <Flexbox>
          <Typography width="40%">
            {type}
          </Typography>
          <Typography fontWeight="bold" width="60%">
            {shortifyEthAddr(id ?? '')}
          </Typography>
        </Flexbox>
        <Flexbox>
          <Typography width="40%">
            Amount
          </Typography>
          <Typography fontWeight="bold" width="60%">
            {amount}
          </Typography>
        </Flexbox>
        {beneficiary &&
        <Flexbox>
          <Typography width="40%">
            Beneficiary
          </Typography>
          <Typography fontWeight="bold" width="60%">
            {beneficiary}
          </Typography>
        </Flexbox>}
        {period && <Flexbox>
          <Typography width="40%">
            Period
          </Typography>
          <Typography fontWeight="bold" width="60%">
            {period}
          </Typography>
        </Flexbox>}
        <Flexbox>
          <Typography width="40%">
            Generator
          </Typography>
          <Tooltip title={generator ?? ''}>
            <Typography fontWeight="bold" width="60%" noWrap>
              {generator ?? '-'}
            </Typography>
          </Tooltip>
        </Flexbox>
        {sources && <Flexbox>
          <Typography width="40%">
            Sources
          </Typography>
          <Box display={'flex'} width="60%">
            {sources.map(source => (
              <FuelType
                key={`${id}-${source}`}
                withoutText
                fuelType={source as FuelTypeEnum}
                height="15px"
                marginRight="10px"
                iconColor={theme.palette.text.primary}
              />
            ))}
          </Box>
        </Flexbox>}
        {location &&
        <Flexbox mt="5px">
          <Typography width="40%">
            Location
          </Typography>
          <Typography fontWeight="bold" width="60%">
            {location}
          </Typography>
        </Flexbox>}
        <StyledButton onClick={viewItem}>
          View {type}
        </StyledButton>
      </Wrapper>
    </Popover>
  )
}

export default SankeyLinkPopover;

const popoverClass = css`
  pointer-events: none;
`;

const popoverContentClass = css`
  pointer-events: auto;
`

const Wrapper = styled(Box)(({ theme }) => `
  padding: 14px;
  width: 270px;
  background-color: ${theme.palette.primary.main};
  color: ${theme.palette.text.primary};
`)

const Flexbox = styled(Box)`
  display: flex;
  width: 100%;
`

const StyledButton = styled(Button)(({ theme }) => `
  color: ${theme.palette.text.primary};
  text-transform: uppercase;
  font-weight: 700;
  padding: 0;
  margin-top: 16px;
  font-size: 16px;
  letter-spacing: 1px;
  :hover {
    background-color: ${theme.palette.primary.main}
  }
`)
