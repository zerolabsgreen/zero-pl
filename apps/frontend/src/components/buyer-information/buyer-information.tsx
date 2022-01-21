import { Box, Typography, useTheme } from '@mui/material';
import PaperBox from '../paper-box/paper-box';
import FieldLabel from '../field-label/field-label';
import FieldValue from '../field-value/field-value';
import FieldValueList from '../field-value-list/field-value-list';
import { FilecoinNodeDto } from '@energyweb/zero-protocol-labs-api-client';
import { makeStyles } from '@mui/styles';

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
  generationPeriod: { fromDate: string; toDate: string };
}

export const BuyerInformation = ({
  buyerName,
  buyerId,
  filecoinMinerIdList = [],
}: BuyerInformationProps) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box height="90%">
      <Typography
        lineHeight={'24px'}
        mb="20px"
        color="primary"
        fontSize={'20px'}
        fontWeight={700}
      >
        Buyer information
      </Typography>
      <PaperBox bgColor={theme.palette.background.default}>
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
          <FieldLabel width={'200px'} labelText={'Buyer Name'} />
          <FieldValue valueText={buyerName} />
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
      </PaperBox>
    </Box>
  );
};

export default BuyerInformation;
