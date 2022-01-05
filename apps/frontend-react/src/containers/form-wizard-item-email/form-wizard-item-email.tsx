import { FormControl, TextField, Typography, Box } from '@mui/material';
import { variables } from '@energyweb/zero-protocol-labs-theme';
import * as React from 'react';
import useStyles from './form-wizard-item-email-styles';
import { SwitchLabel } from '../../components/switch-label/switch-label';
import { WizardFormValues } from '../../pages/wizard-page/WizardPage.effects';

export interface IFormWizardItemEmailProps {
  isFilecoin?: boolean;
  values: WizardFormValues;
  setFieldValue: (name: string, value: any) => void;
  handleFormikChange: (value: any) => void;
}

export const FormWizardItemEmail: React.FC<IFormWizardItemEmailProps> = ({
  isFilecoin,
  setFieldValue,
  handleFormikChange,
  values,
}) => {
  const styles = useStyles();

  return (
    <FormControl className={styles.form}>
      <Typography
        fontSize={variables.fontSize}
        color={isFilecoin ? variables.black : variables.white}
        ml={'15px'}
        mb={'8px'}
        fontWeight={600}
      >
        Email*{' '}
        <span className={styles.title}>Where we will send you the offer</span>
      </Typography>
      <TextField
        name="emailAddress"
        value={values.emailAddress}
        onChange={handleFormikChange}
        placeholder={'Your email adress'}
        inputProps={{
          className: isFilecoin ? styles.inputProps : styles.inputBitcoinProps,
        }}
      />
      <Box
        bgcolor={variables.white}
        mt={'8px'}
        borderRadius={'5px'}
        boxShadow={'0px 4px 10px rgba(160, 154, 198, 0.2)'}
        p={'24px 40px 32px 24px'}
      >
        <Typography
          fontSize={'16px'}
          color={isFilecoin ? variables.filcoinColor : variables.secondaryColor}
          fontWeight={700}
          mb={'4px'}
        >
          Preferred payment method
        </Typography>
        <Typography
          fontSize={'12px'}
          color={isFilecoin ? variables.black : variables.primaryColor}
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
            isFilecoin={isFilecoin}
            checked={values.wirePayment ?? false}
            setChecked={(value) => setFieldValue('wirePayment', value)}
          />
          <SwitchLabel
            labelName={'Crypto payment'}
            isFilecoin={isFilecoin}
            checked={values.cryptoPayment ?? false}
            setChecked={(value) => setFieldValue('cryptoPayment', value)}
          />
        </Box>
      </Box>
    </FormControl>
  );
};
