import { useEffect, useMemo, useState } from 'react';
import {
  Typography,
  Button,
  SelectChangeEvent,
  Box,
} from '@mui/material';
import { UserTypeEnumType } from '@energyweb/zero-protocol-labs-api-client';
import GenericSelect, { SelectOption } from 'apps/frontend/src/components/generic-select/generic-select';
import { variables } from '@energyweb/zero-protocol-labs-theme';
import React from 'react';
import { useStyles } from './form-wizard-item-user-type.styles';
import { ReactComponent as Plus } from '../../assets/svg/plus.svg';
import { ReactComponent as PlusGreen } from '../../assets/svg/plusGreen.svg';
import { FormUserType } from './components/form-user-type';
import { WizardFormValues } from '../../pages/wizard-page/WizardPage.effects';
import {
  useAddressMappingSetState,
  useAddressMappingState,
} from '../../context';
import { RemoveMinerIdModal } from '../RemoveMinerIdModal';

export interface FormWizardItemUserTypeProps {
  handleFormikChange: (value: any) => void;
  setFieldValue: (name: string, value: any) => void;
  isFilecoin?: boolean;
  values: WizardFormValues;
  setFormikValues: (
    values: React.SetStateAction<WizardFormValues>,
    shouldValidate?: boolean | undefined
  ) => void;
}

const initialRemoveModalState: { open: boolean; id: number | undefined } = {
  open: false,
  id: undefined,
};

const getUserTypes = (isFilecoin: boolean): SelectOption[] => [
  {
    label: isFilecoin ? 'Storage Provider' : 'Miner',
    value: isFilecoin ? UserTypeEnumType.STORAGE_PROVIDER : UserTypeEnumType.MINER
  },
  { label: 'Application Developer', value: UserTypeEnumType.APP_DEVELOPER },
  { label: 'Crypto user or hodler', value: UserTypeEnumType.CRYPTO_USER },
  { label: 'Other User Type', value: UserTypeEnumType.OTHER }
];

export const FormWizardItemUserType: React.FC<FormWizardItemUserTypeProps> = ({
  isFilecoin = false,
  setFieldValue,
  handleFormikChange,
  values,
  setFormikValues,
}) => {
  const [amountOfItems, setAmountOfItems]=  useState([0]);
  const [openConfirmRemove, setOpenConfirmRemove] = useState(initialRemoveModalState);
  const addressMapping = useAddressMappingState();
  const setAddressMapping = useAddressMappingSetState();

  useEffect(() => {
    if (addressMapping?.size && addressMapping?.size !== amountOfItems.length) {
      const newDefault = Array.from(Array(addressMapping.size).keys());
      setAmountOfItems(newDefault);
    }
  }, [addressMapping]);

  const handleElemChange = (event: SelectChangeEvent) => {
    const {
      target: { value, name },
    } = event;
    setFieldValue(name, value);
  };

  const openRemoveConfirmModal = (id: number) => {
    setOpenConfirmRemove({ id, open: true });
  };

  const closeRemoveConfirmModal = () => {
    setOpenConfirmRemove(initialRemoveModalState);
  };

  const addAnother = () =>
    setAmountOfItems((prev) => [...prev, prev[prev.length - 1] + 1]);
  const removeSection = (id: number | undefined) => {
    if (id !== undefined && id >= 0) {
      setAmountOfItems((prev) => prev.filter((item) => item !== id));

      const nestedIdsArr = addressMapping?.get(id);
      const nestedFieldsToRemove =
        nestedIdsArr?.map((nestedId) => ({
          [`startDate_${id}_${nestedId}`]: undefined,
          [`endDate_${id}_${nestedId}`]: undefined,
          [`energy_${id}_${nestedId}`]: undefined,
        })) ?? [];
      const mergedNestedFieldsToRemove = Object.assign(
        {},
        ...nestedFieldsToRemove
      );

      setFormikValues(
        {
          ...values,
          [`minerId_${id}`]: undefined,
          [`country_${id}`]: undefined,
          [`generalStartDate_${id}`]: undefined,
          [`generalEndDate_${id}`]: undefined,
          ...mergedNestedFieldsToRemove,
        },
        false
      );

      setAddressMapping &&
        setAddressMapping((mapping) => {
          const map = mapping;
          map.delete(id);
          return map;
        });

      closeRemoveConfirmModal();
    }
  };

  const userTypesOptions = useMemo(() => getUserTypes(!!isFilecoin), [isFilecoin]);
  const styles = useStyles({ isFilecoin });

  return (
    <Box display={'flex'} flexDirection={'column'} className={styles.wrapper}>
      <Typography
        fontSize={variables.fontSize}
        color={isFilecoin ? variables.black : variables.white}
        ml={'15px'}
        mb={'8px'}
        fontWeight={600}
      >
        User type
      </Typography>
      <GenericSelect
        isFilecoin={isFilecoin}
        handleChange={(event) => handleElemChange(event)}
        name="userType"
        value={values.userType ?? ''}
        placeholder={'I am ...'}
        bgColor={variables.white}
        options={userTypesOptions}
        menuItemClassName={styles.menuItem}
      />
      {amountOfItems.map(id => (
        <FormUserType
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
      <Button
        onClick={addAnother}
        className={
          isFilecoin ? styles.buttonAddStyle : styles.buttonGreenAddStyle
        }
        endIcon={isFilecoin ? <Plus /> : <PlusGreen />}
      >
        Add another Miner ID / Address
      </Button>
      <RemoveMinerIdModal
        open={openConfirmRemove.open}
        id={openConfirmRemove.id}
        handleClose={closeRemoveConfirmModal}
        handleRemove={removeSection}
      />
    </Box>
  );
};
