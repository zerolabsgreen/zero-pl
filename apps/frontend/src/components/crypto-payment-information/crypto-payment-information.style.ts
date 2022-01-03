import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: 272,
    backgroundColor: theme.palette.background.default,
    borderRadius: 10,
    padding: '16px 24px 16px',
    [theme.breakpoints.down('md')]: {
      padding: 24,
      minHeight: 'initial',
    },
  },
  item: {
    padding: '8px 0',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '4px 0',
    },
  },
  label: {
    fontSize: 14,
    lineHeight: '16px',
    fontWeight: 500,
    color: theme.palette.primary.main,
  },
  value: {
    fontSize: 20,
    lineHeight: '24px',
    fontWeight: 600,
    color: theme.palette.primary.main,
    '& span': {
      lineHeight: '32px',
    },
  },
}));
