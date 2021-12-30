import { makeStyles } from '@material-ui/styles';
import { alpha } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  formDescriptionItem: {
    padding: '18px 128px 0 24px',
    minHeight: 72,
    marginTop: 12,
    borderLeft: `1px solid ${alpha(theme.palette.primary.main, 0.6)}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('lg')]: {
      padding: '10px 0 0 14px',
      marginTop: 22,
    },
    [theme.breakpoints.down('md')]: {
      padding: '0 0 20px',
      margin: 0,
      borderLeft: 'none',
    },
  },
  descriptionTitle: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.primary.main,
  },
  descriptionText: {
    fontSize: 12,
    lineHeight: '16px',
    fontWeight: 500,
    color: theme.palette.primary.main,
  },
  label: {
    fontSize: 14,
    lineHeight: '16px',
    fontWeight: 600,
    marginLeft: 14,
    color: theme.palette.primary.main,
  },
  field: {
    marginTop: 8,
    '& input': {
      fontSize: 18,
      lineHeight: '23px',
      fontWeight: 600,
      color: theme.palette.primary.main,
    },
  },
  fieldWrapper: {
    padding: '0 58px 12px 0',
    [theme.breakpoints.down('lg')]: {
      padding: '0 13px 12px 0',
    },
    [theme.breakpoints.down('md')]: {
      padding: '0 0 16px 0',
    },
  },
}));
