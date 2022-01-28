import ContentCopy from '@mui/icons-material/ContentCopyOutlined';
import { styled, useTheme } from '@mui/material/styles';

export interface CopyToClipboardProps {
  value: string;
}

const StyledContentCopy = styled(ContentCopy)(({ theme }) => `
  &:active {
    color: ${theme.palette.primary.main};
    transition: color 0.3s;
  };
`);

export const CopyToClipboard = ({ value }: CopyToClipboardProps) => {
  const theme = useTheme();
  return (
  <StyledContentCopy
    onClick={() =>
      navigator.clipboard
        .writeText(value)
        .catch((reason) => {
          console.log(reason);
        })
    }
    sx={{
      color: theme.palette.secondary.main,
      cursor: 'pointer',
      height: '16px',
      position: 'relative',
      top: '3px',
    }}
  />
)};

export default CopyToClipboard;
