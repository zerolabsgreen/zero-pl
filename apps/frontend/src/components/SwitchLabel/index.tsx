import type { ClassAttributes, FC, HTMLAttributes } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Switch, { SwitchProps } from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';

interface SwitchLabelProps {
  checked: boolean;
  setChecked: (value: boolean) => void;
  boxProps?: BoxProps;
  labelName?: string;
  defaultValue?: boolean;
  CustomSwitch?: FC<SwitchProps>;
  CustomLabel?: FC<ClassAttributes<HTMLSpanElement> & HTMLAttributes<HTMLSpanElement> & { isChecked: boolean; }>;
}

export const SwitchLabel: FC<SwitchLabelProps> = ({
  labelName,
  checked,
  setChecked,
  boxProps,
  CustomSwitch,
  CustomLabel
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const SwitchToRender = CustomSwitch ?? StyledSwitch;
  const LabelToRender = CustomLabel ?? Label;

  return (
    <Box {...boxProps}>
      <FormControlLabel
        control={
          <SwitchToRender
            checked={checked}
            onChange={(e) => handleChange(e)}
            value="checked"
            disableRipple
          />
        }
        label={''}
      />
      <LabelToRender isChecked={checked}>
        {labelName}
      </LabelToRender>
    </Box>
  );
};
export default SwitchLabel;


const StyledSwitch = styled(Switch)(({ theme }) => `
  & .MuiSwitch-thumb {
    background-color: ${theme.palette.primary.main};
  };
  & .MuiSwitch-switchBase.Mui-checked {
    & .MuiSwitch-thumb {
      background-color: ${theme.palette.secondary.main};
    };
  };
  & .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
    background-color: ${theme.palette.secondary.main};
  };
  & .MuiSwitch-switchBase + .MuiSwitch-track {
    background-color: ${theme.palette.primary.main};
  };
`);

const Label = styled('span', { shouldForwardProp: (prop) => prop !== 'isChecked' })<{isChecked: boolean}>(({ isChecked, theme }) => `
  font-weight: ${isChecked ? 700 : 500};
  font-size: 14px;
  color: ${isChecked ? theme.palette.primary.main : theme.palette.grey[400]};
`);


