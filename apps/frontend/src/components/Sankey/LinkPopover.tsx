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
  amountTitle?: string;
  totalAmount?: string;
  totalAmountTitle?: string;
  beneficiary?: string;
  period?: string;
  generator?: string;
  sources?: string[];
  location?: string[];
  link?: string;
  targetId: string;
  hideBtn?: boolean;
}

const defaultAmountTitle = 'Amount'

const SankeyLinkPopover: FC<SankeyLinkPopoverProps> = ({
  anchorEl,
  open,
  amount,
  amountTitle = defaultAmountTitle,
  totalAmount,
  totalAmountTitle = 'Total amount',
  beneficiary,
  handleClose,
  handleOpen,
  type,
  id,
  targetId,
  period,
  generator,
  sources,
  location,
  hideBtn = false
}) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const viewItem = () => {
    const urlType = type === SankeyItemType.Certificate ? 'purchases' : 'contracts'
    return navigate(`/partners/filecoin/${urlType}/${targetId}`)
  }
  const labelWidth = amountTitle === defaultAmountTitle ? '40%' : '60%'
  const valueWidth = amountTitle === defaultAmountTitle ? '60%' : '40%'
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
          <Typography width={labelWidth}>
            {type}
          </Typography>
          <Typography fontWeight="bold" width={valueWidth}>
            {shortifyEthAddr(id ?? '')}
          </Typography>
        </Flexbox>
        <Flexbox>
          <Typography width={labelWidth}>
            {amountTitle}
          </Typography>
          <Typography fontWeight="bold" width={valueWidth}>
            {amount}
          </Typography>
        </Flexbox>
       {totalAmount &&
       <Flexbox>
          <Typography width={labelWidth}>
            {totalAmountTitle}
          </Typography>
          <Typography fontWeight="bold" width={valueWidth}>
            {totalAmount}
          </Typography>
        </Flexbox>}
        {beneficiary &&
        <Flexbox>
          <Typography width={labelWidth}>
            Beneficiary
          </Typography>
          <Typography fontWeight="bold" width={valueWidth}>
            {beneficiary}
          </Typography>
        </Flexbox>}
        {period && <Flexbox>
          <Typography width={labelWidth}>
            Period
          </Typography>
          <Typography fontWeight="bold" width={valueWidth}>
            {period}
          </Typography>
        </Flexbox>}
       {generator &&
       <Flexbox>
          <Typography width={labelWidth}>
            Generator
          </Typography>
          <Tooltip title={generator}>
            <Typography fontWeight="bold" width={valueWidth} noWrap>
              {generator}
            </Typography>
          </Tooltip>
        </Flexbox>}
        {sources && <Flexbox>
          <Typography width={labelWidth}>
            Sources
          </Typography>
          <Box display={'flex'} width={valueWidth}>
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
          <Typography width={labelWidth}>
            Location
          </Typography>
          <Typography fontWeight="bold" width={valueWidth}>
            {location}
          </Typography>
        </Flexbox>}
       {!hideBtn &&
       <StyledButton onClick={viewItem}>
          View {type}
        </StyledButton>}
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
