import styled from '@emotion/styled';
import ContentCopy from '@mui/icons-material/ContentCopyOutlined';

/* eslint-disable-next-line */
export interface CopyToClipboardProps {
  value: string;
}

const StyledContentCopy = styled(ContentCopy)`
  &:active {
    color: #2d1155;
    transition: color 0.3s;
  }
`;
export const CopyToClipboard = ({ value }: CopyToClipboardProps) => (
  <StyledContentCopy
    onClick={() =>
      navigator.clipboard
        .writeText(value)
        .then((value1) => ({}))
        .catch((reason) => {
          console.log(reason);
        })
    }
    sx={{
      color: '#03D089',
      cursor: 'pointer',
      height: '16px',
      position: 'relative',
      top: '3px',
    }}
  />
);

export default CopyToClipboard;
