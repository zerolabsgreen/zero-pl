import { makeStyles } from '@material-ui/styles';
import { variables } from '@energyweb/zero-protocol-labs-theme';

export const useStyles = makeStyles({
  grid: {
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    '@media (max-width: 1024px)': {
      justifyContent: 'center',
    },
  },
  buttonBitcoin: {
    backgroundColor: variables.white,
    boxShadow: '0px 4px 10px rgba(160, 154, 198, 0.2)',
    border: 'none',
    borderRadius: '5px',
    color: variables.primaryColor,
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: 700,
    padding: '14px 21px',
    '&:hover': {
      backgroundColor: variables.white,
    },
    '@media (max-width: 1024px)': {
      marginTop: '109px',
    },
    '@media (max-width: 620px)': {
      marginTop: '32px',
    },
  },
  buttonFilecoin: {
    backgroundColor: variables.white,
    boxShadow: '0px 4px 10px rgba(160, 154, 198, 0.2)',
    border: 'none',
    borderRadius: '5px',
    color: variables.black,
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: 700,
    padding: '14px 21px',
    '&:hover': {
      backgroundColor: variables.white,
    },
    '@media (max-width: 1024px)': {
      marginTop: '109px',
    },
    '@media (max-width: 620px)': {
      marginTop: '32px',
    },
  },
});
