import { variables } from '@energyweb/zero-protocol-labs-theme';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles<Theme, { isFilecoin: boolean }>(
  (theme) => ({
    wrapper: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '50%',
      bgcolor: 'background.paper',
      boxShadow: '24px',
      padding: 20,
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        width: '80%',
      },
    },
    button: {
      color: variables.mainBackgroundColor,
      backgroundColor: ({ isFilecoin }) =>
        isFilecoin ? variables.filcoinColor : undefined,
      '&:hover': {
        backgroundColor: ({ isFilecoin }) =>
          isFilecoin ? variables.filcoinColorLight : variables.secondaryColor,
        color: ({ isFilecoin }) =>
          isFilecoin ? variables.filcoinColor : undefined,
      },
    },
    buttonCancel: {
      marginRight: '15px',
      '@media (max-width: 403px)': {
        marginRight: '0',
        marginBottom: '5px',
      },
    },
    buttonGroup: {
      marginTop: '20px',
      '@media (max-width: 403px)': {
        display: 'flex',
        flexDirection: 'column',
      },
    },
  })
);
