import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material';
import { variables } from '@energyweb/zero-protocol-labs-theme';

export const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: '24px 24px 20px 24px',
    borderRadius: 10,
    boxShadow: `0px 4px 10px ${alpha(variables.boxShadowColor, 0.2)}`,
    marginTop: 16,
    [theme.breakpoints.down('md')]: {
      padding: '24px 24px 29px 24px',
    },
  },
  formPaper: {
    backgroundColor: theme.palette.background.paper,
    padding: '40px 30px 48px 48px',
    borderRadius: 10,
    boxShadow: `0px 4px 10px ${alpha(variables.boxShadowColor, 0.2)}`,
    marginTop: 8,
    [theme.breakpoints.down('lg')]: {
      padding: '48px 16px',
    },
    [theme.breakpoints.down('md')]: {
      marginTop: 16,
      padding: 16,
    },
  },
  title: {
    fontSize: 20,
    lineHeight: '24px',
    fontWeight: 700,
    color: theme.palette.primary.light,
    marginBottom: 24,
  },
  list: {
    margin: 0,
    paddingLeft: 30,
    [theme.breakpoints.down('md')]: {
      paddingLeft: 28,
    },
    '& a': {
      color: theme.palette.primary.light,
      textDecoration: 'none',
    },
    '& li': {
      fontSize: 18,
      lineHeight: '23px',
      fontWeight: 600,
      color: theme.palette.primary.main,
    },
  },
  subTitle: {
    fontSize: 18,
    lineHeight: '23px',
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  buttonsGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 24,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
      marginTop: 16,
    },
  },
  button: {
    [theme.breakpoints.down('md')]: {
      margin: '0 0 8px',
    },
  },
  endIcon: {
    marginLeft: 16,
  },
}));
