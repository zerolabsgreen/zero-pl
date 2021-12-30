import { makeStyles } from '@material-ui/styles';
import { alpha } from '@material-ui/core';
import { variables } from '@energyweb/zero-protocol-labs-theme';

export const useStyles = makeStyles((theme) => ({
  sectionPaper: {
    backgroundColor: theme.palette.primary.dark,
    padding: '16px 23px 43px 23px',
    boxShadow: `0px 4px 10px ${alpha(variables.boxShadowColor, 0.2)}`,
    [theme.breakpoints.down('md')]: {
      padding: '16px 25px 43px 25px',
    },
  },
  helperText: {
    color: variables.purpleExtraLightSecondary,
    fontSize: 14,
    lineHeight: '16px',
    fontWeight: 700,
    marginBottom: -8,
  },
  headingTextClassName: {
    textTransform: 'capitalize',
  },
  wrapperClassName: {
    padding: 0,
  },
  mainInfoWrapper: {
    paddingRight: 64,
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
      height: '100%',
    },
    [theme.breakpoints.down('md')]: {
      paddingRight: 0,
    },
  },
  mainInfo: {
    [theme.breakpoints.down('lg')]: {
      paddingLeft: 67,
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      alignSelf: 'center',
      width: '100%',
      maxWidth: 350,
      margin: '21px 0 17px 0',
    },
  },

  secondaryInfo: {
    [theme.breakpoints.down('lg')]: {
      marginBottom: 17,
    },
  },
  secondaryInfoWrapper: {
    paddingLeft: 24,
    [theme.breakpoints.down('md')]: {
      paddingLeft: 0,
      width: '100%',
      maxWidth: 350,
      margin: '0 auto',
    },
  },
  label: {
    fontSize: 12,
    lineHeight: '15px',
    color: theme.palette.background.default,
    fontWeight: 700,
  },
  value: {
    fontSize: 20,
    lineHeight: '24px',
    color: theme.palette.common.white,
    fontWeight: 700,
    '& span': {
      fontSize: 12,
      lineHeight: '15px',
      fontWeight: 500,
      marginLeft: 4,
      position: 'relative',
      top: -2,
    },
  },
  secondary: {
    color: theme.palette.secondary.main,
  },
  payment: {
    fontSize: 18,
  },
  infoItem: {
    marginBottom: 10,
    '& .MuiSvgIcon-root': {
      fill: theme.palette.common.white,
      marginLeft: 3,
      top: 0,
    },
  },
}));
