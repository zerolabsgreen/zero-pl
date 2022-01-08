import { FC } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { InputBaseProps } from '@mui/material/InputBase';

export type SelectOption = {
  value: string;
  label: string;
  img?: FC;
};

export interface FormSelectProps {
  name: string;
  handleChange: (event: any) => void;
  value: string;
  options: SelectOption[];
  errorExists?: boolean;
  errorText?: string;
  variant?: TextFieldProps['variant'];
  disabled?: boolean;
  required?: boolean;
  label?: string;
  inputProps?: InputBaseProps['inputProps'];
  textFieldProps?: Omit<TextFieldProps, 'value' | 'onChange'>;
}


export const FormSelect: FC<FormSelectProps> = ({
  name,
  handleChange,
  value,
  options,
  label,
  errorExists = false,
  errorText = '',
  variant,
  disabled = false,
  required = false,
  inputProps,
  textFieldProps,
}) => {
  return (
    <TextField
      select
      fullWidth
      name={name}
      label={label}
      error={errorExists}
      helperText={errorText}
      margin="normal"
      variant={variant}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      required={required}
      inputProps={inputProps}
      {...textFieldProps}
    >
      {options.map((option) => (
        <MenuItem key={option.label} value={option.value}>
          {option.img ? <option.img /> : null}
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
