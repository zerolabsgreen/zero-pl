import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  wrapper: {
    '& > div:not(:last-child)': {
      marginRight: '20px',
    },
    '@media (max-width: 865px)': {
      flexDirection: 'column',
      '& > div:not(:last-child)': {
        marginBottom: '70px',
      },
    },
  },
});

export default useStyles;
