import { makeStyles } from '@material-ui/styles';
import { variables } from '@energyweb/zero-protocol-labs-theme';

export const useStyles = makeStyles({
  footer: {
    backgroundColor: variables.primaryColorDark,
    display: 'flex',
    alignItems: 'center',
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
    color: variables.purpleFooterText,
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
});
