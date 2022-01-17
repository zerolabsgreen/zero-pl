import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { TbCell, ThCell } from '../styled';
import type { TGenericTable } from '../types';
import InfoPopover from '../../InfoPopover';

dayjs.extend(utc);

const TableDesktop: TGenericTable = ({ headers, data }) => {
  const theme = useTheme();
  const headersKeys = Object.keys(headers);
  return (
    <Box
      boxShadow={'none'}
      borderRadius={'5px'}
      bgcolor={theme.palette.background.default}
      mb={2}
      p={2}
      pt={0}
    >
      <Table sx={{ borderSpacing: '0 10px', borderCollapse: 'separate' }}>
        <TableHead>
          <TableRow>
            {headersKeys.map((key) => headers[key].infoText
            ? (
              <ThCell key={`table-head-cell-${key}`}>
                <InfoPopover popoverContent={headers[key].infoText}>
                  {headers[key].label}
                </InfoPopover>
              </ThCell>
            ) : (
              <ThCell key={`table-head-cell-${key}`}>
                {headers[key].label}
              </ThCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={`row-${row.id}`} sx={{ borderRadius: '5px', backgroundColor: '#fff' }}>
              {headersKeys.map(header => (
                <TbCell key={`row-${row.id}-cell-${header}`}>
                  {row[header]}
                </TbCell>
              ))}
            </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default TableDesktop;
