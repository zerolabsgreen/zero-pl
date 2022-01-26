import { Helmet } from 'react-helmet-async';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Button from '@mui/material/Button';
import { ReactComponent as LeftArrowIcon } from '../../assets/svg/leftArrow.svg';
import { ReactComponent as RightArrowIcon } from '../../assets/svg/rightArrow.svg';
import { ReactComponent as LeftArrowIconFilecoin } from '../../assets/svg/leftArrowFilecoin.svg';
import { ReactComponent as RightArrowIconFilecoin } from '../../assets/svg/rightArrowFilecoin.svg';
import { ReactComponent as SencIcon } from '../../assets/svg/sendIcon.svg';
import {
  WizardPageStepSelector,
  CardReadMore,
  CardReadMoreTablet,
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
} from '../../components/WizardPage';
import { textWizardPageDown, textWizardPageUp } from './utils';
import { useWizardPageEffects } from './effects';

export const WizardPage = () => {
  const {
    formik,
    handleBackStep,
    isFilecoin,
    step,
    stepLabels,
    isLastStep,
    selectedProtocol,
    submitButtonEnabled
  } = useWizardPageEffects();
  const lgUpScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.up('lg'));
  const lgDownScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('lg'));
  const mdUpScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'));
  const smUpScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.up('sm'));
  const smDownScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));

  return (
    <>
      <Helmet>
        <title>Create Request</title>
      </Helmet>
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
                      <SencIcon />
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
