import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { blockchainEventsMock } from './blockchainEvents';
import TableView from './TableView';
import SankeyView from './SankeyView';

enum ViewModeEnum {
  Table = 'Table',
  Sankey = 'Sankey'
}

export const TableListProofsExample: FC = () => {
  const [viewMode, setViewMode] = useState(ViewModeEnum.Table)
  const toggleTableMode = () => setViewMode(viewMode === ViewModeEnum.Table ? ViewModeEnum.Sankey : ViewModeEnum.Table)
  const btnTitle = `${viewMode === ViewModeEnum.Table ? ViewModeEnum.Sankey : ViewModeEnum.Table} view`

  return (
    <Box mb={4}>
      <Box display="flex" alignItems="center" justifyContent='space-between'>
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
        <Box>
          <SecondaryButton onClick={toggleTableMode}>
            {btnTitle}
          </SecondaryButton>
        </Box>
      </Box>
        {viewMode === ViewModeEnum.Table
          ? <TableView blockchainEvents={blockchainEventsMock} />
          : <SankeyView blockchainEvents={blockchainEventsMock} />
        }
    </Box>
  );
};

const SecondaryButton = styled(Button)(({ theme }) => `
  background-color: ${theme.palette.background.paper};
  color: ${theme.palette.primary.main};
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0px 4px 10px rgba(160, 154, 198, 0.2);
  border-radius: 5px;
  padding: 14px 16px;
  font-size: 16px;
  font-weight: 700;
  line-height: 14px;
  margin-right: 20px;
  &:hover {
    background-color: ${theme.palette.secondary.main};
    color: ${theme.palette.background.paper};
    & path {
      fill: ${theme.palette.primary.main}
    }
  }
`)
