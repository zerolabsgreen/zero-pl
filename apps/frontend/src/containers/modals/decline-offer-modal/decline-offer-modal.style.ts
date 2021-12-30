import { makeStyles } from '@material-ui/styles';
import { variables } from '@energyweb/zero-protocol-labs-theme';

export const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    maxWidth: 528,
    padding: '24px 24px 32px 32px',
    borderRadius: 5,
    boxShadow: 'none',
    [theme.breakpoints.down('md')]: {
      margin: 16,
      padding: 16,
    },
  },
  title: {
    color: theme.palette.error.main,
    fontSize: 20,
    lineHeight: '24px',
    fontWeight: 700,
    textAlign: 'center',
    padding: '8px 24px 8px 32px',
  },
  contentText: {
    color: theme.palette.primary.main,
    fontSize: 16,
    lineHeight: '21px',
    fontWeight: 700,
    textAlign: 'center',
  },
  content: {
    padding: '0 0 8px 0',
  },
  form: {
    marginTop: 24,
  },
  label: {
    fontSize: 14,
    lineHeight: '16px',
    fontWeight: 600,
    color: variables.graphite,
    marginLeft: 16,
  },
  textField: {
    marginTop: 8,
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  icon: {
    '& svg path': {
      fill: theme.palette.secondary.main,
    },
  },
  button: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));
