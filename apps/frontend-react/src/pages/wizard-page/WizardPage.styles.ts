import { makeStyles } from '@mui/styles';
import { variables } from '@energyweb/zero-protocol-labs-theme';

export const useStyles = makeStyles({
  gridStyle: {
    minHeight: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  wrapper: {
    margin: '70px 0 37px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '@media (max-width: 620px)': {
      margin: '55px 0 49px 0',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '488px',
    '@media (max-width: 620px)': {
      width: '100%',
    },
  },
  downTitle: {
    marginTop: '81px',
    marginBottom: '9px',
    '@media (max-width: 1025px)': {
      marginTop: '98px',
      marginBottom: '43px',
    },
    '@media (max-width: 620px)': {
      marginTop: '72px',
      marginBottom: '34px',
    },
  },
  downText: {
    marginTop: '9px',
    '@media (max-width: 1025px)': {
      marginTop: '43px',
    },
    '@media (max-width: 620px)': {
      marginTop: '34px',
    },
  },
  btn: {
    '& .MuiButton-root': {
      backgroundColor: variables.white,
      color: variables.primaryColor,
      fontSize: '16px',
      fontWeight: 700,
      boxShadow: '0px 4px 10px rgba(160, 154, 198, 0.2);',
      borderRadius: '5px',
    },
    '@media (max-width: 620px)': {
      marginTop: '16px',
    },
  },
  stepLabel: {
    width: '100px',
    '@media (max-width: 620px)': {
      width: '60px',
    },
  },
  step: {
    '& .MuiStepLabel-iconContainer': {
      backgroundColor: 'transparent',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      border: `2px solid ${variables.purpleLight}`,
      '& .Mui-active': {
        color: 'transparent',
      },
      '& .MuiSvgIcon-root': {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
      },
    },
    '& .MuiStepIcon-text': {
      fontSize: '15px',
      fontWeight: 500,
      fill: variables.purpleLight,
    },
    '& .MuiStepLabel-labelContainer': {
      '& .Mui-active': {
        color: variables.purpleLight,
      },
    },
  },
  stepBitcoin: {
    '& .MuiStepLabel-iconContainer': {
      backgroundColor: 'transparent',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      border: `2px solid ${variables.secondaryColor}`,
      '& .Mui-active': {
        color: 'transparent',
      },
      '& .MuiSvgIcon-root': {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
      },
    },
    '& .MuiStepIcon-text': {
      fontSize: '15px',
      fontWeight: 500,
      fill: variables.secondaryColor,
    },
    '& .MuiStepLabel-labelContainer': {
      '& .Mui-active': {
        color: variables.secondaryColor,
      },
    },
  },
  stepInActive: {
    '& .MuiStepLabel-iconContainer': {
      backgroundColor: 'transparent',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      border: `2px solid ${variables.filcoinColor}`,

      '& .MuiSvgIcon-root': {
        '& circle': {
          display: 'none',
        },
        width: '40px',
        height: '40px',
        borderRadius: '50%',
      },
    },
    '& .MuiStepLabel-labelContainer': {
      color: variables.filcoinColor,
    },
    '& .MuiStepIcon-text': {
      fontSize: '15px',
      fontWeight: 500,
      fill: variables.filcoinColor,
    },
    '& .Mui-active': {
      color: variables.filcoinColor,
    },
  },
  stepBitcoinInActive: {
    '& .MuiStepLabel-iconContainer': {
      backgroundColor: 'transparent',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      border: `2px solid ${variables.purpleExtraLight}`,

      '& .MuiSvgIcon-root': {
        '& circle': {
          display: 'none',
        },
        width: '40px',
        height: '40px',
        borderRadius: '50%',
      },
    },
    '& .MuiStepLabel-labelContainer': {
      color: variables.purpleExtraLight,
    },
    '& .MuiStepIcon-text': {
      fontSize: '15px',
      fontWeight: 500,
      fill: variables.purpleExtraLight,
    },
    '& .Mui-active': {
      color: variables.purpleExtraLight,
    },
  },
});
