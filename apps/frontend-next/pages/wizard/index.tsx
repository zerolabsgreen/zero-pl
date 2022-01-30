/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Button from '@mui/material/Button';
import { BigNumber } from '@ethersproject/bignumber';
import { Countries } from "@energyweb/utils-general";
import { CreateOrderDto, PaymentPreferencesEnumType, ProtocolTypeEnumType, useOrdersControllerCreate, UserTypeEnumType } from '@energyweb/zero-protocol-labs-api-client';
import { ReactComponent as LeftArrowIcon } from '../../assets/leftArrow.svg';
import { ReactComponent as RightArrowIcon } from '../../assets/rightArrow.svg';
import { ReactComponent as LeftArrowIconFilecoin } from '../../assets/leftArrowFilecoin.svg';
import { ReactComponent as RightArrowIconFilecoin } from '../../assets/rightArrowFilecoin.svg';
import { ReactComponent as SendIcon } from '../../assets/sendIcon.svg';
import {
  BelowFormText,
  BelowFormTextWrapper,
  BelowFormTitle,
  BoxWrapper,
  ButtonsWrapper,
  GridWrapper,
  ReadMoreSpan,
  ResponsiveGrid,
  StepSubtitle,
  StepTitle,
  StyledForm,
  StyledLabel,
  StyledStep
} from '../../components/WizardPage/styled';
import WizardPageStepSelector, { WizardFormValues } from '../../components/WizardPage/WizardPageStepSelector';
import CardReadMoreTablet from '../../components/WizardPage/CardReadMoreTablet';
import CardReadMore from '../../components/WizardPage/CardReadMore';
import { useAddressMappingState, useSelectedProtocolStore } from '../../context';

const initialValues: WizardFormValues = {
  userType: null,
  wirePayment: false,
  cryptoPayment: false,
  emailAddress: ''
}

const WizardPage = () => {
  const router = useRouter();
  const selectedProtocol = useSelectedProtocolStore();
  const isFilecoin = selectedProtocol === ProtocolTypeEnumType.FILECOIN;

  const [step, setStep] = useState(0);
  const isLastStep = step === stepLabels.length - 1;

  const { mutate } = useOrdersControllerCreate({ mutation: {
    onSuccess: () => {
      router.push('thank-you')
    }
  }});

  const handleBackStep = () =>{
    if(step === 0) return router.push('/');
    return setStep((s) => s - 1);
  }

  const addressMapping = useAddressMappingState();

  const submitHandler = async (values: WizardFormValues) => {
    if (isLastStep) {
      const mappingArrIterator = Array.from(Array(addressMapping?.size).keys());
      const preparedValues: CreateOrderDto = {
        // way too hacky, should be simplified
        protocolType: selectedProtocol ?? ProtocolTypeEnumType.BITCOIN,
        userType: values.userType ?? UserTypeEnumType.OTHER,
        paymentPreferences:
        values.wirePayment && values.cryptoPayment
          ? [PaymentPreferencesEnumType.WIRE_TRANSFER, PaymentPreferencesEnumType.CRYPTO]
          : values.wirePayment
            ? [PaymentPreferencesEnumType.WIRE_TRANSFER]
            : values.cryptoPayment
              ? [PaymentPreferencesEnumType.CRYPTO]
              : [],
        emailAddress: values.emailAddress,
        items: mappingArrIterator.map(key => {
          return {
            country: Countries.find(country => country.name === values[`country_${key}`])?.code || '',
            minerId: values[`minerId_${key}`] || '',
            // @ts-ignore
            // for some reason throws an error that mapping can be null even though
            // it is null checked
            timeFrames: addressMapping.get(key) ? addressMapping.get(key).map(nestedId => ({
              start: (values[`startDate_${key}_${nestedId}`] as Dayjs).startOf('day').toISOString(),
              end: (values[`endDate_${key}_${nestedId}`] as Dayjs).endOf('day').toISOString(),
              energy: BigNumber.from(values[`energy_${key}_${nestedId}`]).mul(BigNumber.from(10).pow(6)).toNumber()
            })) : []
          }
        })
      }
      mutate({ data: preparedValues })
    } else {
      setStep((s) => s + 1);
    }
  };

  const formik = useFormik({ initialValues, onSubmit: submitHandler });
  const submitButtonEnabled = step === 0
    ? !!selectedProtocol
    : step === 1
      ? formik.values.userType && addressMapping && addressMapping.size > 0
      : step === 2
        ? formik.values.emailAddress && (formik.values.cryptoPayment || formik.values.wirePayment)
        : true;

  const lgUpScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.up('lg'));
  const lgDownScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('lg'));
  const mdUpScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'));
  const smUpScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.up('sm'));
  const smDownScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));

  return (
    <>
      <Head>
        <title>Create Request</title>
      </Head>
      <GridWrapper isFilecoin={isFilecoin} container>
        <ResponsiveGrid item>
          <BoxWrapper>
            <StepTitle isFilecoin={isFilecoin}>
              {textWizardPageUp[0][step]}
            </StepTitle>
            <StepSubtitle isFilecoin={isFilecoin} mt={smDownScreen ? '17px' : '12px'}>
              {textWizardPageUp[1][step]}
            </StepSubtitle>
          </BoxWrapper>
            <StyledForm autoComplete="off">
              <Box display='flex' justifyContent='center' mb='50px'>
                <Stepper
                  alternativeLabel
                  nonLinear
                  connector={<></>}
                  activeStep={step}
                >
                  {stepLabels.map((label, index) => (
                    <StyledStep
                      isFilecoin={isFilecoin}
                      active={step >= index}
                      key={label}
                    >
                      <StyledLabel>
                        {smUpScreen && label}
                      </StyledLabel>
                    </StyledStep>
                  ))}
                </Stepper>
              </Box>
              <WizardPageStepSelector
                step={step}
                handleFormikChange={formik.handleChange}
                setFieldValue={formik.setFieldValue}
                values={formik.values}
                setFormikValues={formik.setValues}
              />
              <ButtonsWrapper>
                  <Button
                    sx={{ height: '48px' }}
                    variant="contained"
                    onClick={handleBackStep}
                    startIcon={
                      isFilecoin ? (
                        <LeftArrowIconFilecoin />
                      ) : (
                        <LeftArrowIcon />
                      )
                    }
                  >
                    Back
                  </Button>
                <Button
                  sx={{ height: '48px' }}
                  disabled={formik.isSubmitting || !submitButtonEnabled}
                  variant="contained"
                  onClick={() => formik.handleSubmit()}
                  endIcon={
                    isLastStep ? (
                      <SendIcon />
                    ) : isFilecoin ? (
                      <RightArrowIconFilecoin />
                    ) : (
                      <RightArrowIcon />
                    )
                  }
                >
                  {formik.isSubmitting
                    ? 'Submiting'
                    : isLastStep
                    ? 'Send Request'
                    : 'Next'}
                </Button>
              </ButtonsWrapper>
            </StyledForm>
          <BelowFormTextWrapper>
            <BelowFormTitle isFilecoin={isFilecoin}>
              {isFilecoin
                ? textWizardPageDown[2][step]
                : textWizardPageDown[0][step]}
            </BelowFormTitle>
            <BelowFormText isFilecoin={isFilecoin}>
              {selectedProtocol && lgUpScreen && textWizardPageDown[3][step]}
              {selectedProtocol && lgDownScreen && textWizardPageDown[6][step]}
              {!selectedProtocol && textWizardPageDown[1][step]}
              {smUpScreen ? (
                <ReadMoreSpan isFilecoin={isFilecoin}>
                  {step === 0 && lgUpScreen && '  read more'}
                </ReadMoreSpan>
              ) : step === 0 ? (
                '  and in the USA they are called RECs'
              ) : (
                ''
              )}
            </BelowFormText>
            <BelowFormText mt={'34px'} isFilecoin={isFilecoin}>
              {lgDownScreen &&
                !selectedProtocol &&
                textWizardPageDown[4][step]}
              {lgDownScreen &&
                selectedProtocol &&
                textWizardPageDown[5][step]}
            </BelowFormText>
            {isFilecoin && lgUpScreen && step === 0
              ? <CardReadMore />
              : isFilecoin && mdUpScreen && step === 0
                ? <CardReadMoreTablet />
                : null
            }
          </BelowFormTextWrapper>
        </ResponsiveGrid>
      </GridWrapper>
    </>
  );
};

