import { makeStyles } from '@material-ui/styles';
import { variables } from '@energyweb/zero-protocol-labs-theme';

const mobResp = window.innerWidth < 630;

export const useStyles = makeStyles({
  tab: {
    marginRight: '32px',
    border: `1px solid ${variables.secondaryColor}`,
    boxShadow: '0px 4px 10px rgba(160, 154, 198, 0.2)',
    borderRadius: '10px',
    padding: '32px 14px 0 15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  tabs: {
    '& .MuiTabs-indicator ': {
      backgroundColor: 'transparent',
    },
    '& .MuiTabScrollButton-root:first-of-type': {
      position: 'absolute',
      top: `${mobResp ? '50px' : '0'}`,
      width: '50px',
      height: '50px',
      zIndex: '9999',
      right: `${mobResp ? '55%' : '105px'}`,
      '& .MuiSvgIcon-root ': {
        fill: variables.secondaryColor,
      },
    },
    '& .MuiTabScrollButton-root:last-of-type': {
      position: 'absolute',
      right: `${mobResp ? '40%' : '55px'}`,
      top: `${mobResp ? '50px' : '0'}`,
      width: '50px',
      height: '50px',
      zIndex: '9999',
      '& .MuiSvgIcon-root ': {
        fill: variables.secondaryColor,
      },
    },
  },
  title: {
    '@media (max-width: 630px)': {
      marginLeft: '0',
      marginBottom: '20px',
    },
  },
  btnGroup: {
    marginRight: '55px',
    '@media (max-width: 630px)': {
      marginRight: '0',
    },
  },
  btn: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  },
  wrapper: {
    '& .Mui-disabled': {
      backgroundColor: 'transparent',
    },
    marginBottom: '64px',
    '@media (max-width: 630px)': {
      flexDirection: 'column',
      marginBottom: '30px',
    },
  },
});

export default useStyles;
