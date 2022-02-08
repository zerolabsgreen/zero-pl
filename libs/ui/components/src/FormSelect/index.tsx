import { FC } from 'react';
import type { InputBaseProps } from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export type SelectOption = {
  value: string;
  label: string;
  img?: string;
};

export interface FormSelectProps {
  name?: string;
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
  CustomMenuItem?: FC<MenuItemProps>;
  CustomInput?: FC<OutlinedInputProps>;
  selectClassName?: string;
  menuClassName?: string;
}

export const FormSelect: FC<FormSelectProps> = ({
  name,
  handleChange,
  value,
  options,
  placeholder,
  CustomMenuItem,
  CustomInput,
  selectClassName,
  menuClassName
}) => {
  const MenuItemToDisplay = CustomMenuItem ?? StyledMenuItem;
  return (
    <StyledSelect
      fullWidth
      displayEmpty
      name={name}
      value={value}
      onChange={handleChange}
      IconComponent={KeyboardArrowDownIcon}
      MenuProps={{ disablePortal: true, className: menuClassName }}
      className={selectClassName}
      input={CustomInput ? <CustomInput /> : <StyledInput />}
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
          <MenuItemToDisplay key={option.label} value={option.value}>
            {option.img &&
            <StyledImgSpan>
              <img src={option.img} />
            </StyledImgSpan>}
            {option.label}
          </MenuItemToDisplay>
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
  };
  & .placeholder {
    color: #6A658A;
    margin-left: 8px;
  };
  & .MuiMenuItem-root svg {
    margin-right: 8px;
    width: 20px;
    height: 20px;
  };
`;

const StyledMenuItem = styled(MenuItem)(({ theme }) => `
  font-weight: 600;
  line-height: 20px;
  font-size: 16px;
  padding: 6px 16px 6px 20px;
  line-height: 1.5;
  &:hover {
    background-color: ${theme.palette.primary.main};
    font-weight: 700;
    color: ${theme.palette.text.primary}
  };
`);

const StyledInput = styled(OutlinedInput)`
  background-color: #F6F3F9;
  svg {
    margin-right: 16px;
  };
`;

const StyledImgSpan = styled('span')(({ theme }) => `
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  width: 31px;
  height: 31px;
  border-radius: 50%;
  background-color: ${theme.palette.background.paper}
`)

