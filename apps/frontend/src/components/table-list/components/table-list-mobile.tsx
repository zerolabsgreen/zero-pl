import { Box, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import FuelType, { FuelTypeEnum } from '../../fuel-type/fuel-type';
import { useStyles } from '../table-list.styles';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Info from '../../info/info';
import { CertificateDto } from '@energyweb/zero-protocol-labs-api-client';
import EthereumAddress from '../../ethereum-address/ethereum-address';

dayjs.extend(utc);

export interface TableListMobileProps {
  data: CertificateDto;
  recsSold: number;
  sellerId: string;
}

export const TableListMobile = ({
  data,
  sellerId,
  recsSold,
}: TableListMobileProps) => {
  const styles = useStyles();
  return (
    <Box
      boxShadow={'none'}
      borderRadius={'5px'}
      bgcolor={'#F6F3F9'}
      mb={2}
      p={'16px 16px'}
      className="MobileList"
    >
      <Table sx={{ backgroundColor: '#fff' }}>
        <TableBody>
          <TableRow className={styles.tbRowMedia}>
            <TableCell className={styles.thCell} align="left">
              <Info
                popoverContent={`Seller ID
                        Seller ID represents the seller in EW Zero marketplace`}
              >
                Seller ID
              </Info>
            </TableCell>
            <TableCell className={styles.tbCell}>
              <EthereumAddress shortify clipboard address={sellerId} />
            </TableCell>
          </TableRow>
          <TableRow className={styles.tbRowMedia}>
            <TableCell className={styles.thCell} align="left">
              Generator Name
            </TableCell>
            <TableCell className={styles.tbCell}>
              {data.generatorName ?? '-'}
            </TableCell>
          </TableRow>
          <TableRow className={styles.tbRowMedia}>
            <TableCell className={styles.thCell} align="left">
              <Info
                popoverContent={`Generator ID
                    Seller ID represents the seller in EW Zero marketplace`}
              >
                Generator ID
              </Info>
            </TableCell>
            <TableCell className={styles.tbCell}>
              {data.generatorId ?? '-'}
            </TableCell>
          </TableRow>
          <TableRow className={styles.tbRowMedia}>
            <TableCell className={styles.thCell} align="left">
              <Info
                popoverContent={`Country
                    Location of the device generating the energy and RECs`}
              >
                Country
              </Info>
            </TableCell>
            <TableCell className={styles.tbCell}>{data.country}</TableCell>
          </TableRow>
          <TableRow className={styles.tbRowMedia}>
            <TableCell className={styles.thCell} align="left">
              <Info
                popoverContent={`Energy Source
                    Renewable energy source, e.g. wind, hydro, solar, etc.`}
              >
                Energy Source
              </Info>
            </TableCell>
            <TableCell className={styles.tbCell}>
              <FuelType fuelType={data.energySource as FuelTypeEnum} />
            </TableCell>
          </TableRow>
          <TableRow className={styles.tbRowMedia}>
            <TableCell className={styles.thCell} align="left">
              <Info
                popoverContent={`RECs sold
                    The number of RECs the buyer has bought and redeemed for their
                    renewable energy consumption claims.
                    1 REC normally equals to 1 MWh of electricity produced with clean energy`}
              >
                RECs Sold (MWh)
              </Info>
            </TableCell>
            <TableCell className={styles.tbCell}>{recsSold}</TableCell>
          </TableRow>
          <TableRow className={styles.tbRowMedia}>
            <TableCell className={styles.thCell} align="left">
              <Info
                popoverContent={`Period of Generation
                    The “vintage”, or the dates between which the clean energy was produced.
                    RECs require to certify consumption in a specific time frame
                    to avoid double accounting`}
              >
                Period of Generation
              </Info>
            </TableCell>
            <TableCell className={styles.tbCell}>
              {dayjs(data.generationStart).isValid()
                ? dayjs(data.generationStart).utc().format('YYYY-MM-DD')
                : '-'}{' '}
              /{' '}
              {dayjs(data.generationEnd).isValid()
                ? dayjs(data.generationEnd).utc().format('YYYY-MM-DD')
                : '-'}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};
