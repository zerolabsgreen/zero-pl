import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  btn: {
    width: '100%',
    height: '100%',
    padding: '14px 17px',
    backgroundColor: '#00D08A',
    boxShadow: ' 0px 4px 10px rgba(160, 154, 198, 0.2)',
    cursor: 'pointer',
    fontFamily: 'Rajdhani',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 700,
    textTransform: 'unset',
    '&:hover': {
      backgroundColor: '#00D08A',
    },
  },
  icon: {
    marginLeft: '19px',
  },
  iconRotate: {
    marginLeft: '20px',
    transform: 'rotate(180deg)',
  },
});

export default useStyles;
