import type { FC } from 'react';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { styled, useTheme } from '@mui/material/styles';
import { EthereumAddress } from '../../../components/EthereumAddress';
import { BlockchainEventIcons } from '../../../components/BlockchainEventIcons';
import { blockchainEventsMock } from './blockchainEvents';
import { formatBlockchainEvents } from '../../../utils/formatters';

export const TableListProofsExample: FC = () => {
  const theme = useTheme();

  const formattedBlockchainEvents = formatBlockchainEvents(blockchainEventsMock);

  return (
    <Box mb={4}>
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
      </Box>
        <TableWrapper>
          <StyledTable>
            <TableBody>
              {formattedBlockchainEvents.map(event => (
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
                        <span>{event.recs} RECs</span>
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
                        <EthereumAddress popover shortify address={event.from ?? ''} />
                      </StyledTableCell>
                      <StyledTableCell sx={{ display: 'flex', flexDirection: 'column' }}>
                        <StyledThCell>To Address</StyledThCell>
                        <EthereumAddress popover shortify address={event.to ?? ''} />
                      </StyledTableCell>
                      <StyledTableCell sx={{ marginRight: '22px' }}>
                        <span>
                          <StyledThCell>
                            Transaction proof
                          </StyledThCell>
                          <EthereumAddress shortify visibility address={event.txHash ?? ''} />
                        </span>
                      </StyledTableCell>
                  </TableRow>))}
            </TableBody>
          </StyledTable>
        </TableWrapper>
    </Box>
  );
};

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
