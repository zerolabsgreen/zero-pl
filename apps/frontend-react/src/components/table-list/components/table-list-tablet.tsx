import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import FuelType, { FuelTypeEnum } from '../../fuel-type/fuel-type';
import { useStyles } from '../table-list.styles';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Info from '../../info/info';
import { CertificateDto } from '@energyweb/zero-protocol-labs-api-client';
import EthereumAddress from '../../ethereum-address/ethereum-address';
import { variables } from '@energyweb/zero-protocol-labs-theme';

dayjs.extend(utc);

/* eslint-disable-next-line */
export interface TableListTablet {
  data: CertificateDto;
  recsSold: number;
  sellerId: string;
}

export const TableListTablet = ({
  data,
  sellerId,
  recsSold,
}: TableListTablet) => {
  const styles = useStyles();
  return (
    <Box
      boxShadow={'none'}
      borderRadius={'5px'}
      bgcolor={variables.defaultBackgroundColor}
      mb={2}
      p={2}
      pt={0}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={styles.thCell} align="left">
              <Info
                popoverContent={`Seller ID
                    Seller ID represents the seller in EW Zero marketplace`}
              >
                Seller ID
              </Info>
            </TableCell>
            <TableCell className={styles.thCell} align="left">
              Generator Name
            </TableCell>
            <TableCell className={styles.thCell} align="left">
              <Info
                popoverContent={`Generator ID
                    Seller ID represents the seller in EW Zero marketplace`}
              >
                Generator ID
              </Info>
            </TableCell>
            <TableCell className={styles.thCell} align="left">
              <Info
                popoverContent={`Country
                    Location of the device generating the energy and RECs`}
              >
                Country
              </Info>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            borderRadius: '5px',
            backgroundColor: variables.mainBackgroundColor,
          }}
        >
          <TableRow>
            <TableCell className={styles.tbCell}>
              <EthereumAddress shortify clipboard address={sellerId} />
            </TableCell>
            <TableCell className={styles.tbCell}>
              {data.generatorName ?? '-'}
            </TableCell>
            <TableCell className={styles.tbCell}>
              {data.generatorId ?? '-'}
            </TableCell>
            <TableCell className={styles.tbCell}>{data.country}</TableCell>
          </TableRow>
        </TableBody>
        <TableHead>
          <TableRow>
            <TableCell className={styles.thCell} align="left">
              <Info
                popoverContent={`Energy Source
                    Renewable energy source, e.g. wind, hydro, solar, etc.`}
              >
                Energy Source
              </Info>
            </TableCell>
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
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            borderRadius: '5px',
            backgroundColor: variables.mainBackgroundColor,
          }}
        >
          <TableRow>
            <TableCell className={styles.tbCell}>
              <FuelType fuelType={data.energySource as FuelTypeEnum} />
            </TableCell>
            <TableCell className={styles.tbCell}>{recsSold}</TableCell>
            <TableCell className={styles.tbCell}>
              {dayjs(data.generationStart).isValid()
                ? dayjs(data.generationStart).utc().format('YYYY-MM-DD')
                : '-'}{' '}
              /{' '}
              {dayjs(data.generationEnd).isValid()
                ? dayjs(data.generationEnd).utc().format('YYYY-MM-DD')
                : '-'}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default TableListTablet;
