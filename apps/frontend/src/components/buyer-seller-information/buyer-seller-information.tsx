import { Grid } from '@mui/material';
import BuyerInformation from '../buyer-information/buyer-information';
import SellerInformation from '../seller-information/seller-information';
import {
  AnnualTransactionsDto,
  BuyerDto,
  FilecoinNodeDto,
  SellerDto,
} from '@energyweb/zero-protocol-labs-api-client';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  flexColumn: {
    '@media (max-width: 620px)': {
      flexDirection: 'column',
    },
  },
}));

export interface BuyerSellerInformationProps {
  recsTransactions: AnnualTransactionsDto[];
  buyer: BuyerDto;
  seller: SellerDto;
  filecoinMinerIdList: FilecoinNodeDto[];
  generationPeriod: { fromDate: string; toDate: string };
}

export const BuyerSellerInformation = ({
  buyer,
  seller,
  recsTransactions,
  filecoinMinerIdList,
  generationPeriod,
}: BuyerSellerInformationProps) => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.flexColumn}
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
          recsAmount={recsTransactions}
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
    </Grid>
  );
};

export default BuyerSellerInformation;
