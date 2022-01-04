import { Autocomplete, TextField } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { FC } from 'react';
import { useStyles } from './SelectAutocomplete.styles';

export interface AutocompleteOption {
  value: string;
  title: string;
}

export interface SelectAutocompleteProps {
  options: AutocompleteOption[];
  isFilecoin: boolean;
  value: string;
  handleChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export const SelectAutocomplete: FC<SelectAutocompleteProps> = ({
  options,
  label,
  placeholder,
  isFilecoin,
  value,
  handleChange,
}) => {
  const classes = useStyles();
  return (
    <Autocomplete
      value={value || null}
      onChange={(event, value) => handleChange(value ?? '')}
      options={options.map((option) => option.title)}
      popupIcon={<KeyboardArrowDown />}
      classes={{
        inputRoot: isFilecoin
          ? classes.inputFilecoinStyles
          : classes.inputStyles,
        paper: isFilecoin ? classes.filecoinPaperStyles : classes.paperStyles,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label ?? ''}
          placeholder={placeholder ?? ''}
        />
      )}
    />
  );
};
