import React, { FC } from 'react';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import { styled, useTheme } from '@mui/material/styles';
import { SelectChangeEvent } from '@mui/material/Select';
import { FormSelect, SelectOption } from '@zero-labs/zero-ui-components';
import { ProtocolTypeEnumType } from '@energyweb/zero-protocol-labs-api-client';
import { useSelectedProtocolDispatch, useSelectedProtocolStore } from '../../context';
import { FilecoinColors } from '../../utils';
import BitcoinIcon from '../../assets/svg/bitcoinIcon.svg';
import FilecoinIcon from '../../assets/svg/filecoinIcon.svg';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';

const protocolOptions: SelectOption[] = [
  { value: ProtocolTypeEnumType.FILECOIN, label: 'Filecoin', img: FilecoinIcon },
  { value: ProtocolTypeEnumType.BITCOIN, label: 'Bitcoin', img: BitcoinIcon },
];

export const ProtocolForm: React.FC = () => {
  const setSelectedProtocol = useSelectedProtocolDispatch();
  const selectedProtocol = useSelectedProtocolStore();
  const isFilecoin = selectedProtocol === ProtocolTypeEnumType.FILECOIN;
  const theme = useTheme();
  const CustomMenuItem = getStyledMenuItem(isFilecoin);
  const CustomSelectInput = getCustomSelectInput(isFilecoin);
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedProtocol((event.target.value as ProtocolTypeEnumType));
  };

  return (
    <FormControl>
      <Typography
        fontSize='14px'
        color={isFilecoin ? FilecoinColors.simpleText : theme.palette.text.primary}
        ml='15px'
        mb='8px'
        fontWeight={600}
      >
        Protocol
      </Typography>
      <FormSelect
        handleChange={handleChange}
        value={selectedProtocol ?? ''}
        name='protocol'
        placeholder='Choose the Protocol'
        options={protocolOptions}
        CustomMenuItem={CustomMenuItem}
        CustomInput={CustomSelectInput}
      />
    </FormControl>
  );
};

const StyledMenuItem = styled(MenuItem, { shouldForwardProp: (prop) => prop !== 'isFilecoin' })<{isFilecoin: boolean}>(({ theme, isFilecoin }) => `
  font-size: 16px;
  font-weight: 600;
  background-color: ${theme.palette.background.paper};
  padding-left: 20px;
  &:hover {
    background-color: ${isFilecoin ? theme.palette.background.paper : theme.palette.primary.main};
    color: ${isFilecoin ? FilecoinColors.primary : theme.palette.background.paper};
    font-weight: 700;
  };
  &.Mui-selected {
    background-color: none;
    &:hover {
      background-color: ${isFilecoin ? theme.palette.background.paper : theme.palette.primary.main};
    };
  };
`);

const getStyledMenuItem = (isFilecoin: boolean): FC<MenuItemProps> => {
  return ({ children, ...rest }) => (
  <StyledMenuItem isFilecoin={isFilecoin} {...rest}>
    {children}
  </StyledMenuItem>)
}

const StyledSelectInput = styled(OutlinedInput, { shouldForwardProp: (prop) => prop !== 'isFilecoin' })<{isFilecoin: boolean}>(({ theme, isFilecoin }) => `
  background-color: ${theme.palette.background.paper};
  & span {
    color: ${isFilecoin ? FilecoinColors.primary : theme.palette.primary.main};
  };
`);

const getCustomSelectInput = (isFilecoin: boolean): FC<OutlinedInputProps> => {
  return (props: OutlinedInputProps) => (<StyledSelectInput isFilecoin={isFilecoin} {...props} />)
}
