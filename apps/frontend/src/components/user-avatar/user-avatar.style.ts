import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  name: {
    fontSize: 18,
    lineHeight: '23px',
    color: theme.palette.secondary.main,
    marginBottom: 3,
  },
  text: {
    fontSize: 12,
    lineHeight: '15px',
    color: theme.palette.background.default,
  },
}));
