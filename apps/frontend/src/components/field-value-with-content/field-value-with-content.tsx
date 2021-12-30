import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface FieldValueWithContentProps {}

const StyledFieldValueWithContent = styled.div`
  color: pink;
`;

export function FieldValueWithContent(props: FieldValueWithContentProps) {
  return (
    <StyledFieldValueWithContent>
      <h1>Welcome to FieldValueWithContent!</h1>
    </StyledFieldValueWithContent>
  );
}

export default FieldValueWithContent;
