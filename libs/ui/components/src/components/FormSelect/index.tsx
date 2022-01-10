import { FC } from 'react';
import type { InputBaseProps } from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export type SelectOption = {
  value: string;
  label: string;
  img?: string;
};

export interface FormSelectProps {
  name: string;
  handleChange: (event: any) => void;
  value: string;
  options: SelectOption[];
  errorExists?: boolean;
  errorText?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  label?: string;
  inputProps?: InputBaseProps['inputProps'];
}


export const FormSelect: FC<FormSelectProps> = ({
  name,
  handleChange,
  value,
  options,
  placeholder,
}) => {
  return (
    <StyledSelect
      fullWidth
      displayEmpty
      name={name}
      value={value}
      onChange={handleChange}
      IconComponent={KeyboardArrowDownIcon}
      MenuProps={{ disablePortal: true }}
      input={<StyledInput />}
      renderValue={(value: any) => (
        <ValueRenderer
          value={value}
          placeholder={placeholder}
          options={options}
        />
      )}
    >
      {options.map(option => {
        return (
          <MenuItem key={option.label} value={option.value}>
            <img src={option.img} />
            {option.label}
          </MenuItem>
        )
      })}
    </StyledSelect>
  );
};

const ValueRenderer = ({ value, placeholder, options }: { value: string, placeholder?: string, options: SelectOption[] }) => {
  if (!value) return (<span className='placeholder'>{placeholder || ''}</span>);

  const label = options.find(option => option.value === value)?.label;
  return (<span>{label || ''}</span>)
}

const StyledSelect = styled(Select)`
  & span {
    font-size: 18px;
    font-weight: 600;
    line-height: 23px;
  }
  & .placeholder {
    color: #6A658A;
    margin-left: 8px;
  }
  & .MuiMenuItem-root {
    font-weight: 600;
    line-height: 20px;
  }
  & .MuiMenuItem-root svg {
    margin-right: 8px;
    width: 20px;
    height: 20px;
  }
`;

const StyledInput = styled(OutlinedInput)`
  svg {
    margin-right: 16px;
  }
`
