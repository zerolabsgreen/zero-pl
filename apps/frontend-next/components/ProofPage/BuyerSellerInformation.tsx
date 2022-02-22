import {
  BuyerDto,
  FilecoinNodeDto,
  SellerDto,
} from '@energyweb/zero-protocol-labs-api-client';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import BuyerInformation from '../common/BuyerInformation';
import SellerInformation from '../common/SellerInformation';

export interface BuyerSellerInformationProps {
  buyer: BuyerDto;
  seller: SellerDto;
  filecoinMinerIdList: FilecoinNodeDto[];
  generationPeriod: { fromDate: string; toDate: string };
  disableMinerIdLink?: boolean
}

export const BuyerSellerInformation = ({
  buyer,
  seller,
  filecoinMinerIdList,
  generationPeriod,
  disableMinerIdLink = false
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
          disableMinerIdLink={disableMinerIdLink}
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
