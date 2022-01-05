import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import FuelType, { FuelTypeEnum } from '../../fuel-type/fuel-type';
import { useStyles } from '../table-list-purchase.styles';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import EthereumAddress from '../../ethereum-address/ethereum-address';
import { ButtonRight } from '../../button-right/button-right';
import { Link } from 'react-router-dom';
import { PurchaseDto } from '@energyweb/zero-protocol-labs-api-client';

dayjs.extend(utc);

export interface TableListDesktop {
  data: PurchaseDto[];
}
export const TableListDesktop = ({ data = [] }: TableListDesktop) => {
  const styles = useStyles();
  return (
    <Box
      boxShadow={'none'}
      borderRadius={'5px'}
      bgcolor={'#F6F3F9'}
      mb={2}
      p={2}
      pt={0}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={styles.thCell} align="left">
              Purchase ID
            </TableCell>
            <TableCell className={styles.thCell} align="left">
              Seller Name
            </TableCell>
            <TableCell className={styles.thCell} align="left">
              Generator ID
            </TableCell>
            <TableCell className={styles.thCell} align="left">
              Country
            </TableCell>
            <TableCell className={styles.thCell} align="left">
              Energy Source
            </TableCell>
            <TableCell className={styles.thCell} align="left">
              Amount Purchased
            </TableCell>
            <TableCell className={styles.thCell} align="left">
              Purchase Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ borderRadius: '5px', backgroundColor: '#fff' }}>
          {data.map((el: PurchaseDto) => (
            <TableRow key={el.id}>
              <TableCell className={styles.tbCell}>
                <EthereumAddress shortify clipboard address={el.id} />
              </TableCell>
              <TableCell className={styles.tbCell}>
                {el.seller.name ?? '-'}
              </TableCell>
              <TableCell className={styles.tbCell}>
                {el.certificate.generatorId ?? '-'}
              </TableCell>
              <TableCell className={styles.tbCell}>
                {el.certificate.country}
              </TableCell>
              <TableCell className={styles.tbCell}>
                <FuelType
                  fuelType={el.certificate.energySource as FuelTypeEnum}
                />
              </TableCell>
              <TableCell className={styles.tbCell}>{el.recsSold}</TableCell>
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
              <TableCell className={styles.tbCell}>
                <Link to={`/partners/filecoin/purchases/${el.id}`}>
                  <ButtonRight />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default TableListDesktop;
