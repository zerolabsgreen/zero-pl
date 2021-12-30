import { makeStyles } from '@material-ui/styles';
import { variables } from '@energyweb/zero-protocol-labs-theme';

export const useStyles = makeStyles((theme) => ({
  switchWrapper: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      marginTop: -11,
      flexDirection: 'column',
    },
  },
  switch: {
    '& span': {
      lineHeight: '16px',
      fontWeight: 500,
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: variables.purpleExtraLight,
    },
    '& .MuiSwitch-switchBase + .MuiSwitch-track': {
      backgroundColor: variables.purpleExtraLight,
    },
  },
}));
