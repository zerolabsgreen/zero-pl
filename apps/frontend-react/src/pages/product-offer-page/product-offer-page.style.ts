import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: 72,
    padding: '0 24px 32px 24px',
    [theme.breakpoints.down('md')]: {
      padding: '0 16px 32px 16px',
    },
  },
  stripWrapper: {
    position: 'absolute',
    width: '100%',
    left: 0,
  },
  buttonsGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 16,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  endIcon: {
    marginLeft: 16,
  },
}));
