import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import AdapterDayJs from '@material-ui/lab/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@material-ui/lab';
import useStyles from './date-picker-styles';
import { ReactComponent as CalendarIconLight } from '../../assets/svg/calendarIconLight.svg';
import { ReactComponent as CalendarIconDark } from '../../assets/svg/calendarIconDark.svg';
import { ReactComponent as CalendarIconWhite } from '../../assets/svg/calendarIconWhite.svg';
import { Dayjs } from 'dayjs';

interface IBasicDatePickerProps {
  color?: string;
  isFilecoin?: boolean;
  calendar?: string;
  value: Dayjs;
  setValue: (value: Dayjs | null) => void;
}

const BasicDatePicker: React.FC<IBasicDatePickerProps> = ({
  color,
  isFilecoin,
  calendar,
  value,
  setValue,
}) => {
  const styles = useStyles();
  return (
    <LocalizationProvider dateAdapter={AdapterDayJs}>
      <DatePicker
        inputFormat="YYYY/MM/DD"
        disableMaskedInput
        InputProps={{
          className: `${
            isFilecoin
              ? color === 'darkBlue'
                ? styles.inputDark
                : styles.inputLight
              : color === 'darkBlue'
              ? styles.inputLightBitcoin
              : styles.inputDarkBitcoin
          }`,
        }}
        label=""
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        components={{
          OpenPickerIcon:
            calendar === 'white'
              ? CalendarIconWhite
              : isFilecoin
              ? CalendarIconLight
              : CalendarIconDark,
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default BasicDatePicker;
