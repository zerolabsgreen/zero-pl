import { PropsWithChildren, ReactElement } from 'react';
import { Control, Controller, Path } from 'react-hook-form'
import TextField, { TextFieldProps } from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import { InputBaseProps } from '@mui/material/InputBase';

export type SelectOption = {
  value: string;
  label: string;
  img?: string;
}

export interface FormSelectProps<FormValues> {
  name: Path<FormValues>;
  control: Control<FormValues>;
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

type TFormSelect = <FormValues>(
  props: PropsWithChildren<FormSelectProps<FormValues>>
) => ReactElement;

export const FormSelect: TFormSelect = ({
  name, control, options, label, errorExists = false, errorText = '',
  variant, disabled = false, required = false, inputProps, textFieldProps
}) => {
  return (
    <Controller
      key={name}
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
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
          defaultValue={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          inputProps={inputProps}
          {...textFieldProps}
        >
          {options.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        );
      }}
    />
  );
}
