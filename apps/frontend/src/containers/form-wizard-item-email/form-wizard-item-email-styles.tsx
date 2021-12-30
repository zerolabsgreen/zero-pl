import { makeStyles } from '@material-ui/styles';
import { variables } from '@energyweb/zero-protocol-labs-theme';

export const useStyles = makeStyles({
  form: {
    width: '488px',
    '@media (max-width: 620px)': {
      width: '100%',
    },
  },
  title: {
    fontSize: '12px',
    fontWeight: 500,
  },
  inputProps: {
    backgroundColor: variables.white,
    borderRadius: '5px',
    color: variables.filcoinColor,
    fontSize: '18px',
    fontWeight: 700,
    padding: '14px',
    boxShadow: '0px 4px 10px rgba(160, 154, 198, 0.2)',
  },
  inputBitcoinProps: {
    backgroundColor: variables.inputBackgroundColor,
    borderRadius: '5px',
    color: variables.primaryColor,
    fontSize: '18px',
    fontWeight: 700,
    padding: '14px',
    boxShadow: '0px 4px 10px rgba(160, 154, 198, 0.2)',
  },
});

export default useStyles;
