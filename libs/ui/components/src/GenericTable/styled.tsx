import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const ThCell = styled(TableCell)(({ theme }) => `
    color: ${theme.palette.primary.main};
    font-weight: 700;
    font-size: 12px;
    border: none;
    line-height: 16px;
    padding: 12px;
    ${theme.breakpoints.down('sm')} {
      padding: 4px
    }
`)

export const TbCell = styled(TableCell)(({ theme }) => `
    color: ${theme.palette.primary.main};
    font-weight: 700;
    font-size: 18px;
    border: none;
    padding: 12px;
    ${theme.breakpoints.down('sm')} {
      padding: 4px
    }
`)

export const SmallScreenTableRow = styled(TableRow)`
  @media (max-width: 375px) {
    display: flex;
    flex-direction: column;
    padding: 5px 16px;
  }
`
