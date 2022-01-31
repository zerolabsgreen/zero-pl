import { FC } from 'react';
import { Dayjs } from 'dayjs';
import { css } from '@emotion/css'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDayJs from '@mui/lab/AdapterDayjs';
import DatePicker from '@mui/lab/DatePicker';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { ReactComponent as CalendarIconDefault } from './calendar-icon.svg';

const paperClass = css`
  & .MuiCalendarPicker-root {
    & div {
      color: #fff;
    };
  };
  & .MuiIconButton-root {
    color: #fff;
  };
  & .MuiPickersDay-dayWithMargin {
    background-color: #19355E;
  };
  & .Mui-selected {
    background-color: #fff !important;
    color: #19355E !important;
  };
`

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
  CustomCalendarIcon?: FC<any>;
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
  CustomCalendarIcon
}) => {
  const handleChange = (date: unknown) => setFieldValue(name, date as Dayjs);
  const theme = useTheme();
  const CalendarIcon = CustomCalendarIcon ?? CalendarIconDefault;
  return (
    <LocalizationProvider dateAdapter={AdapterDayJs}>
      <DatePicker
        clearable
        reduceAnimations
        disableMaskedInput
        showToolbar={false}
        disabled={disabled}
        onChange={handleChange}
        PaperProps={{ classes: { root: paperClass }, style: { backgroundColor: theme.palette.primary.main } }}
        value={value ?? null}
        inputFormat={'MMM DD, YYYY'}
        components={{ OpenPickerIcon: CalendarIcon }}
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
