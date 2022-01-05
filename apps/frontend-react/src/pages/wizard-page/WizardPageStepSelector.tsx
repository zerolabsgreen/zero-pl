import { ProtocolTypeEnumType } from '@energyweb/zero-protocol-labs-api-client';
import { SetStateAction } from 'react';
import {
  FormWizardItemConfirm,
  FormWizardItemEmail,
  FormWizardItemProtocol,
  FormWizardItemUserType,
} from '../../containers';
import { useSelectedProtocolStore } from '../../context';
import { WizardFormValues } from './WizardPage.effects';

export interface IFormStepItem {
  handleFormikChange: (value: any) => void;
  setFieldValue: (name: string, value: any) => void;
}

export interface WizardPageStepSelectorProps {
  step: number;
  handleFormikChange: (values: any) => void;
  setFieldValue: (name: string, value: any) => void;
  setFormikValues: (
    values: SetStateAction<WizardFormValues>,
    shouldValidate?: boolean | undefined
  ) => void;
  values: WizardFormValues;
}

export const WizardPageStepSelector = ({
  step,
  handleFormikChange,
  setFieldValue,
  values,
  setFormikValues,
}: WizardPageStepSelectorProps) => {
  const selectedProtocol = useSelectedProtocolStore();
  // bad should be more generic
  const isFilecoin = selectedProtocol === ProtocolTypeEnumType.FILECOIN;

  const renderSteps = (
    step: number,
    handleFormikChange: (values: any) => void,
    setFieldValue: any
  ) => {
    switch (step) {
      case 1:
        return (
          <FormWizardItemUserType
            values={values}
            isFilecoin={isFilecoin}
            handleFormikChange={handleFormikChange}
            setFieldValue={setFieldValue}
            setFormikValues={setFormikValues}
          />
        );

      case 2:
        return (
          <FormWizardItemEmail
            isFilecoin={isFilecoin}
            handleFormikChange={handleFormikChange}
            setFieldValue={setFieldValue}
            values={values}
          />
        );

      case 3:
        return (
          <FormWizardItemConfirm isFilecoin={isFilecoin} values={values} />
        );

      default:
        return <FormWizardItemProtocol />;
    }
  };

  return <>{renderSteps(step, handleFormikChange, setFieldValue)}</>;
};
