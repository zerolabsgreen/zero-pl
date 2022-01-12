import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '36px 72px 37px 72px',
    '@media (max-width: 960px)': {
      flexDirection: 'column',
    },
  },
  link: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 700,
    color: theme.palette.text.primary,
    textDecoration: 'none',
    cursor: 'pointer',
  },
  policy: {
    display: 'flex',
    '@media (max-width: 960px)': {
      marginTop: '17px',
      display: 'flex',
      flexDirection: 'column',
    },
  },
}));
