import { ProtocolTypeEnumType } from '@energyweb/zero-protocol-labs-api-client';
import { FormSelect, SelectOption } from '@zerolabs/zero-pl-components';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import BitcoinIcon from '../../../assets/bitcoin.svg';
import FilecoinIcon from '../../../assets/filecoin.svg';
import {
  useSelectedProtocolDispatch,
  useSelectedProtocolStore,
} from '../../../context/selectedProtocol';

const protocolOptions: SelectOption[] = [
  {
    value: ProtocolTypeEnumType.FILECOIN,
    label: 'Filecoin',
    img: FilecoinIcon,
  },
  {
    value: ProtocolTypeEnumType.BITCOIN,
    label: 'Bitcoin',
    img: BitcoinIcon
  },
];

const WizardFormProtocolForm = () => {
  const setSelectedProtocol = useSelectedProtocolDispatch();
  const selectedProtocol = useSelectedProtocolStore();
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedProtocol(event.target.value as ProtocolTypeEnumType);
  };
  return (
    <Box width="488px">
      <InputLabel>
        Protocol
      </InputLabel>
      <FormSelect
        handleChange={handleChange}
        value={selectedProtocol ?? ''}
        name="protocol"
        options={protocolOptions}
        placeholder='Choose protocol'
      />
    </Box>
  );
};

const InputLabel = styled(Typography)`
  color: #fff;
  margin-left: 15px;
  margin-bottom: 8px;
  font-weight: 600;
`


export default WizardFormProtocolForm;
