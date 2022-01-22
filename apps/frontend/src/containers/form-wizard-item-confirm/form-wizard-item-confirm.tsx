import {
  Box,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { variables } from '@energyweb/zero-protocol-labs-theme';
import * as React from 'react';
import { useAddressMappingState } from '../../context';
import { WizardFormValues } from '../../pages/WizardPage/effects';
import useStyles from './form-wizard-item-confirm-styles';
import { useMemo } from 'react';
import { Dayjs } from 'dayjs';

export interface IFormWizardItemConfirmProps {
  isFilecoin?: boolean;
  values: WizardFormValues;
}

type ConfirmTableData = {
  minerId: string;
  region: string;
  period: string;
  amount: string;
};

export const FormWizardItemConfirm: React.FC<IFormWizardItemConfirmProps> = ({
  isFilecoin,
  values,
}) => {
  // This should be cleaned up and remove to effects
  const addressMapping = useAddressMappingState();
  const mappingArrIterator = useMemo(
    () => Array.from(Array(addressMapping?.size).keys()),
    [addressMapping]
  );

  // this should be made less dirty
  const tableData: ConfirmTableData[] = mappingArrIterator.map((key) => ({
    minerId: values[`minerId_${key}`],
    region: values[`country_${key}`],
    period: `
    ${(values[`generalStartDate_${key}`] as Dayjs).format('YYYY/MM/DD')}
    >
    ${(values[`generalEndDate_${key}`] as Dayjs).format('YYYY/MM/DD')}`,
    amount: addressMapping
      ? addressMapping
          .get(key)
          ?.reduce((prev, current) => {
            return prev + Number(values[`energy_${key}_${current}`]);
          }, 0)
          ?.toString() + ' MWh'
      : '',
  }));

  const styles = useStyles();

  return (
    <FormControl className={styles.form}>
      <Box
        display={'flex'}
        p={'24px 20px 24px 24px'}
        bgcolor={variables.white}
        borderRadius={'5px'}
        boxShadow={'0px 4px 10px rgba(160, 154, 198, 0.2)'}
      >
        <Box>
          <Typography
            fontSize={'12px'}
            color={isFilecoin ? variables.black : variables.primaryColor}
            fontWeight={isFilecoin ? 400 : 700}
            mb={'10px'}
          >
            Email
          </Typography>
          <Typography
            fontSize={'12px'}
            color={variables.black}
            fontWeight={isFilecoin ? 400 : 700}
          >
            Payment
          </Typography>
        </Box>
        <Box ml={'50px'}>
          <Typography
            fontSize={'16px'}
            color={isFilecoin ? variables.filcoinColor : variables.primaryColor}
            fontWeight={700}
          >
            {values.emailAddress}
          </Typography>
          <Typography
            fontSize={'16px'}
            color={isFilecoin ? variables.filcoinColor : variables.primaryColor}
            fontWeight={700}
          >
            {values.wirePayment && values.cryptoPayment
              ? 'Wire transfer or Crypto'
              : values.wirePayment
              ? 'Wire transfer'
              : values.cryptoPayment
              ? 'Crypto'
              : ''}
          </Typography>
        </Box>
      </Box>
      <Box
        className={
          isFilecoin ? styles.tableWrapper : styles.tableBitcoinWrapper
        }
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Miner ID</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Period</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((el, index) => {
              return (
                <TableRow
                  key={el.minerId}
                  className={
                    index % 2 === 0 && isFilecoin
                      ? styles.tableRowLight
                      : index % 2 === 0 && !isFilecoin
                      ? styles.tableRowDark
                      : ''
                  }
                >
                  <TableCell>{el.minerId}</TableCell>
                  <TableCell>{el.region}</TableCell>
                  <TableCell>{el.period}</TableCell>
                  <TableCell>{el.amount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Box display={'flex'} justifyContent={'center'} pb={5}>
        <Typography
          fontSize={'12px'}
          color={isFilecoin ? variables.black : variables.white}
          fontWeight={400}
          textAlign={'center'}
          width={'90%'}
          lineHeight={'16px'}
          mt={'16px'}
        >
          Double check the email! Expect to receive an email to the address you
          provided within the next 2 days, with a proposal of the RECs to
          decarbonize your electricity consumption.
        </Typography>
      </Box>
    </FormControl>
  );
};
