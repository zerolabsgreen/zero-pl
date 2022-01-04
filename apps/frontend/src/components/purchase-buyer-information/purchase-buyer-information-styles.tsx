import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  flexColumn: {
    '@media (max-width: 900px)': {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  margin: {
    '@media (max-width: 1082px)': {
      marginLeft: '10px',
    },
    '@media (max-width: 1024px)': {
      marginLeft: '0',
    },
  },
  fieldLab: {
    '@media (max-width: 1027px)': {
      marginBottom: '0',
    },
  },
  box: {
    '@media (max-width: 1027px)': {
      marginBottom: '12px',
    },
  },
});
