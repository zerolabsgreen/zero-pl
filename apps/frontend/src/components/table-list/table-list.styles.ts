import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    thCell: {
      color: theme.palette.primary.main,
      fontWeight: 700,
      fontSize: '12px',
      border: 'none',
      lineHeight: '16px',
      '@media (max-width: 620px)': {
        padding: '4px'
      }
    },
    tbCell: {
      color: theme.palette.primary.main,
      fontWeight: 700,
      fontSize: '18px',
      border: 'none',
      '@media (max-width: 620px)': {
        padding: '4px'
      }
    },
    tbRowMedia: {
      '@media (max-width: 375px)': {
        display:'flex',
        flexDirection: 'column',
        padding: '5px 16px'
      },
    },
}));
