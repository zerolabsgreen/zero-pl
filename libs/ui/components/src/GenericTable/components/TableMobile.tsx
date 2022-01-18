import { Box, Table, TableBody, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import InfoPopover from '../../InfoPopover';

import { SmallScreenTableRow, TbCell, ThCell } from '../styled';
import { TGenericTable } from '../types';

dayjs.extend(utc);

const TableMobile: TGenericTable = ({ headers, data }) => {
  const theme = useTheme();
  const headersKeys = Object.keys(headers);
  return (
    <>
    {data.map((row) => (
    <Box
      key={`table-wrapper-${row.id}`}
      boxShadow={'none'}
      borderRadius={'5px'}
      bgcolor={theme.palette.background.default}
      mb={2}
      p={'16px 16px'}
      className="MobileList"
    >
      <Table sx={{ backgroundColor: theme.palette.background.paper }}>
        <TableBody>
          {headersKeys.map((key) => (
          <SmallScreenTableRow key={`table-${row.id}-row-${key}`}>
            {headers[key].infoText
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
            )}
            <TbCell>
              {row[key]}
            </TbCell>
          </SmallScreenTableRow>
          ))}
        </TableBody>
      </Table>
    </Box>))}
    </>
  );
};

export default TableMobile;
