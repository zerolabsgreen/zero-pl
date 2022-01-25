import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Autocomplete from '@mui/material/Autocomplete';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { FC, memo, SyntheticEvent } from 'react';

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
  CustomTextField?: FC<TextFieldProps>;
  textFieldProps?: TextFieldProps;
}

export const SelectAutocomplete: FC<SelectAutocompleteProps> = memo(({
  options,
  label,
  placeholder,
  name,
  value,
  setFieldValue,
  CustomTextField,
  textFieldProps
}) => {
  const handleChange = (event: SyntheticEvent, value: string | null) => setFieldValue(name, value ?? '');
  const TextFieldToRender = CustomTextField ?? TextField
  return (
    <Autocomplete
      value={value ?? null}
      onChange={handleChange}
      options={options.map((option) => option.title)}
      popupIcon={<KeyboardArrowDown />}
      renderInput={(params) => (
        <TextFieldToRender
          {...params}
          label={label ?? ''}
          placeholder={placeholder ?? ''}
          {...textFieldProps}
        />
      )}
    />
  );
});
