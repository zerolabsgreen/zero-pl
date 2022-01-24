import { FC } from 'react';
import { Dayjs } from 'dayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDayJs from '@mui/lab/AdapterDayjs';
import DatePicker from '@mui/lab/DatePicker';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export interface FormDatePickerProps {
  name: string;
  setFieldValue: (name: string, value: Dayjs | null) => void;
  value: Dayjs;
  label?: string;
  placeholder?: string;
  required?: boolean;
  textFieldProps?: TextFieldProps;
  errorExists?: boolean;
  errorText?: string;
  variant?: 'standard' | 'outlined' | 'filled';
  disabled?: boolean;
}

export const FormDatePicker: FC<FormDatePickerProps> = ({
  name,
  setFieldValue,
  value,
  label,
  placeholder = '',
  textFieldProps,
  required = false,
  errorExists = false,
  errorText = '',
  disabled = false,
  variant,
}) => {
  const handleChange = (date: Dayjs | null) => setFieldValue(name, date);
  return (
    <LocalizationProvider dateAdapter={AdapterDayJs}>
      <DatePicker
        clearable
        reduceAnimations
        disableMaskedInput
        showToolbar={false}
        disabled={disabled}
        onChange={handleChange}
        value={value}
        inputFormat={'MMM DD, YYYY'}
        renderInput={(props) => (
          <TextField
            {...props}
            name={name}
            fullWidth
            margin="none"
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
  );
};
