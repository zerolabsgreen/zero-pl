import PaperBox from '../PaperBox';
import FieldLabel from '../FieldLabel';
import FieldValue from '../FieldValue';
import FieldValueMultiline from '../FieldValueMultiline';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

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
      <FlexColumn>
          <FieldLabel width={'200px'} labelText={'Seller ID'} />
          <FieldValue valueText={id} />
        </FlexColumn>
        <FlexColumn>
          <FieldLabel width={'200px'} labelText={'Seller Name'} />
          <FieldValue valueText={name} />
        </FlexColumn>
        <FlexColumn alignItems={'start'}>
          <FieldLabel width={'200px'} labelText={'Address'} />
          <FieldValueMultiline
            textValues={[addressFirstLine, addressSecondLine]}
          />
        </FlexColumn>
        <FlexColumn>
          <FieldLabel width={'200px'} labelText={'Contact Person'} />
          <FieldValue valueText={contactPerson} />
        </FlexColumn>
      </PaperBox>
    </Box>
  );
};

export default SellerInformation;

const FlexColumn = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  @media(max-width: 1024px) {
    flex-direction: column;
    align-items: 'baseline;
  };
`;
