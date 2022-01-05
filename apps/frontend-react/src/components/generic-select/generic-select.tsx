import {
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import * as React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useStyles from './generic-select-styles';

export interface SelectOption {
  value: string;
  label: string;
  img?: string;
}

export interface IGenericSelectProps {
  value: string;
  handleChange?: (value: SelectChangeEvent) => void;
  options: SelectOption[];
  bgColor?: string;
  placeholder?: string;
  isFilecoin?: boolean;
  name?: string;
  menuItemClassName?: string;
}

export const GenericSelect: React.FC<IGenericSelectProps> = ({
  value,
  handleChange,
  options,
  placeholder,
  bgColor,
  isFilecoin,
  name,
  menuItemClassName,
}) => {
  const styles = useStyles();

  return (
    <Select
      input={
        <OutlinedInput
          sx={{
            '& > div:first-of-type': {
              backgroundColor: bgColor,
              border: 'none',
            },
            width: '100%',
          }}
          className={styles.outlineStyles}
        />
      }
      className={styles.selectStyles}
      IconComponent={KeyboardArrowDownIcon}
      displayEmpty
      value={value || ''}
      name={name}
      onChange={handleChange}
      MenuProps={{ disablePortal: true }}
      renderValue={(selected: string) => {
        if (!selected) {
          return (
            <span
              className={`${
                isFilecoin
                  ? styles.placeholderFilecoinStyles
                  : styles.placeholderStyles
              }`}
            >
              {placeholder || ''}
            </span>
          );
        }
        const label = options.find(
          (option) => option.value === selected
        )?.label;

        return (
          <span
            className={`${
              isFilecoin
                ? styles.selectFilcoinValueStyle
                : styles.selectValueStyle
            }`}
          >
            {label}
          </span>
        );
      }}
    >
      {options.map((option) => (
        <MenuItem
          className={menuItemClassName}
          value={option.value}
          key={option.value}
        >
          {option.img && (
            <span className={styles.iconStyles}>
              <img src={option.img} />
            </span>
          )}
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default GenericSelect;
