import { ProtocolTypeEnumType } from '@energyweb/zero-protocol-labs-api-client';
import type { SetStateAction } from 'react';
import { useSelectedProtocolStore } from '../../context';
import type { WizardFormValues } from '../../pages/WizardPage/effects';
import { UserTypeForm } from './UserTypeForm';
import { ProtocolForm } from './ProtocolForm';
import { EmailPaymentForm } from './EmailPaymentForm';
import { ConfirmForm } from './ConfirmForm';

export interface IFormStepItem {
  handleFormikChange: (value: any) => void;
  setFieldValue: (name: string, value: any) => void;
}

export interface WizardPageStepSelectorProps {
  step: number;
  handleFormikChange: (values: any) => void;
  setFieldValue: (name: string, value: any) => void;
  setFormikValues: (values: SetStateAction<WizardFormValues>, shouldValidate?: boolean) => void;
  values: WizardFormValues;
}

export const WizardPageStepSelector = ({
  step,
  handleFormikChange,
  setFieldValue,
  values,
  setFormikValues
}: WizardPageStepSelectorProps) => {
  const selectedProtocol = useSelectedProtocolStore();
  const isFilecoin = selectedProtocol === ProtocolTypeEnumType.FILECOIN;

  const renderSteps = (
    step: number,
    handleFormikChange: (values: any) => void,
    setFieldValue: any
  ) => {
    switch (step) {
      case 1:
        return (
        <UserTypeForm
          values={values}
          handleFormikChange={handleFormikChange}
          setFieldValue={setFieldValue}
          setFormikValues={setFormikValues}
        />);

      case 2:
        return <EmailPaymentForm isFilecoin={isFilecoin} handleFormikChange={handleFormikChange} setFieldValue={setFieldValue} values={values}/>;

      case 3:
        return <ConfirmForm isFilecoin={isFilecoin} values={values} />;

      default:
        return <ProtocolForm />;
    }
  };

  return <>{renderSteps(step, handleFormikChange, setFieldValue)}</>;
};
