import { FC, useMemo } from 'react';
import { Dayjs } from 'dayjs';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { styled, useTheme } from '@mui/material/styles';
import { useAddressMappingState } from '../../context';
import { FilecoinColors } from '../../utils';
import { WizardFormValues } from './WizardPageStepSelector';

export interface ConfirmFormProps {
  isFilecoin?: boolean;
  values: WizardFormValues;
}

type ConfirmTableData = {
  minerId: string;
  region: string;
  period: string;
  amount: string;
};

export const ConfirmForm: FC<ConfirmFormProps> = ({
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
  const theme = useTheme();

  return (
    <StyledFormControl>
      <BoxWrapper>
        <Box>
          <Typography
            fontSize={'12px'}
            color={isFilecoin ? FilecoinColors.simpleText : theme.palette.primary.main}
            fontWeight={isFilecoin ? 400 : 700}
            mb={'10px'}
          >
            Email
          </Typography>
          <Typography
            fontSize={'12px'}
            color={FilecoinColors.simpleText}
            fontWeight={isFilecoin ? 400 : 700}
          >
            Payment
          </Typography>
        </Box>
        <Box ml={'50px'}>
          <Typography
            fontSize={'16px'}
            color={isFilecoin ? FilecoinColors.primary : theme.palette.primary.main}
            fontWeight={700}
          >
            {values.emailAddress}
          </Typography>
          <Typography
            fontSize={'16px'}
            color={isFilecoin ? FilecoinColors.primary : theme.palette.primary.main}
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
      </BoxWrapper>
      <TableWrapper>
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
            {tableData.map((item) => {
              return (
                <TableRow key={item.minerId}>
                  <TableCell>{item.minerId}</TableCell>
                  <TableCell>{item.region}</TableCell>
                  <TableCell>{item.period}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableWrapper>
      <Box display={'flex'} justifyContent={'center'} pb={5}>
        <Typography
          fontSize={'12px'}
          color={isFilecoin ? FilecoinColors.simpleText : theme.palette.text.primary}
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
    </StyledFormControl>
  );
};

const StyledFormControl = styled(FormControl)(({ theme }) => `
  width: 488px;
  ${theme.breakpoints.down('sm')} {
    width: 100%;
  };
`);

const BoxWrapper = styled(Box)(({ theme }) => `
  display: flex;
  padding: 24px 20px 24px 24px;
  background-color: ${theme.palette.background.paper};
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(160, 154, 198, 0.2);
`);

const TableWrapper = styled(Box, { shouldForwardProp: (prop) => prop !== 'isFilecoin' })<{isFilecoin?: boolean}>(({ theme, isFilecoin }) => `
  width: 100%;
  background-color: ${theme.palette.background.paper};
  margin-top: 8px;
  box-shadow: 0px 4px 10px rgba(160, 154, 198, 0.2);
  border-radius: 5px;
  padding: 14px 0;
  & .MuiTableCell-root {
    padding: 5px 10px;
  };
  & .MuiTableBody-root tr {
    background-color: ${theme.palette.background.paper};
    & .MuiTableCell-root {
      color: ${isFilecoin ? FilecoinColors.primary : theme.palette.primary.main};
      font-size: 16px;
      font-weight: 700;
    };
  };
  & .MuiTableHead-root {
    & .MuiTableCell-root {
      color: ${isFilecoin ? FilecoinColors.simpleText : theme.palette.primary.main};
      font-size: 12px;
      font-weight: 700;
    };
  };
`)
