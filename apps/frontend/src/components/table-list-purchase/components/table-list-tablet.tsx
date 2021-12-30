import { Box, Table, TableCell, TableRow } from '@material-ui/core';
import FuelType, { FuelTypeEnum } from '../../fuel-type/fuel-type';
import { useStyles } from '../table-list-purchase.styles';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import EthereumAddress from '../../ethereum-address/ethereum-address';
import { Tabs } from '@material-ui/core';
import { PurchaseDto } from '@energyweb/zero-protocol-labs-api-client';

dayjs.extend(utc);

export interface TableListTablet {
  data: PurchaseDto[];
}

export const TableListTablet = ({ data = [] }: TableListTablet) => {
  const styles = useStyles();
  return (
    <Box boxShadow={'none'} mb={2} pt={0} maxWidth={'100%'}>
      <Tabs
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
      >
        {data.map((el) => (
          <Box
            key={el.id}
            p={2}
            borderRadius={'5px'}
            bgcolor={'#F6F3F9'}
            display={'flex'}
            mr={'16px'}
          >
            <Table>
              <TableRow>
                <TableCell className={styles.thCell} align="left">
                  Purchase ID
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.tbCell}>
                  <EthereumAddress shortify clipboard address={el.id} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.thCell} align="left">
                  Seller Name
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.tbCell}>
                  {el.seller.name ?? '-'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.thCell} align="left">
                  Generator ID
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.tbCell}>
                  {el.certificate.generatorId ?? '-'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.thCell} align="left">
                  Country
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.tbCell}>
                  {el.certificate.country}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.thCell} align="left">
                  Energy Source
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.tbCell}>
                  <FuelType
                    fuelType={el.certificate.energySource as FuelTypeEnum}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.thCell} align="left">
                  Amount Purchased
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.tbCell}>{el.recsSold}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.thCell} align="left">
                  Purchase Date
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.tbCell}>
                  {dayjs(el.certificate.generationStart).isValid()
                    ? dayjs(el.certificate.generationStart)
                        .utc()
                        .format('YYYY-MM-DD')
                    : '-'}{' '}
                  /{' '}
                  {dayjs(el.certificate.generationEnd).isValid()
                    ? dayjs(el.certificate.generationEnd)
                        .utc()
                        .format('YYYY-MM-DD')
                    : '-'}
                </TableCell>
              </TableRow>
            </Table>
          </Box>
        ))}
      </Tabs>
    </Box>
  );
};

export default TableListTablet;
