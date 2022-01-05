import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  thCell: {
    color: '#2D1155',
    fontWeight: 700,
    fontSize: '12px',
    border: 'none',
    lineHeight: '16px',
    '@media (max-width: 620px)': {
      padding: '4px',
    },
  },
  tbCell: {
    color: '#2D1155',
    fontWeight: 700,
    fontSize: '18px',
    border: 'none',
    '@media (max-width: 620px)': {
      padding: '4px',
    },
  },
  tbRowMedia: {
    '@media (max-width: 375px)': {
      display: 'flex',
      flexDirection: 'column',
      padding: '5px 16px',
    },
  },
});
