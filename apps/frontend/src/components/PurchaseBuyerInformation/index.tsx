import { FilecoinNodeDto } from '@energyweb/zero-protocol-labs-api-client';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ButtonDetails } from '../ButtonDetails';
import PaperBox from '../PaperBox';
import FieldLabel from '../FieldLabel';
import FieldValue from '../FieldValue';
import FieldValueList from '../FieldValueList';

export interface PurchaseBuyerInformationProps {
  buyerName: string;
  buyerId: string;
  filecoinMinerIdList: FilecoinNodeDto[];
  generationPeriod: { fromDate: string; toDate: string };
}

export const PurchaseBuyerInformation = ({
  generationPeriod,
  buyerName,
  buyerId,
  filecoinMinerIdList = [],
}: PurchaseBuyerInformationProps) => {
  const theme = useTheme();
  const [info, setInfo] = useState(false);
  const showInfo = () => setInfo(!info);

  return (
    <Box>
      <Typography
        lineHeight={'24px'}
        mb={3}
        color='primary'
        fontSize={'20px'}
        fontWeight={700}
      >
        Buyer information
      </Typography>
      <PaperBox bgColor={theme.palette.background.default}>
        <FlexBox justifyContent="space-between">
          <ResponsiveBox>
            <ResponsiveFieldLabel labelText={'Buyer ID'} />
            <FieldValue copyToClipboardEnabled valueText={buyerId} />
          </ResponsiveBox>
          <FlexBox>
            <ResponsiveBox>
              <ResponsiveFieldLabel labelText={'Filecoin Miner IDs'} />
              <FieldValueList
                valueList={filecoinMinerIdList.map((el) => el.id)}
              />
            </ResponsiveBox>
            <BuyerNameWrapper>
              <ResponsiveFieldLabel labelText={'Buyer Name'} />
              <FieldValue valueText={buyerName} />
            </BuyerNameWrapper>
          </FlexBox>
          <Box display={'flex'}>
            <Box ml={'20px'}>
              <div>
                <ButtonDetails
                  name={'Details'}
                  onClick={showInfo}
                  isButtonUp={info}
                />
              </div>
            </Box>
          </Box>
        </FlexBox>
      </PaperBox>
    </Box>
  );
};

export default PurchaseBuyerInformation;

const FlexBox = styled(Box)(({ theme }) => `
  display: flex;
  ${theme.breakpoints.down('md')} {
    flex-direction: column;
  };
`);

const ResponsiveFieldLabel = styled(FieldLabel)`
  margin-bottom: 10px;
  @media (max-width: 1027px) {
    margin-bottom: 0;
  };
`

const ResponsiveBox = styled(Box)`
  align-items: flex-start;
  margin-bottom: 0;
  @media (max-width: 1027px) {
    margin-bottom: 12px;
  };
`;

const BuyerNameWrapper = styled(Box)`
  align-items: flex-start;
  margin-bottom: 0;
  margin-left: 46px;
  @media (max-width: 1082px) {
    margin-left: 10px;
  };
  @media (max-width: 1024px) {
    margin-left: 0;
  };
`
