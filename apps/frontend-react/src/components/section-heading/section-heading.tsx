import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface SectionHeadingProps {}

const StyledSectionHeading = styled.div`
  color: pink;
`;

export function SectionHeading(props: SectionHeadingProps) {
  return (
    <StyledSectionHeading>
      <h1>Welcome to SectionHeading!</h1>
    </StyledSectionHeading>
  );
}

export default SectionHeading;
