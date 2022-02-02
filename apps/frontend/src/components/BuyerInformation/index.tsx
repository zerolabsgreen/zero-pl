import { FilecoinNodeDto } from '@energyweb/zero-protocol-labs-api-client';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PaperBox from '../PaperBox';
import FieldLabel from '../FieldLabel';
import FieldValue from '../FieldValue';
import FieldValueList from '../FieldValueList';

export interface BuyerInformationProps {
  buyerName: string;
  buyerId: string;
  filecoinMinerIdList: FilecoinNodeDto[];
  generationPeriod: { fromDate: string; toDate: string };
  // temporary for example purpose
  disableMinerIdLink?: boolean;
}

export const BuyerInformation = ({
  buyerName,
  buyerId,
  filecoinMinerIdList = [],
  disableMinerIdLink = false
}: BuyerInformationProps) => {
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
        <FlexColumn>
          <FieldLabel width={'200px'} labelText={'Buyer ID'} />
          <FieldValue copyToClipboardEnabled valueText={buyerId} />
        </FlexColumn>
        <FlexColumn>
          <FieldLabel width={'200px'} labelText={'Buyer Name'} />
          <FieldValue valueText={buyerName} />
        </FlexColumn>
        <FlexColumn>
          <FieldLabel width={'200px'} labelText={'Filecoin Miner IDs'} />
          <FieldValueList disableLink={disableMinerIdLink} valueList={filecoinMinerIdList.map((el) => el.id)} />
        </FlexColumn>
      </PaperBox>
    </Box>
  );
};

export default BuyerInformation;

const FlexColumn = styled(Box)`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  @media(max-width: 1027px) {
    flex-direction: column;
    align-items: 'baseline;
  };
`;

