import { makeStyles } from '@material-ui/styles';
import { variables } from '@energyweb/zero-protocol-labs-theme';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme, { isFilecoin: boolean }>({
  wrapper: {
    '@media (max-width: 620px)': {
      '& .MuiFormControl-root': {
        width: '100%',
      },
    },
  },
  menuItem: {
    fontSize: '16px',
    fontWeight: 600,
    backgroundColor: variables.white,
    paddingLeft: '20px',
    color: ({ isFilecoin }) => isFilecoin ? variables.filcoinText : undefined,
    '&:hover': {
      backgroundColor: ({ isFilecoin }) => isFilecoin ? variables.filcoinColorLight : variables.primaryColor,
      color: ({ isFilecoin }) => isFilecoin ? variables.filcoinColor : variables.white,
      fontWeight: 700,
    },
  },
  buttonAddStyle: {
    backgroundColor: variables.white,
    marginTop: '8px',
    minWidth: '488px',
    fontSize: '16px',
    minHeight: '48px',
    fontWeight: 700,
    color: variables.filcoinColor,
    borderRadius: '5px',
    boxShadow: '0px 4px 10px rgba(160, 154, 198, 0.2)',
    '&:hover': {
      backgroundColor: variables.white,
    },
    '@media (max-width: 620px)': {
      minWidth: '100%',
    },
  },
  buttonGreenAddStyle: {
    backgroundColor: variables.white,
    marginTop: '8px',
    minWidth: '488px',
    fontSize: '16px',
    minHeight: '48px',
    fontWeight: 700,
    color: variables.secondaryColor,
    borderRadius: '5px',
    boxShadow: '0px 4px 10px rgba(160, 154, 198, 0.2)',
    '&:hover': {
      backgroundColor: variables.white,
    },
    '@media (max-width: 620px)': {
      minWidth: '100%',
    },
  },
});
