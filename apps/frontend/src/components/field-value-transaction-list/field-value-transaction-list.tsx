import { Box, Grid, Typography } from '@material-ui/core';
import { AnnualTransactionsDto } from '@energyweb/zero-protocol-labs-api-client';
import Info from '../info/info';
import dayjs from 'dayjs';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  styles: {
    '@media (max-width: 1027px)': {
      padding: '0',
    },
  },
  margin: {
    '@media (max-width: 620px)': {
      marginLeft: '10px',
    },
  },
});

export interface FieldValueTransactionListProps {
  transactionList?: Array<AnnualTransactionsDto>;
  generationPeriod: { fromDate: string; toDate: string };
  showRec?: boolean;
}

export function FieldValueTransactionList({
  transactionList,
  generationPeriod,
  showRec,
}: FieldValueTransactionListProps) {
  const totalTransactions =
    transactionList &&
    transactionList.reduce(
      (previousValue, currentValue) => previousValue + currentValue.amount,
      0
    );

  const classes = useStyles();

  return (
    <Box width={'100%'}>
      <Box
        className={classes.styles}
        pl={transactionList && '13px'}
        color={'#2D1155'}
        mb={'14px'}
        fontWeight={700}
        fontSize={'16px'}
      >
        {showRec && totalTransactions}
        {showRec === false ? '' : totalTransactions === 1 ? 'REC' : 'RECs'}
      </Box>
      <Box
        borderRadius={'5px'}
        bgcolor={'#fff'}
        display={'flex'}
        border={transactionList && '0.5px solid #00D08A'}
        px={transactionList && '13px'}
        py={transactionList && '7px'}
      >
        <Grid container>
          {showRec === false ? (
            <Box mr={'30px'}>
              <Typography fontWeight={500} fontSize={'14px'}>
                Total amount of RECs in
              </Typography>
            </Box>
          ) : (
            ''
          )}
          {transactionList &&
            transactionList.map((value) => (
              <Grid className={classes.margin} key={value.amount.toString() + value.year.toString()} item sm={2}>
                <Box color={'#2D1155'} fontWeight={500}>
                  {shouldShowNote(generationPeriod.fromDate, value.year) ? (
                    <Info
                      hideTimeout={1000}
                      popoverContentElement={
                        <div>
                          {value.year} consumption matched with generation
                          according to{' '}
                          <a
                            style={{ color: '#fff' }}
                            target={'_blank'}
                            href="https://www.epa.gov/greenpower/green-power-partnership-eligible-generation-dates"
                            rel="noreferrer"
                          >
                            Green-e Renewable Standard (Section III B. Vintage
                            of Eligible Renewables)
                          </a>
                        </div>
                      }
                    >
                      {value.year}
                    </Info>
                  ) : (
                    value.year
                  )}
                </Box>
                <Box color={'#2D1155'} fontWeight={700} fontSize={'16px'}>
                  {value.amount} {value.amount === 1 ? 'REC' : 'RECs'}
                </Box>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}
const shouldShowNote = (generationPeriodFromDate: string, year: number) => {
  if (!year || !dayjs(year).isValid()) {
    return false;
  } else {
    return dayjs(generationPeriodFromDate).get('year') > year;
  }
};

export default FieldValueTransactionList;
