import styled from '@emotion/styled';
import { Typography, TypographyProps } from '@mui/material';
import CopyToClipboard from '../copy-to-clipboard/copy-to-clipboard';

export interface FieldValueProps extends TypographyProps {
  valueText: string;
  copyToClipboardEnabled?: boolean;
}

const StyledFieldValue = styled(Typography)`
  font-size: 16px;
  font-weight: 700;
  line-height: 21px;
  color: #2d1155;
`;

export const FieldValue = ({
  copyToClipboardEnabled,
  valueText,
  ...props
}: FieldValueProps) => (
  <StyledFieldValue {...props}>
    {valueText || '-'}
    {copyToClipboardEnabled && <CopyToClipboard value={valueText} />}
  </StyledFieldValue>
);

export default FieldValue;
