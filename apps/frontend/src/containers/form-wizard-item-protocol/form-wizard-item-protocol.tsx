import {
  FormControl,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import  { SelectOption, GenericSelect } from 'apps/frontend/src/components/generic-select/generic-select';
import { variables } from '@energyweb/zero-protocol-labs-theme';
import { ProtocolTypeEnumType } from '@energyweb/zero-protocol-labs-api-client';
import React from 'react';
import BitcoinIcon from '../../assets/svg/bitcoinIcon.svg';
import FilecoinIcon from '../../assets/svg/filecoinIcon.svg';
import { useStyles } from './form-wizard-item-protocol.styles';
import {
  useSelectedProtocolDispatch,
  useSelectedProtocolStore,
} from 'apps/frontend/src/context';

const protocolOptions: SelectOption[] = [
  { value: ProtocolTypeEnumType.FILECOIN, label: 'Filecoin', img: FilecoinIcon },
  { value: ProtocolTypeEnumType.BITCOIN, label: 'Bitcoin', img: BitcoinIcon },
];

export const FormWizardItemProtocol: React.FC = () => {
  const setSelectedProtocol = useSelectedProtocolDispatch();
  const selectedProtocol = useSelectedProtocolStore();
  const isFilecoin = selectedProtocol === ProtocolTypeEnumType.FILECOIN;
  const styles = useStyles({ isFilecoin });

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedProtocol((event.target.value as ProtocolTypeEnumType));
  };

  const classes = useStyles({ isFilecoin });

  return (
    <FormControl className={styles.formControl}>
      <Typography
        fontSize={variables.fontSize}
        color={isFilecoin ? variables.black : variables.white}
        ml={'15px'}
        mb={'8px'}
        fontWeight={600}
      >
        Protocol
      </Typography>
      <GenericSelect
        isFilecoin={isFilecoin}
        handleChange={handleChange}
        value={selectedProtocol ?? ''}
        name='protocol'
        placeholder={'Choose the Protocol'}
        bgColor={variables.white}
        options={protocolOptions}
        menuItemClassName={classes.menuItem}
      />
    </FormControl>
  );
};
