import type { FC } from 'react';
import dayjs from 'dayjs';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { styled, useTheme } from '@mui/material/styles';
import EthereumAddress from '../EthereumAddress';
import { BlockchainEventIcons } from '../BlockchainEventIcons';
import { useTableListProofsEffects } from './effects';
import { formatBlockchainEvents } from '../../utils/formatters';
import { BigNumber } from 'ethers';

interface TableListProofsProps {
  purchaseId?: string;
}

export const TableListProofs: FC<TableListProofsProps> = ({ purchaseId = '' }) => {
  const theme = useTheme();
  const { blockchainEvents, isLoading } = useTableListProofsEffects(purchaseId);

  const formattedBlockchainEvents = formatBlockchainEvents(blockchainEvents ?? []);

  console.log({
    formattedBlockchainEvents
  });

  if (isLoading) {
    return (
      <Box width="100%" my="20px" display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    )
  };

  return (
    <Box mb={4}>
      {formattedBlockchainEvents.length > 0 &&
      <Box display="flex" alignItems="center">
        <Typography
          mt={'30px'}
          mb={'18px'}
          ml={'12px'}
          fontWeight={700}
          fontSize={'20px'}
          color={'primary'}
        >
          BLOCKCHAIN PROOFS {'&'} HISTORY
        </Typography>
      </Box>}
        <TableWrapper>
          <StyledTable>
            <TableBody>
              {formattedBlockchainEvents.length > 0 ?
              formattedBlockchainEvents.map((event) => {
                return (
                  <TableRow
                    key={event.txHash}
                    sx={{ backgroundColor: '#F6F3F9' }}
                  >
                      <StyledTableCell>
                        <span style={{ marginLeft: '20px', marginRight: '30px' }}>
                          <StyledThCell>Date</StyledThCell>
                          <span>{dayjs(event.timestamp!*1000).format('YYYY.MM.DD')}</span>
                        </span>
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          color: theme.palette.secondary.main,
                          fontWeight: 700,
                          marginLeft: '10px'
                        }}
                      >
                        <BlockchainEventIcons event={event.name} />
                        <span style={{
                          color: theme.palette.secondary.main,
                          fontWeight: 700,
                          marginLeft: '10px'
                        }}
                        >{event.name}</span>
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '130px'
                        }}
                      >
                        <StyledThCell>Amount</StyledThCell>
                        <span>{BigNumber.from(event.recs).div(1e6).toString()} RECs</span>
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          minWidth: '140px',
                        }}
                      >
                        <StyledThCell sx={{ width: '130px' }}>
                          From Address
                        </StyledThCell>
                        <EthereumAddress shortify address={event.from ?? ''} />
                      </StyledTableCell>
                      <StyledTableCell sx={{ display: 'flex', flexDirection: 'column' }}>
                        <StyledThCell>To Address</StyledThCell>
                        <EthereumAddress shortify address={event.to ?? ''} />
                      </StyledTableCell>
                      <StyledTableCell sx={{ marginRight: '22px' }}>
                        <span>
                          <StyledThCell>
                            Transaction proof
                          </StyledThCell>
                          <EthereumAddress shortify visibility address={event.txHash ?? ''} />
                        </span>
                      </StyledTableCell>
                  </TableRow>
                );
              })
              : null}
            </TableBody>
          </StyledTable>
        </TableWrapper>
    </Box>
  );
};

export default TableListProofs;

const TableWrapper = styled(Box)(({ theme }) => `
  border-radius: 5px;
  padding: 0 16px;
  background-color: ${theme.palette.background.paper};
  & .MuiTableRow-root {
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  };
`);

const StyledTable = styled(Table)`
  border-collapse: separate;
  border-spacing: 0px 16px;
`;

const StyledTableCell = styled(TableCell)(({ theme }) => `
  color: ${theme.palette.primary.main};
  font-weight: 600;
  font-size: 20px;
  border: none;
  display: flex;
`)

const StyledThCell = styled('span')`
  display: flex;
  font-weight: 500;
  font-size: 14px;
`
