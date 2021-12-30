import { variables } from "@energyweb/zero-protocol-labs-theme";
import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  // this is bad, should be using only theme colors in a single class
  inputStyles: {
    fontSize: '18px',
    fontWeight: 600,
  },
  inputFilecoinStyles: {
    fontSize: '18px',
    fontWeight: 600,
    backgroundColor: variables.filcoinColorLight,
    color: variables.filcoinColor,
  },
  paperStyles: {
    fontWeight: 600,
    fontSize: '18px',
    color: variables.primaryColor
  },
  filecoinPaperStyles: {
    fontWeight: 600,
    fontSize: '18px',
    backgroundColor: variables.filcoinBackgroundColor,
    color: variables.filcoinColor
  },
})
