import {
  BuyerDto,
  FilecoinNodeDto,
  SellerDto,
} from '@energyweb/zero-protocol-labs-api-client';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import BuyerInformation from '../BuyerInformation';
import SellerInformation from '../SellerInformation';

export interface BuyerSellerInformationProps {
  buyer: BuyerDto;
  seller: SellerDto;
  filecoinMinerIdList: FilecoinNodeDto[];
  generationPeriod: { fromDate: string; toDate: string };
}

export const BuyerSellerInformation = ({
  buyer,
  seller,
  filecoinMinerIdList,
  generationPeriod,
}: BuyerSellerInformationProps) => {
  return (
    <ResponsiveGrid
      columnGap={3}
      wrap={'nowrap'}
      container
    >
      <Grid item sm={6}>
        <BuyerInformation
          generationPeriod={generationPeriod}
          buyerId={buyer.id}
          buyerName={buyer.name}
          filecoinMinerIdList={filecoinMinerIdList}
        />
      </Grid>
      <Grid item sm={6}>
        <SellerInformation
          id={seller.id}
          name={seller.name}
          addressFirstLine={seller.addressLine1}
          addressSecondLine={seller.addressLine2}
          contactPerson={seller.contactPerson}
        />
      </Grid>
    </ResponsiveGrid>
  );
};

const ResponsiveGrid = styled(Grid)(({ theme }) => `
  ${theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`)

export default BuyerSellerInformation;