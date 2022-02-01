import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useState, useRef } from 'react';
import { AddressZero } from '@ethersproject/constants';
import { ReactComponent as EyeIcon } from '../../assets/svg/eye.svg';
import CopyToClipboard from '../CopyToClipboard';
import EthAddressPopover from './Popover';

export interface EthereumAddressProps {
  address: string;
  shortify?: boolean;
  clipboard?: boolean;
  visibility?: boolean;
  popover?: boolean;
}

export const EthereumAddress = ({
  address,
  shortify = false,
  clipboard = false,
  visibility = false,
  popover = false
}: EthereumAddressProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverAnchor = useRef(null)
  const handlePopoverOpen = () => setPopoverOpen(true);
  const handlePopoverClose = () => setPopoverOpen(false);
  const addressZero = address === AddressZero;
  const blockExplorerLink = `${window.config.BLOCK_EXPLORER}/tx/${address}`;

  if (address) {
    return (
      <Box title={address}>
        <StyledAddress
          ref={popoverAnchor}
          aria-owns={'eth-address-popover'}
          aria-haspopup="true" popover={popover}
          onMouseOver={popover ? handlePopoverOpen: undefined}
          onMouseLeave={popover ? handlePopoverClose: undefined}
        >
          {shortify ?  shortifyEthAddr(address) : address}
        </StyledAddress>

        {clipboard && !addressZero && <CopyToClipboard value={address} />}

        {visibility && !addressZero &&
          <a href={blockExplorerLink} target="_blank" rel="noreferrer">
            <StyledEyeIcon />
          </a>
        }

        {popover && !addressZero &&
          <EthAddressPopover
            open={popoverOpen}
            address={address}
            anchorEl={popoverAnchor.current}
            handleClose={handlePopoverClose}
            handleOpen={handlePopoverOpen}
          />
        }
      </Box>
    );
  } else return <div>NA</div>;
};

const StyledEyeIcon = styled(EyeIcon)`
  margin-left: 10px;
`

const StyledAddress = styled('span', { shouldForwardProp: prop => prop !== 'popover' })<{popover: boolean}>(({ popover }) => `
  cursor: ${popover && 'pointer'};
`)

export const shortifyEthAddr = (str: string) => {
  return `${str.substr(0, 4)}...${str.substr(str.length - 4, str.length - 1)}`;
};

export default EthereumAddress;
