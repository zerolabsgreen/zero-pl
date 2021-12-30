import { PurchaseDto } from '@energyweb/zero-protocol-labs-api-client';
import TableListDesktop from './components/table-list-desktop';
import TableListTablet from './components/table-list-tablet';
import { Box } from '@material-ui/system';

export interface TableListPurchase {
  data: PurchaseDto[];
}

export const TableListPurchase = ({
  data=[],
}: TableListPurchase) => {
  return (
    <>
        {window.innerWidth < 1024 ? (
            <Box sx={{ marginRight: '16px' }}>
              <TableListTablet
                data={data}
              />
            </Box>
        ) : (
          <TableListDesktop
            data={data}
          />
        )}
    </>
  );
};

export default TableListPurchase;
