import { makeStyles } from '@material-ui/styles';
import { alpha } from '@material-ui/core';
import { variables } from '@energyweb/zero-protocol-labs-theme';

export const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.dark,
    boxShadow: `0px 4px 10px ${alpha(variables.boxShadowColor, 0.2)}`,
    borderRadius: 5,
    fontSize: 16,
    lineHeight: '21px',
    fontWeight: 700,
    padding: '13px 17px',
    marginLeft: 16,
    transition: theme.transitions.create(
      ['color, background-color', 'box-shadow'],
      {
        duration: theme.transitions.duration.short,
      }
    ),
    '& svg path': {
      transition: theme.transitions.create('fill', {
        duration: theme.transitions.duration.short,
      }),
    },
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.background.paper,
      boxShadow: `0px 4px 10px ${alpha(variables.boxShadowColor, 0.2)}`,
      '& svg path': {
        fill: theme.palette.primary.main,
      },
    },
    [theme.breakpoints.down('md')]: {
      margin: '0 0 8px',
    },
  },
  buttonPrimary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.background.paper,
      boxShadow: `0px 4px 10px ${alpha(variables.boxShadowColor, 0.2)}`,
    },
  },
}));
