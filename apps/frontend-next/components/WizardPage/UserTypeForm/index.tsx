import { FC, SetStateAction } from 'react';
import { ProtocolTypeEnumType } from '@energyweb/zero-protocol-labs-api-client';
import { FormSelect } from '@zero-labs/zero-ui-components';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { ReactComponent as Plus } from '../../../assets/plus.svg';
import { ReactComponent as PlusGreen } from '../../../assets/plusGreen.svg';
import { useSelectedProtocolStore } from '../../../context';
import { FilecoinColors } from '../../../utils';
import { WizardFormValues } from '../WizardPageStepSelector';
import { UserTypeBlock } from './components/UserTypeBlock';
import { RemoveMinerIdModal } from './components/RemoveMinerIdModal';
import { useUserTypeFormEffects } from './effects';

export interface UserTypeFormProps {
  handleFormikChange: (value: any) => void;
  setFieldValue: (name: string, value: any) => void;
  values: WizardFormValues;
  setFormikValues: (
    values: SetStateAction<WizardFormValues>,
    shouldValidate?: boolean
  ) => void;
}

export const UserTypeForm: FC<UserTypeFormProps> = ({
  setFieldValue,
  handleFormikChange,
  values,
  setFormikValues,
}) => {
  const selectedProtocol = useSelectedProtocolStore();
  const isFilecoin = selectedProtocol === ProtocolTypeEnumType.FILECOIN;
  const {
    handleElemChange,
    userTypesOptions,
    amountOfItems,
    openConfirmRemove,
    openRemoveConfirmModal,
    addAnother,
    closeRemoveConfirmModal,
    removeSection
  } = useUserTypeFormEffects(values, setFieldValue, setFormikValues, isFilecoin)
  const CustomMenuItem = getStyledMenuItem(isFilecoin);
  const CustomSelectInput = getCustomSelectInput(isFilecoin);

  return (
    <StyledWrapper>
      <StepLabel isFilecoin={isFilecoin}>
        User type
      </StepLabel>
      <FormSelect
        handleChange={(event) => handleElemChange(event)}
        name="userType"
        value={values.userType ?? ''}
        placeholder='I am ...'
        options={userTypesOptions}
        CustomMenuItem={CustomMenuItem}
        CustomInput={CustomSelectInput}
      />
      {amountOfItems.map(id => (
        <UserTypeBlock
          key={id}
          id={id}
          isFilecoin={isFilecoin}
          handleFormikChange={handleFormikChange}
          setFieldValue={setFieldValue}
          values={values}
          handleSectionRemove={
            amountOfItems.length > 1 ? openRemoveConfirmModal : undefined
          }
        />
      ))}
      <StyledAddButton
        onClick={addAnother}
        isFilecoin={isFilecoin}
        endIcon={isFilecoin ? <Plus /> : <PlusGreen />}
      >
        Add another Miner ID / Address
      </StyledAddButton>
      <RemoveMinerIdModal
        isFilecoin={isFilecoin}
        open={openConfirmRemove.open}
        id={openConfirmRemove.id}
        handleClose={closeRemoveConfirmModal}
        handleRemove={removeSection}
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled(Box)(({ theme }) => `
  display: flex;
  flex-direction: column;
  ${theme.breakpoints.down('sm')} {
    & .MuiFormControl-root {
        width: 100%;
    };
  };
`);

const StepLabel = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isFilecoin' })<{isFilecoin: boolean}>(({ theme, isFilecoin }) => `
  font-size: 14px;
  color: ${isFilecoin ? FilecoinColors.simpleText : theme.palette.text.primary}
  margin-left: 15px;
  margin-bottom: 8px;
  font-weight: 600;
`);

const StyledMenuItem = styled(MenuItem, { shouldForwardProp: (prop) => prop !== 'isFilecoin' })<{isFilecoin: boolean}>(({ theme, isFilecoin }) => `
  font-size: 16px;
  font-weight: 600;
  background-color: ${theme.palette.background.paper};
  padding-left: 20px;
  &:hover {
    background-color: ${isFilecoin ? theme.palette.background.paper : theme.palette.primary.main};
    color: ${isFilecoin ? FilecoinColors.primary : theme.palette.background.paper};
    font-weight: 700;
  };
  &.Mui-selected {
    background-color: none;
    &:hover {
      background-color: ${isFilecoin ? theme.palette.background.paper : theme.palette.primary.main};
    };
  };
`);

const getStyledMenuItem = (isFilecoin: boolean): FC => {
  const MenuItemWithStyles = ({ children, ...rest }: MenuItemProps) => (
    <StyledMenuItem isFilecoin={isFilecoin} {...rest}>
      {children}
    </StyledMenuItem>)
  return MenuItemWithStyles;
};

const StyledAddButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'isFilecoin' })<{isFilecoin: boolean}>(({ theme, isFilecoin }) => `
  background-color: ${theme.palette.background.paper};
  margin-top: 8px;
  min-width: 488px;
  font-size: 16px;
  min-height: 48px;
  font-weight: 700;
  color: ${isFilecoin ? FilecoinColors.primary : theme.palette.secondary.main};
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(160, 154, 198, 0.2);
  &:hover {
    color: ${isFilecoin ? FilecoinColors.primary : theme.palette.secondary.main};
    background-color: ${theme.palette.background.paper};
  };
  ${theme.breakpoints.down('sm')} {
    min-width: 100%;
  };
`);

const StyledSelectInput = styled(OutlinedInput, { shouldForwardProp: (prop) => prop !== 'isFilecoin' })<{isFilecoin: boolean}>(({ theme, isFilecoin }) => `
  background-color: ${theme.palette.background.paper};
  & span {
    color: ${isFilecoin ? FilecoinColors.primary : theme.palette.primary.main};
  };
`);

const getCustomSelectInput = (isFilecoin: boolean): FC<OutlinedInputProps> => {
  const CustomSelectInput = (props: OutlinedInputProps) => (<StyledSelectInput isFilecoin={isFilecoin} {...props} />)
  return CustomSelectInput;
}
