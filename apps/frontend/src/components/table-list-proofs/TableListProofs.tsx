import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import dayjs from 'dayjs';
import { variables } from '@energyweb/zero-protocol-labs-theme';
import { FC } from 'react';
import EthereumAddress from '../ethereum-address/ethereum-address';
import { ReactComponent as TickIcon } from '../../assets/svg/tick.svg';
import clsx from 'clsx';
import { useTableListProofsEffects } from './TableListProofs.effects';
import { useStyles } from './TableListProofs.styles';

interface TableListProofsProps {
  purchaseId: string;
}

export const TableListProofs: FC<TableListProofsProps> = ({ purchaseId }) => {
  const styles = useStyles();
  const { blockchainEvents, isLoading } = useTableListProofsEffects(purchaseId);

  if (isLoading) return <CircularProgress />

  return (
    <Box mb={4}>
      <Box display="flex" alignItems="center">
        <Typography
          mt={'30px'}
          mb={'18px'}
          ml={'12px'}
          fontWeight={700}
          fontSize={'20px'}
          color={variables.primaryColor}
        >
          BLOCKCHAIN PROOFS {'&'} HISTORY
        </Typography>
      </Box>
        <Box className={styles.wrapper}>
          <Table className={styles.table}>
            <TableBody>
              {blockchainEvents ?
              blockchainEvents.map((event) => {
                return (
                  <TableRow
                    key={event.transactionHash}
                    sx={{ backgroundColor: variables.inputBackgroundColor }}
                  >
                      <TableCell className={styles.tbCell}>
                        <span className={styles.startIcon}>
                          <TickIcon />
                        </span>
                        <span className={styles.dateCell}>
                          <span className={styles.thCell}>Date</span>
                          <span>{dayjs(event.timestamp!*1000).format('YYYY.MM.DD')}</span>
                        </span>
                      </TableCell>
                      <TableCell
                        className={clsx(styles.tbCell, styles.nameCell)}
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <span className={styles.nameType}>{event.name}</span>
                      </TableCell>
                      <TableCell
                        className={clsx(styles.tbCell, styles.amountCell)}
                        sx={{ display: 'flex', flexDirection: 'column' }}
                      >
                        <span className={styles.thCell}>Amount</span>
                        <span>{event.recs} RECs</span>
                      </TableCell>
                      <TableCell
                        className={styles.tbCell}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          minWidth: '140px',
                        }}
                      >
                        <span className={clsx(styles.thCell, styles.sellerCell)}>
                          From Address
                        </span>
                        <EthereumAddress shortify clipboard address={event.from ?? ''} />
                      </TableCell>
                      <TableCell
                        className={styles.tbCell}
                        sx={{ display: 'flex', flexDirection: 'column' }}
                      >
                        <span className={styles.thCell}>To Address</span>
                        <EthereumAddress shortify clipboard address={event.to ?? ''} />
                      </TableCell>
                      <TableCell
                        className={styles.tbCell}
                        sx={{ marginRight: '22px' }}
                      >
                        <span>
                          <span className={styles.thCell}>
                            Transaction proof
                          </span>
                          <EthereumAddress shortify clipboard address={event.transactionHash ?? ''} />
                        </span>
                      </TableCell>
                  </TableRow>
                );
              })
              : null}
            </TableBody>
          </Table>
        </Box>
    </Box>
  );
};

export default TableListProofs;
