import { styled } from '@mui/material/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';
import CopyToClipboard from '../CopyToClipboard';

export interface FieldValueProps extends TypographyProps {
  valueText: string;
  copyToClipboardEnabled?: boolean;
}

const StyledFieldValue = styled(Typography)(({ theme }) => `
  font-size: 16px;
  font-weight: 700;
  line-height: 21px;
  color: ${theme.palette.primary.main};
`);

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
