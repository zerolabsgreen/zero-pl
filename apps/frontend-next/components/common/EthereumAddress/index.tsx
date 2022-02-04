import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { ReactComponent as EyeIcon } from '../../../assets/eye.svg';
import CopyToClipboard from '../CopyToClipboard';

export interface EthereumAddressProps {
  address: string;
  shortify?: boolean;
  clipboard?: boolean;
  visibility?: boolean;
}

export const EthereumAddress = ({
  address,
  shortify = false,
  clipboard = false,
  visibility = false
}: EthereumAddressProps) => {
  if (address) {
    return (
      <Box title={address}>
        {shortify ? shortifyEthAddr(address) : address}
        {clipboard && <CopyToClipboard value={address} />}
        {visibility && <StyledEyeIcon />}
      </Box>
    );
  } else return <div>NA</div>;
};

const StyledEyeIcon = styled(EyeIcon)`
  margin-left: 10px;
`

export const shortifyEthAddr = (str: string) => {
  return str ? `${str.substr(0, 4)}...${str.substr(str.length - 4, str.length - 1)}` : '';
};

export default EthereumAddress;
