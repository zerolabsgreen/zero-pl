import React from 'react';
import { FormControlLabel, Switch, Box, BoxProps } from '@material-ui/core';
import { useStyles } from './switch-label.style';

interface SwitchLabelProps {
  checked: boolean;
  setChecked: (value: boolean) => void;
  boxProps?: BoxProps;
  labelName?: string;
  isFilecoin?: boolean;
  defaultValue?: boolean;
}

const SwitchLabel: React.FC<SwitchLabelProps> = ({
  labelName,
  isFilecoin,
  checked,
  setChecked,
  boxProps,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const classes = useStyles();

  return (
    <Box {...boxProps}>
      <FormControlLabel
        control={
          <Switch
            className={isFilecoin ? classes.switch : classes.switchBitcoin}
            checked={checked}
            onChange={(e) => handleChange(e)}
            value="checked"
            disableRipple
          />
        }
        label={''}
      />
      <span
        className={`${
          checked && isFilecoin
            ? classes.lable
            : checked && !isFilecoin
            ? classes.lableBitcoin
            : !checked && isFilecoin
            ? classes.labelDisable
            : classes.lableBitcoinDisable
        }`}
      >
        {labelName}
      </span>
    </Box>
  );
};
export default SwitchLabel;
