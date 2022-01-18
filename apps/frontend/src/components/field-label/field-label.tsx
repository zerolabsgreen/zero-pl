import { Box, BoxProps, styled } from '@mui/material';

export interface FieldLabelProps extends BoxProps {
  width?: string;
  labelText: string;
}

const StyledFieldLabel = styled(Box)(({ theme }) => `
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  color: ${theme.palette.primary.main};
`);

export const FieldLabel = ({
  className,
  mb,
  labelText,
  width,
  ...props
}: FieldLabelProps) => (
  <StyledFieldLabel
    className={className}
    mb={mb}
    minWidth={width}
    maxWidth={width}
    {...props}
  >
    {labelText}
  </StyledFieldLabel>
);

export default FieldLabel;
