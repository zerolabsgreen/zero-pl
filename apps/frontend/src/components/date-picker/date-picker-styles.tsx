import { makeStyles } from '@material-ui/styles';
import { variables } from '@energyweb/zero-protocol-labs-theme';

export const useStyles = makeStyles({
  inputLight: {
    backgroundColor: variables.filcoinColorLight,
    color: variables.filcoinColor,
    fontSize: '18px',
    fontWeight: 700,
    height: '48px',
  },
  inputDark: {
    backgroundColor: variables.filcoinColor,
    color: variables.white,
    fontSize: '18px',
    fontWeight: 700,
    height: '48px',
    border: '1px solid #fff',
  },
  inputLightBitcoin: {
    backgroundColor: variables.white,
    color: variables.primaryColor,
    fontSize: '18px',
    fontWeight: 700,
    height: '48px',
  },
  inputDarkBitcoin: {
    backgroundColor: variables.inputBackgroundColor,
    color: variables.primaryColor,
    fontSize: '18px',
    fontWeight: 700,
    height: '48px',
    border: '1px solid #fff',
  },
});

export default useStyles;
