import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { variables } from '@energyweb/zero-protocol-labs-theme';

export const useStyles = makeStyles<Theme, { isFilecoin: boolean }>({
    menuItem: {
      fontSize: '16px',
      fontWeight: 600,
      backgroundColor: variables.white,
      paddingLeft: '20px',
      '&:hover': {
        backgroundColor: ({ isFilecoin }) => isFilecoin ? variables.white : variables.primaryColor,
        color: ({ isFilecoin }) => isFilecoin ? variables.filcoinColor : variables.white,
        fontWeight: 700
      },
      '&.Mui-selected': {
        backgroundColor: 'none',
        '&:hover': {
          backgroundColor: ({ isFilecoin }) => isFilecoin ? variables.white : variables.primaryColor,
        }
      }
    }
});
