import { makeStyles } from '@material-ui/styles';
import { variables } from '@energyweb/zero-protocol-labs-theme';

export const useStyles = makeStyles({
  switch: {
    '& .MuiSwitch-thumb': {
      backgroundColor: variables.switchGrayColor,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      '& .MuiSwitch-thumb': {
        backgroundColor: variables.filcoinColor,
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: variables.switchBgColorBlue,
    },
    '& .MuiSwitch-switchBase + .MuiSwitch-track': {
      backgroundColor: variables.switchBgColorGray,
    },
  },
  switchBitcoin: {
    '& .MuiSwitch-thumb': {
      backgroundColor: variables.primaryColor,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      '& .MuiSwitch-thumb': {
        backgroundColor: variables.secondaryColor,
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: variables.secondaryColor,
    },
    '& .MuiSwitch-switchBase + .MuiSwitch-track': {
      backgroundColor: variables.primaryColor,
    },
  },
  lable: {
    fontWeight: 700,
    fontSize: variables.fontSize,
    color: variables.filcoinColor,
  },
  labelDisable: {
    fontWeight: 500,
    fontSize: variables.fontSize,
    color: variables.switchGrayColor,
  },
  lableBitcoin: {
    fontWeight: 700,
    fontSize: variables.fontSize,
    color: variables.primaryColor,
  },
  lableBitcoinDisable: {
    fontWeight: 500,
    fontSize: variables.fontSize,
    color: variables.primaryColor,
  },
});
