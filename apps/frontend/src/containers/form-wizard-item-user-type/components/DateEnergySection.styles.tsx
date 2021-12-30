import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  grid: {
    borderRadius: '5px',
    '@media (max-width: 620px)': {
      borderRadius: '0 0 5px 5px',
    },
  },
  gridFilecoin: {
    borderRadius: '5px',
    '@media (max-width: 620px)': {
      marginTop: '8px',
    },
  },
  wrapper: {
    marginBottom: '10px',
  },
  endDate: {
    width: '160px',
    marginLeft: '20px',
    '@media (max-width: 510px)': {
      marginLeft: '2px',
    },
    '@media (max-width: 488px)': {
      marginTop: '10px',
    },
  },
});

export default useStyles;
