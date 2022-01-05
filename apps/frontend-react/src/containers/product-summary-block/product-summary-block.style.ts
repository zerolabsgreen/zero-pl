import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.primary.dark,
    padding: '16px 8px 8px',
    borderRadius: 10,
    marginTop: 8,
  },
  paperInner: {
    backgroundColor: theme.palette.background.default,
    padding: '16px 24px',
    borderRadius: 10,
    [theme.breakpoints.down('lg')]: {
      padding: '16px 24px',
    },
    [theme.breakpoints.down('md')]: {
      padding: 0,
      backgroundColor: 'transparent',
    },
  },
  grid: {
    padding: '8px 0',
    backgroundColor: theme.palette.background.default,
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      borderRadius: 10,
      marginBottom: 8,
      padding: '16px 16px 8px 16px',
      alignItems: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  gridItem: {
    [theme.breakpoints.down('md')]: {
      marginBottom: 8,
      maxWidth: 350,
      width: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  title: {
    fontSize: 20,
    lineHeight: '24px',
    color: theme.palette.common.white,
    fontWeight: 700,
    marginBottom: 16,
    marginLeft: 16,
  },
  item: {
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  label: {
    fontSize: 14,
    lineHeight: '16px',
    fontWeight: 600,
    color: theme.palette.primary.main,
    flexGrow: 1,
    [theme.breakpoints.down('lg')]: {
      maxWidth: 63,
    },
    [theme.breakpoints.down('md')]: {
      minWidth: 63,
    },
  },
  value: {
    fontSize: 18,
    lineHeight: '23px',
    fontWeight: 700,
    color: theme.palette.primary.light,
    borderRadius: 5,
  },
  valueWrapper: {
    marginLeft: 20,
    backgroundColor: theme.palette.background.paper,
    padding: '12px 20px',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      width: 158,
      justifyContent: 'space-between',
    },
    '& .MuiSvgIcon-root': {
      marginLeft: 9,
      '& path': {
        fill: theme.palette.primary.light,
      },
    },
  },
  arrow: {
    fontSize: 13,
    '& path': {
      fill: theme.palette.secondary.main,
    },
  },
  button: {
    width: 24,
    height: 24,
    marginRight: 16,
    transform: 'rotate(-180deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    [theme.breakpoints.down('md')]: {
      visibility: 'hidden',
    },
  },
  expanded: {
    transform: 'rotate(0deg)',
  },
}));
