import { ChangeEvent, FC, SetStateAction } from 'react';
import { WizardFormValues } from '../types';
import WizardFormProtocolForm from './ProtocolForm';

export type FormStepItem = {
  handleChange: (event: ChangeEvent<any>) => void;
  setFieldValue: (name: string, value: any) => void;
}

export interface WizardFormStepSelectorProps {
  step: number;
  handleChange: (event: ChangeEvent<any>) => void;
  setFieldValue: (name: string, value: any) => void;
  setValues: (
    values: SetStateAction<WizardFormValues>,
    shouldValidate?: boolean | undefined
  ) => void;
  values: WizardFormValues;
}

const WizardFormStepSelector: FC<WizardFormStepSelectorProps> = ({
  step,
  handleChange,
  setFieldValue,
  values,
  setValues,
}) => {
  const renderSteps = (
    step: number,
    handleChange: (event: ChangeEvent<any>) => void,
    setFieldValue: (name: string, value: any) => void,
  ) => {
    switch (step) {
      // case 1:
      //   return (
      //     <FormWizardItemUserType
      //       values={values}
      //       handleChange={handleChange}
      //       setFieldValue={setFieldValue}
      //       setValues={setValues}
      //     />
      //   );

      // case 2:
      //   return (
      //     <FormWizardItemEmail
      //       handleChange={handleChange}
      //       setFieldValue={setFieldValue}
      //       values={values}
      //     />
      //   );

      // case 3:
      //   return (
      //     <FormWizardItemConfirm values={values} />
      //   );

      default:
        return <WizardFormProtocolForm />;
    }
  };

  return (<>{renderSteps(step, handleChange, setFieldValue)}</>);
};

export default WizardFormStepSelector;
