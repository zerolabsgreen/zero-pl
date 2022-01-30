import { UserTypeEnumType } from "@energyweb/zero-protocol-labs-api-client";
import { SelectChangeEvent } from "@mui/material/Select";
import { SelectOption } from "@zero-labs/zero-ui-components";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import { useAddressMappingSetState, useAddressMappingState } from "../../../context";
import { WizardFormValues } from "../WizardPageStepSelector";

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

export const useUserTypeFormEffects = (
  values: WizardFormValues,
  setFieldValue: (name: string, value: any) => void,
  setFormikValues: (values: SetStateAction<WizardFormValues>,shouldValidate?: boolean) => void,
  isFilecoin: boolean
) => {
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

  return {
    handleElemChange,
    userTypesOptions,
    amountOfItems,
    addAnother,
    openConfirmRemove,
    closeRemoveConfirmModal,
    removeSection,
    openRemoveConfirmModal
  }
}
