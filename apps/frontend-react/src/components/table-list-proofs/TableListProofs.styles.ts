import { makeStyles } from '@mui/styles';
import { variables } from '@energyweb/zero-protocol-labs-theme';

export const useStyles = makeStyles({
  wrapper: {
    borderRadius: '5px',
    padding: '0 16px',
    backgroundColor: variables.white,
    '& .MuiTableRow-root': {
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '16px',
    },
  },
  table: {
    borderCollapse: 'separate',
    borderSpacing: '0px 16px',
  },
  tbCell: {
    color: variables.primaryColor,
    fontWeight: 600,
    fontSize: '20px',
    border: 'none',
    display: 'flex',
  },
  thCell: {
    display: 'flex',
    fontWeight: 500,
    fontSize: '14px',
  },
  dateCell: {
    marginLeft: '20px',
    marginRight: '30px',
  },
  nameType: {
    color: variables.secondaryColor,
    fontWeight: 700,
  },
  endIcon: {
    marginLeft: '22px',
    marginTop: '20px',
  },
  amountCell: {
    width: 130,
  },
  sellerCell: {
    width: 130,
  },
  nameCell: {
    width: 230,
  },
  startIcon: {
    marginLeft: '34px',
    marginTop: '5px',
  },
});

export default useStyles;
