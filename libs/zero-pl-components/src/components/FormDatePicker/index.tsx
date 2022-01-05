import { PropsWithChildren, ReactElement } from 'react';
import { Control, Controller, Path } from 'react-hook-form';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDayJs from '@mui/lab/AdapterDayjs';
import DatePicker from '@mui/lab/DatePicker';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export interface FormDatePickerProps<FormValuesType> {
  name: Path<FormValuesType>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  textFieldProps?: TextFieldProps;
  control: Control<FormValuesType>;
  errorExists?: boolean;
  errorText?: string;
  variant?: 'standard' | 'outlined' | 'filled';
  disabled?: boolean;
}

export type TFormDatePicker = <FormValuesType>(
  props: PropsWithChildren<FormDatePickerProps<FormValuesType>>
) => ReactElement;

export const FormDatePicker: TFormDatePicker = ({
  name,
  label,
  placeholder = '',
  textFieldProps,
  required = false,
  control,
  errorExists = false,
  errorText = '',
  disabled = false,
  variant,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <LocalizationProvider dateAdapter={AdapterDayJs}>
          <DatePicker
            clearable
            reduceAnimations
            disableMaskedInput
            showToolbar={false}
            disabled={disabled}
            onChange={onChange}
            value={value}
            inputFormat={'MMM DD, YYYY'}
            renderInput={(props) => (
              <TextField
                {...props}
                fullWidth
                margin="normal"
                error={errorExists ?? false}
                helperText={errorText ?? ''}
                variant={variant}
                label={label}
                required={required}
                placeholder={placeholder || label}
                inputProps={{
                  ...props.inputProps,
                  placeholder: placeholder || label,
                }}
                {...textFieldProps}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
};
