import { makeStyles } from '@material-ui/styles';
import { variables } from '@energyweb/zero-protocol-labs-theme';
import ImgWelcome from '../../assets/svg/welcome-bg.svg';

export const useStyles = makeStyles({
  wrapper: {
    backgroundColor: variables.primaryColor,
  },
  welcomeBlock: {
    padding: '0 41px 0 40px',
    backgroundImage: `url("${ImgWelcome}")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'round',
    '@media (max-width: 630px)': {
      padding: '0 8px',
    },
  },
  formBlock: {
    backgroundColor: variables.white,
    padding: '32px 31px 32px 32px',
    width: '100%',
    flexDirection: 'unset',
    boxShadow: '0px 0px 10px rgba(112, 60, 187, 0.2)',
    borderRadius: '5px',
    '@media (max-width: 630px)': {
      padding: '15px 8px',
    },
    '& .MuiOutlinedInput-root': {
      height: '48px',
      borderRadius: '5px',
      '& .MuiSelect-select': {
        borderRadius: '5px',
        padding: '12px 0 12px 14px',
      },
    },
    '& .MuiSvgIcon-root': {
      marginRight: '20px',
    },
  },
  flexColumn: {
    '@media (max-width: 630px)': {
      flexDirection: 'column',
    },
  },
  prodBlock: {
    '@media (max-width: 910px)': {
      flexDirection: 'column',
    },
  },
  menuItem: {
    fontSize: '16px',
    fontWeight: 600,
    backgroundColor: variables.white,
    paddingLeft: '20px',
    '&:hover': {
      backgroundColor: variables.primaryColor,
      fontWeight: 700,
      color: variables.white,
    },
  },
  dateBlock: {
    '& .MuiFormControl-root': {
      '& .MuiOutlinedInput-root': {
        borderRadius: '5px',
      },
      width: '100%',
    },
    '@media (max-width: 910px)': {
      flexDirection: 'column',
    },
  },
  input: {
    '& input::placeholder': {
      fontSize: '18px',
      fontWeight: 600,
    },
  },
  amountSpan: {
    fontSize: '18px',
    fontWeight: 600,
  },
  tabsSection: {
    padding: '120px 40px 0 40px',
    '@media (max-width: 630px)': {
      padding: '115px 16px 0 16px',
    },
  },
  questionSectionWrapper: {
    padding: '122px 41px 0 40px',
    '@media (max-width: 630px)': {
      padding: '100px 8px 13px 8px',
    },
  },
  questionSection: {
    width: '60%',
    '@media (max-width: 1200px)': {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
    },
    '@media (max-width: 630px)': {
      flexDirection: 'column',
      alignItems: 'center',
      '& > div:not(:last-of-type)': {
        marginBottom: '40px',
      },
    },
  },
  advisorsSection: {
    padding: '95px 41px 30px 40px',
    '@media (max-width: 980px)': {
      padding: '39px 41px 13px 40px',
    },
  },
});
