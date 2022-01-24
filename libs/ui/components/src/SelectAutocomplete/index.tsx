import { Autocomplete, TextField } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { FC, SyntheticEvent } from 'react';

export interface AutocompleteOption {
  value: string;
  title: string;
}

export interface SelectAutocompleteProps {
  name: string;
  value: string;
  setFieldValue: (name: string, value: string) => void;
  options: AutocompleteOption[];
  label?: string;
  placeholder?: string;
}

export const SelectAutocomplete: FC<SelectAutocompleteProps> = ({
  options,
  label,
  placeholder,
  name,
  value,
  setFieldValue,
}) => {
  const handleChange = (event: SyntheticEvent, value: string | null) => setFieldValue(name, value ?? '');
  return (
    <Autocomplete
      value={value}
      onChange={handleChange}
      options={options.map((option) => option.title)}
      popupIcon={<KeyboardArrowDown />}
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