export default WizardPage;

const stepLabels = ['Protocol', 'Consumption', 'Preferences', 'Confirmation'];

export const textWizardPageUp: string[][] = [
  [
    'Great! Let’s make your crypto green!',
    'Tell us about you and your Energy consumption',
    'Set your preferences',
    'Review and confirm',
  ],
  [
    'Congratulations on wanting to help the planet by buying Renewable Energy',
    'Add one or many of your rigs. Specifying the region   will make you more sustainable',
    'Almost there! let us know the last few datapoints to send you the best proposal for your needs',
    'Last step! Double check the information and send us your request.',
  ],
];

export const textWizardPageDown: string[][] = [
  [
    'What are RECs and why do you need them to make your crypto green?',
    '',
    '',
    '',
  ],
  [
    'Recs or Renewable Energy Certificates are the only way to prove that you consumed renewable energy. They have different names indifferent regions: their general name is EAC or Energy AttributeCertificate, in Europe they are called GOs or Guarantees of Origin.',
    '',
    '',
    '',
  ],
  ['More info About RECs for Filecoin miners', '', '', ''],
  [
    'Renewable Energy Certificates (RECs), also known as Energy Attribute Certificates (EACs), Energy, Guarantees of Origin (GOs), Green tags, Renewable Energy Credits, Renewable Electricity Certificates, or Tradable Renewable Certificates (TRCs), are tradable, non-tangible energy commodities that represent proof that 1 MWh of electricity was generated from an eligible renewable energy resource.',
    '',
    '',
    '',
  ],
  [
    'Every REC prooves that 1 Mwh of electricity has been inputted into the grid of a specific country / region. on Zero you will find also tokenized versions of the certificates that represents fractions of RECs in the KWh range, in case your consumption is small.',
  ],
  [
    `Every REC prooves that 1 Mwh of electricity has been inputted into the grid of a specific country / region.
    on Zero you will find also tokenized versions of the certificates that represents fractions of RECs
    in the KWh range, in case your consumption is small.`,
  ],
  [
    `Recs or Renewable Energy Certificates are the only way to proove that you consumed renewable energy. They have different names in different regions: their general name is EAC or Energy Attribute Certificate, in Europe they are called GOs or Guarantees of Origin, and in the USA they are called RECs.On Zero you will be able to buy I-RECs or International Renewable Energy Certificates and other local types.`
  ]
];
