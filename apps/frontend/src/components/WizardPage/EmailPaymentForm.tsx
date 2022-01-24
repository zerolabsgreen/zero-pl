import { FC } from 'react';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import { styled, useTheme } from '@mui/material/styles';
import { FilecoinColors } from '../../utils';
import type { WizardFormValues } from '../../pages/WizardPage/effects';
import { SwitchLabel } from '../SwitchLabel';

export interface EmailPaymentFormProps {
  isFilecoin?: boolean;
  values: WizardFormValues;
  setFieldValue: (name: string, value: any) => void;
  handleFormikChange: (value: any) => void;
}

export const EmailPaymentForm: FC<EmailPaymentFormProps> = ({
  isFilecoin,
  setFieldValue,
  handleFormikChange,
  values,
}) => {
  const theme = useTheme();

  return (
    <StyledFormControl>
      <Typography
        fontSize='14px'
        color={isFilecoin ? FilecoinColors.simpleText : theme.palette.text.primary}
        ml='15px'
        mb='8px'
        fontWeight={600}
      >
        Email*{' '}
        <Typography
          component="span"
          fontSize='12px'
          fontWeight={500}
          color={isFilecoin ? FilecoinColors.simpleText : theme.palette.text.primary}
        >
          Where we will send you the offer
        </Typography>
      </Typography>
      <StyledTextField
        isFilecoin={isFilecoin}
        name="emailAddress"
        value={values.emailAddress}
        onChange={handleFormikChange}
        placeholder={'Your email adress'}
      />
      <PaymentBlockWrapper>
        <Typography
          fontSize={'16px'}
          color={isFilecoin ? FilecoinColors.primary : theme.palette.secondary.main}
          fontWeight={700}
          mb={'4px'}
        >
          Preferred payment method
        </Typography>
        <Typography
          fontSize={'12px'}
          color={isFilecoin ? FilecoinColors.simpleText : theme.palette.primary.main}
          fontWeight={600}
          lineHeight={'16px'}
        >
          Needed to pair you with a seller that accepts your preferred payment
          method. When you’ll receive the offer, the seller will inform you what
          currencies they accept
        </Typography>
        <Box>
          <SwitchLabel
            labelName={'Wire transfer'}
            checked={values.wirePayment ?? false}
            setChecked={(value) => setFieldValue('wirePayment', value)}
            CustomSwitch={isFilecoin ? CustomSwitch: undefined}
            CustomLabel={isFilecoin ? CustomSwitchLabel : undefined}
          />
          <SwitchLabel
            labelName={'Crypto payment'}
            checked={values.cryptoPayment ?? false}
            setChecked={(value) => setFieldValue('cryptoPayment', value)}
            CustomSwitch={isFilecoin ? CustomSwitch: undefined}
            CustomLabel={isFilecoin ? CustomSwitchLabel : undefined}
          />
        </Box>
      </PaymentBlockWrapper>
    </StyledFormControl>
  );
};

const StyledFormControl = styled(FormControl)(({ theme }) => `
  width: 488px;
  ${theme.breakpoints.down('sm')} {
    width: 100%;
  };
`);

const StyledTextField = styled(TextField, { shouldForwardProp: (prop) => prop !== 'isFilecoin' })<{isFilecoin?: boolean}>(({ theme, isFilecoin }) => `
  background-color: ${isFilecoin ? theme.palette.background.paper : '#F6F3F9'};
  border-radius: 5px;
  color: ${isFilecoin ? FilecoinColors.primary : theme.palette.primary.main};
  font-size: 18px;
  font-weight: 700;
  padding: 14px;
  box-shadow: 0px 4px 10px rgba(160, 154, 198, 0.2);
`);

const PaymentBlockWrapper = styled(Box)(({ theme }) => `
  background-color: ${theme.palette.background.paper};
  margin-top: 8px;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(160, 154, 198, 0.2);
  padding: 24px 40px 32px 24px;
`);

const CustomSwitch = styled(Switch)(({ theme }) => `
  & .MuiSwitch-thumb {
    background-color: ${theme.palette.grey[400]};
  };
  & .MuiSwitch-switchBase.Mui-checked {
    & .MuiSwitch-thumb {
      background-color: ${FilecoinColors.primary};
    };
  };
  & .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
    background-color: #B3DEFF;
  };
  & .MuiSwitch-switchBase + .MuiSwitch-track {
    background-color: #C8C8CA;
  };
`);

const CustomSwitchLabel = styled('span', { shouldForwardProp: (prop) => prop !== 'isChecked' })<{isChecked: boolean}>(({ isChecked, theme }) => `
  font-weight: ${isChecked ? 700 : 500};
  font-size: 14px;
  color: ${isChecked ? FilecoinColors.primary : theme.palette.grey[400]};
`);
