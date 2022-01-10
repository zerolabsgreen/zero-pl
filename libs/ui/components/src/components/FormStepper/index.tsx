import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import { FC } from 'react';

export interface FormStepperProps {
  activeStep: number;
  steps: string[];
}

export const FormStepper: FC<FormStepperProps> = ({ activeStep, steps }) => {
  return (
    <Stepper
      alternativeLabel
      nonLinear
      connector={<div></div>}
      activeStep={activeStep}
    >
      {steps.map((label, index) => (
        <StyledStep key={label} active={index <= activeStep}>
          <StepLabel sx={{ width: '100%' }}>{label}</StepLabel>
        </StyledStep>
      ))}
    </Stepper>
  );
};

const StyledStep = styled(Step)(({ theme, active }) => `
  & .MuiStepLabel-iconContainer {
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: ${active
    ? `2px solid ${theme.palette.secondary.main}`
    : '2px solid #9B95BD'};

    & .MuiSvgIcon-root {
      & circle {
        display: none;
      }
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  & .MuiStepIcon-text {
    font-size: 12px;
    font-weight: 500;
    fill: ${active && theme.palette.secondary.main}
  }
  & .MuiStepLabel-label.Mui-active {
    color: ${theme.palette.secondary.main};
  }
  & .Mui-active {
    color: ${theme.palette.secondary.main};
  }
`);
