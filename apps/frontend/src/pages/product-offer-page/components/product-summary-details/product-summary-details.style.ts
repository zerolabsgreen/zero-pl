import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material';
import { variables } from '@energyweb/zero-protocol-labs-theme';

export const useStyles = makeStyles((theme) => ({
  grid: {
    '& > .MuiGrid-item:last-child': {
      paddingLeft: 80,
      [theme.breakpoints.down('md')]: {
        paddingLeft: 0,
      },
    },
    '& .MuiGrid-item:last-child .MuiGrid-item:last-child': {
      [theme.breakpoints.down('md')]: {
        paddingTop: 0,
      },
    },
  },
  headingTextClassName: {
    textTransform: 'capitalize',
  },
  productSummarySection: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `0px 4px 10px ${alpha(variables.boxShadowColor, 0.2)}`,
    minHeight: 239,
    position: 'relative',
  },
  productSummaryOverlay: {
    fontSize: 24,
    lineHeight: '31px',
    fontWeight: 700,
    color: theme.palette.primary.light,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  label: {
    fontSize: 14,
    lineHeight: '16px',
    color: variables.purpleExtraLight,
    fontWeight: 500,
    marginBottom: 6,
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  labelWrapper: {
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  infoItem: {
    padding: '5px 0',
    [theme.breakpoints.down('lg')]: {
      padding: '16px 0',
    },
    '& .MuiSvgIcon-root': {
      fontSize: 12,
      fill: variables.purpleExtraLight,
      marginLeft: 9,
      top: 0,
    },
  },
  box: {
    height: 32,
    backgroundColor: theme.palette.background.default,
  },
}));
