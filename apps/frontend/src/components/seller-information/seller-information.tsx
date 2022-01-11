import PaperBox from '../paper-box/paper-box';
import { Box, Typography, useTheme } from '@mui/material';
import FieldLabel from '../field-label/field-label';
import FieldValue from '../field-value/field-value';
import FieldValueMultiline from '../field-value-multiline/field-value-multiline';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  flexColumn: {
    '@media (max-width: 1024px)': {
      flexDirection: 'column',
      alignItems: 'baseline',
    },
  },
});

export interface SellerInformationProps {
  name: string;
  id: string;
  contactPerson: string;
  addressFirstLine: string;
  addressSecondLine?: string;
}

export const SellerInformation = ({
  addressFirstLine,
  addressSecondLine,
  name,
  id,
  contactPerson,
}: SellerInformationProps) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box height="90%">
      <Typography
        mb="20px"
        fontWeight={700}
        lineHeight={'24px'}
        color='primary'
        fontSize={'20px'}
      >
        Seller information
      </Typography>
      <PaperBox bgColor={theme.palette.background.default}>
      <Box
          className={classes.flexColumn}
          display={'flex'}
          alignItems={'center'}
          mb={2}
        >
          <FieldLabel width={'200px'} labelText={'Seller ID'} />
          <FieldValue valueText={id} />
        </Box>
        <Box
          className={classes.flexColumn}
          display={'flex'}
          alignItems={'center'}
          mb={2}
        >
          <FieldLabel width={'200px'} labelText={'Seller Name'} />
          <FieldValue valueText={name} />
        </Box>
        <Box
          className={classes.flexColumn}
          display={'flex'}
          alignItems={'start'}
          mb={2}
        >
          <FieldLabel width={'200px'} labelText={'Address'} />
          <FieldValueMultiline
            textValues={[addressFirstLine, addressSecondLine]}
          />
        </Box>
        <Box
          className={classes.flexColumn}
          display={'flex'}
          alignItems={'center'}
          mb={2}
        >
          <FieldLabel width={'200px'} labelText={'Contact Person'} />
          <FieldValue valueText={contactPerson} />
        </Box>
      </PaperBox>
    </Box>
  );
};

export default SellerInformation;
