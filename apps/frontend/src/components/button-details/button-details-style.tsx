import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  btn: {
    width: '100%',
    height: '100%',
    padding: '10px 17px',
    backgroundColor: theme.palette.secondary.main,
    boxShadow: ' 0px 4px 10px rgba(160, 154, 198, 0.2)',
    cursor: 'pointer',
    fontFamily: 'Rajdhani',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 700,
    textTransform: 'unset',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  icon: {
    marginLeft: '19px',
  },
  iconRotate: {
    marginLeft: '20px',
    transform: 'rotate(180deg)',
  },
}));

export default useStyles;
