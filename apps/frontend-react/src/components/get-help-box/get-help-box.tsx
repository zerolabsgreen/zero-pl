import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface GetHelpBoxProps {}

const StyledGetHelpBox = styled.div`
  width: 280px;
`;

export function GetHelpBox(props: GetHelpBoxProps) {
  return (
    <StyledGetHelpBox>
      <h1>Welcome to GetHelpBox!</h1>
    </StyledGetHelpBox>
  );
}

export default GetHelpBox;
