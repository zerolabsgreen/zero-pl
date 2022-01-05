import CopyToClipboard from '../copy-to-clipboard/copy-to-clipboard';
import { Box } from '@mui/material';

/* eslint-disable-next-line */
export interface EthereumAddressProps {
  address: string;
  shortify?: boolean;
  clipboard?: boolean;
}

export const EthereumAddress = ({
  shortify,
  address,
  clipboard,
}: EthereumAddressProps) => {
  if (address) {
    return (
      <Box title={address}>
        {shortify ? shortifyEthAddr(address) : address}
        {clipboard && <CopyToClipboard value={address} />}
      </Box>
    );
  } else return <div>NA</div>;
};

export const shortifyEthAddr = (str: string) => {
  return `${str.substr(0, 4)}...${str.substr(str.length - 4, str.length - 1)}`;
};

export default EthereumAddress;
