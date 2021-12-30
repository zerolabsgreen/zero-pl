import PaperBox from '../paper-box/paper-box';
import { Box, Typography } from '@material-ui/core';
import FieldLabel from '../field-label/field-label';
import FieldValue from '../field-value/field-value';
import FieldValueMultiline from '../field-value-multiline/field-value-multiline';
import { makeStyles } from '@material-ui/styles';

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
  contactPerson: string;
  addressFirstLine: string;
  addressSecondLine?: string;
}

export const SellerInformation = ({
  addressFirstLine,
  addressSecondLine,
  name,
  contactPerson,
}: SellerInformationProps) => {
  const classes = useStyles();

  return (
    <Box height={'100%'}>
      <Typography
        mb={3}
        fontWeight={700}
        lineHeight={'24px'}
        color={'#2D1155'}
        fontSize={'20px'}
      >
        Seller information
      </Typography>
      <PaperBox customHeight={'calc(100% - 48px)'} bgColor={'#F6EFFF'}>
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
