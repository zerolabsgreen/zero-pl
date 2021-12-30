import { Box, Typography } from '@material-ui/core';
import PaperBox from '../paper-box/paper-box';
import FieldLabel from '../field-label/field-label';
import FieldValue from '../field-value/field-value';
import FieldValueTransactionList from '../field-value-transaction-list/field-value-transaction-list';
import FieldValueList from '../field-value-list/field-value-list';
import {
  AnnualTransactionsDto,
  FilecoinNodeDto,
} from '@energyweb/zero-protocol-labs-api-client';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  flexColumn: {
    '@media (max-width: 1027px)': {
      flexDirection: 'column',
      alignItems: 'baseline',
    },
  },
});

export interface BuyerInformationProps {
  buyerName: string;
  buyerId: string;
  filecoinMinerIdList: FilecoinNodeDto[];
  recsAmount: Array<AnnualTransactionsDto>;
  generationPeriod: { fromDate: string; toDate: string };
}

export const BuyerInformation = ({
  generationPeriod,
  buyerName,
  buyerId,
  filecoinMinerIdList = [],
  recsAmount = [],
}: BuyerInformationProps) => {
  const classes = useStyles();

  return (
    <Box>
      <Typography
        lineHeight={'24px'}
        mb={3}
        color={'#2D1155'}
        fontSize={'20px'}
        fontWeight={700}
      >
        Buyer information
      </Typography>
      <PaperBox bgColor={'#F6EFFF'}>
        <Box
          className={classes.flexColumn}
          display={'flex'}
          alignItems={'flex-start'}
          mb={2}
        >
          <FieldLabel width={'200px'} labelText={'Buyer ID'} />
          <FieldValue copyToClipboardEnabled valueText={buyerId} />
        </Box>
        <Box
          className={classes.flexColumn}
          display={'flex'}
          alignItems={'flex-start'}
          mb={2}
        >
          <FieldLabel width={'200px'} labelText={'Filecoin Miner IDs'} />
          <FieldValueList valueList={filecoinMinerIdList.map((el) => el.id)} />
        </Box>
        <Box
          className={classes.flexColumn}
          display={'flex'}
          alignItems={'flex-start'}
          mb={2}
        >
          <FieldLabel width={'200px'} labelText={'Buyer Name'} />
          <FieldValue valueText={buyerName} />
        </Box>
        <Box className={classes.flexColumn} display={'flex'} mb={2}>
          <FieldLabel width={'200px'} labelText={'Total amount of RECs'} />
          <FieldValueTransactionList
            transactionList={recsAmount}
            generationPeriod={generationPeriod}
            showRec={true}
          />
        </Box>
      </PaperBox>
    </Box>
  );
};

export default BuyerInformation;
