import { FormStepper } from '@zerolabs/zero-pl-components';
import { useState } from 'react';
import { useFormik } from 'formik';
import { StepperWrapper, StyledForm } from './styled';
import type { WizardFormValues } from './types';

export const initialValues: WizardFormValues = {
  protocol: '',
  userType: null,
  wirePayment: false,
  cryptoPayment: false,
  emailAddress: '',
};

const stepLabels = ['Protocol', 'Consumption', 'Preferences', 'Confirmation'];

const onSubmit = (data: any) => console.log(data);

export const WizardForm = () => {
  const [step, setStep] = useState(0);
  const formik = useFormik({ initialValues, onSubmit });
  
  return (
      <StyledForm>
        <StepperWrapper>
          <FormStepper activeStep={step} steps={stepLabels} />
        </StepperWrapper>
      </StyledForm>
  );
};
