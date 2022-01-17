
import Box from '@mui/material/Box';
import useTheme from '@mui/material/styles/useTheme';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { InfoPopover } from '../../InfoPopover';
import { TbCell, ThCell } from '../styled';
import { TGenericTable } from '../types';

dayjs.extend(utc);

export const TableTablet: TGenericTable = ({ headers, data }) => {
  const theme = useTheme();
  const headersKeys = Object.keys(headers);

  const firstHeaderRow = headersKeys.slice(0, 4);
  const secondHeaderRow = headersKeys.slice(4, 8);
  const thirdHeaderRow = headersKeys.slice(8, 12);

  if (secondHeaderRow.length < 4 && secondHeaderRow.length > 1) {
    const iterations = 4 - secondHeaderRow.length;
    for (let i = 0; i < iterations; i++) {
      secondHeaderRow.push('additional')
    }
  }

  if (thirdHeaderRow.length < 4 && thirdHeaderRow.length > 1) {
    const iterations = 4 - thirdHeaderRow.length;
    for (let i = 0; i < iterations; i++) {
      thirdHeaderRow.push('additional')
    }
  }

  return (
    <>
    {data.map((row) => {
      return (
      <Box
        key={`table-wrapper-${row.id}`}
        boxShadow={'none'}
        borderRadius={'5px'}
        bgcolor={theme.palette.background.default}
        mb={2}
        p={2}
        pt={0}
      >
      <Table>
        <TableHead>
          <TableRow>
          {firstHeaderRow.map((key) => headers[key].infoText
            ? (
              <ThCell key={`first-table-head-cell-${key}-row-${row.id}`}>
                <InfoPopover popoverContent={headers[key].infoText}>
                  {headers[key].label}
                </InfoPopover>
              </ThCell>
            ) : (
              <ThCell key={`first-table-head-cell-${key}-row-${row.id}`}>
                {headers[key].label}
              </ThCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            borderRadius: '5px',
            backgroundColor: theme.palette.background.paper
          }}
        >
          <TableRow key={`first-row-${row.id}`}>
            {firstHeaderRow.map(header => (
              <TbCell key={`first-row-${row.id}-cell-${header}`}>
                {row[header]}
              </TbCell>
            ))}
          </TableRow>
        </TableBody>
        {secondHeaderRow.length > 0 &&
        <TableHead>
          <TableRow>
          {secondHeaderRow.map((key) => headers[key]?.infoText
            ? (
              <ThCell key={`second-table-head-cell-${key}-row-${row.id}`}>
                <InfoPopover popoverContent={headers[key].infoText}>
                  {headers[key].label}
                </InfoPopover>
              </ThCell>
            ) : (
              <ThCell key={`second-table-head-cell-${key}-row-${row.id}`}>
                {headers[key]?.label ?? ''}
              </ThCell>
            ))}
          </TableRow>
        </TableHead>}
        {secondHeaderRow.length > 0 &&
        <TableBody
          sx={{
            borderRadius: '5px',
            backgroundColor: theme.palette.background.paper
          }}
        >
          <TableRow key={`second-row-${row.id}`}>
            {secondHeaderRow.map(header => header === 'additional'
            ? (<TbCell key={`second-row-${row.id}-cell-${header}`}></TbCell>)
            : (
              <TbCell key={`second-row-${row.id}-cell-${header}`}>
                {row[header]}
              </TbCell>
            ))}
          </TableRow>
        </TableBody>}
        {thirdHeaderRow.length > 0 &&
        <TableHead>
          <TableRow>
          {thirdHeaderRow.map((key) => headers[key]?.infoText
            ? (
              <ThCell key={`second-table-head-cell-${key}-row-${row.id}`}>
                <InfoPopover popoverContent={headers[key].infoText}>
                  {headers[key].label}
                </InfoPopover>
              </ThCell>
            ) : (
              <ThCell key={`second-table-head-cell-${key}-row-${row.id}`}>
                {headers[key]?.label ?? ''}
              </ThCell>
            ))}
          </TableRow>
        </TableHead>}
        {thirdHeaderRow.length > 0 &&
        <TableBody
          sx={{
            borderRadius: '5px',
            backgroundColor: theme.palette.background.paper
          }}
        >
          <TableRow key={`second-row-${row.id}`}>
            {thirdHeaderRow.map(header => header === 'additional'
            ? (<TbCell key={`second-row-${row.id}-cell-${header}`}></TbCell>)
            : (
              <TbCell key={`second-row-${row.id}-cell-${header}`}>
                {row[header]}
              </TbCell>
            ))}
          </TableRow>
        </TableBody>}
      </Table>
    </Box>)})}
    </>
  );
};

export default TableTablet;
