import styled from '@emotion/styled';
import { Box, BoxProps } from '@material-ui/core';

export interface FieldLabelProps extends BoxProps {
  width?: string;
  labelText: string;
}

const StyledFieldLabel = styled(Box)`
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  color: #2d1155;
`;

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
