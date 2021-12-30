import { makeStyles } from '@material-ui/styles';
import { variables } from '@energyweb/zero-protocol-labs-theme';

export const useStyles = makeStyles({
  card: {
    maxWidth: 280,
    position: 'absolute',
    top: 80,
    right: 80,
    padding: '32px 24px 31px 24px',
    backgroundColor: variables.bodyBackgroundColor,
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(160, 154, 198, 0.2)',
  },
  button: {
    '&:hover': {
      backgroundColor: 'unset',
    },
    color: variables.purpleLight,
    padding: 0,
    fontSize: variables.fontSize,
    fontWeight: 600,
  },
  cardActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 0,
  },
  listItem: {
    padding: '0',
    display: 'flex',
    alignItems: 'flex-start',
  },
  listItemText: {
    '& > span': {
      color: variables.black,
    },
    margin: 0,
  },
});
