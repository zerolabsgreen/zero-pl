import { variables } from '@energyweb/zero-protocol-labs-theme';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  btn: {
    width: '100%',
    backgroundColor: variables.white,
    color: variables.primaryColor,
    borderRadius: '5px',
    height: '48px',
    fontSize: '16px',
    fontWeight: 700,
    '& .MuiButton-endIcon': {
      color: variables.secondaryColor,
    },
    '&:hover': {
      backgroundColor: variables.secondaryColor,
      color: variables.white,
      '& .MuiButton-endIcon': {
        color: variables.primaryColor,
      },
    },
  },
});
