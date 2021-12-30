import { makeStyles } from '@material-ui/styles';
import { variables } from '@energyweb/zero-protocol-labs-theme';

export const useStyles = makeStyles(() => {
  return {
    menuItemStyles: {
      fontSize: '16px',
      fontWeight: 600,
      backgroundColor: variables.white,
      paddingLeft: '20px',
      '&:hover': {
        backgroundColor: variables.primaryColor,
        color: variables.white,
      },
    },
    menuItemStylesFilecoin: {
      fontSize: '16px',
      fontWeight: 600,
      backgroundColor: variables.white,
      paddingLeft: '20px',
      color: variables.filcoinText,
      '&:hover': {
        backgroundColor: variables.filcoinColorLight,
        color: variables.filcoinColor,
        fontWeight: 700,
      },
    },
    input: {
      backgroundColor: variables.filcoinColorLight,
      color: variables.filcoinColor,
      fontSize: '18px',
      fontWeight: 700,
      '& input': {
        padding: '12px 13px',
      },
    },
    inputBitcoun: {
      backgroundColor: variables.inputBackgroundColor,
      color: variables.primaryColor,
      fontSize: '18px',
      fontWeight: 700,
      '& input': {
        padding: '12px 13px',
      },
    },
    form: {
      backgroundColor: variables.white,
      boxShadow: '0px 4px 10px rgba(160, 154, 198, 0.2)',
      borderRadius: '5px',
      marginTop: '8px',
      width: '488px',
      '@media (max-width: 620px)': {
        width: '100%',
      },
    },
    buttonStyle: {
      minWidth: '48px',
      minHeight: '48px',
      borderRadius: '5px',
      backgroundColor: variables.filcoinColor,
      '&:hover': {
        backgroundColor: variables.filcoinColor,
      },
      '@media (max-width: 620px)': {
        width: '100%',
      },
    },
    buttonGreenStyle: {
      minWidth: '48px',
      minHeight: '48px',
      borderRadius: '5px',
      backgroundColor: variables.secondaryColor,
      '&:hover': {
        backgroundColor: variables.secondaryColor,
      },
      '@media (max-width: 620px)': {
        width: '100%',
      },
    },
    icon: {
      transform: 'rotate(180deg)',
    },
    wrapperDate: {
      display: 'flex',
      marginTop: '24px',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      '@media (max-width: 620px)': {
        flexDirection: 'column',
        marginTop: '16px',
      },
    },
    blockDate: {
      width: '192px',
      '@media (max-width: 620px)': {
        width: '100%',
        marginBottom: '16px',
      },
    },
    blockBtn: {
      '@media (max-width: 620px)': {
        display:'none',
      },
    },
    sectionBtn:{
      display: 'none',
      '@media (max-width: 620px)': {
        display:'block',
      },
    }
  };
});

export default useStyles;
