import { Box, Typography } from '@mui/material';
import PaperBox from '../paper-box/paper-box';
import FieldLabel from '../field-label/field-label';
import FieldValue from '../field-value/field-value';
import FieldValueTransactionList from '../field-value-transaction-list/field-value-transaction-list';
import FieldValueList from '../field-value-list/field-value-list';
import { AnnualTransactionsDto, FilecoinNodeDto } from '@energyweb/zero-protocol-labs-api-client';
import { useState } from 'react';
import { ButtonDetails } from '../button-details/button-details';
import { useStyles } from './purchase-buyer-information-styles';

export interface PurchaseBuyerInformationProps {
  buyerName: string;
  buyerId: string;
  filecoinMinerIdList: FilecoinNodeDto[];
  recsAmount: Array<AnnualTransactionsDto>;
  generationPeriod: { fromDate: string; toDate: string };
}

export const PurchaseBuyerInformation = ({
  generationPeriod,
  buyerName,
  buyerId,
  filecoinMinerIdList = [],
  recsAmount = [],
}: PurchaseBuyerInformationProps) => {
  const classes = useStyles();

  const [info, setInfo] = useState(false);

  const SowInfo = () => {
    info === false ? setInfo(true) : setInfo(false);
  };

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
          display={'flex'}
          className={classes.flexColumn}
          justifyContent={'space-between'}
        >
          <Box className={classes.box} alignItems={'flex-start'} mb={0}>
            <FieldLabel
              className={classes.fieldLab}
              mb={'10px'}
              labelText={'Buyer ID'}
            />
            <FieldValue copyToClipboardEnabled valueText={buyerId} />
          </Box>
          <Box display={'flex'} className={classes.flexColumn}>
            <Box className={classes.box} alignItems={'flex-start'} mb={0}>
              <FieldLabel
                className={classes.fieldLab}
                mb={'10px'}
                labelText={'Filecoin Miner IDs'}
              />
              <FieldValueList
                valueList={filecoinMinerIdList.map((el) => el.id)}
              />
            </Box>
            <Box
              className={classes.margin}
              alignItems={'flex-start'}
              mb={0}
              sx={{ marginLeft: '46px' }}
            >
              <FieldLabel
                className={classes.fieldLab}
                mb={'10px'}
                labelText={'Buyer Name'}
              />
              <FieldValue valueText={buyerName} />
            </Box>
          </Box>
          <Box display={'flex'}>
            <Box mb={0}>
              <FieldLabel
                className={classes.fieldLab}
                mb={'10px'}
                labelText={'Total amount of RECs'}
              />
              <FieldValueTransactionList generationPeriod={generationPeriod} />
            </Box>
            <Box ml={'20px'}>
              <ButtonDetails
                name={'Details'}
                onClick={SowInfo}
                isButtonUp={info}
              />
            </Box>
          </Box>
        </Box>
        {info && (
          <Box>
            <FieldValueTransactionList
              transactionList={recsAmount}
              generationPeriod={generationPeriod}
              showRec={false}
            />
          </Box>
        )}
      </PaperBox>
    </Box>
  );
};

export default PurchaseBuyerInformation;
