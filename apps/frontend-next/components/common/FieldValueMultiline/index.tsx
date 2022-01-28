import { styled } from "@mui/material/styles";

export interface FieldValueMultilineProps {
  textValues: Array<string | undefined>;
}

const StyledFieldValueMultiline = styled('div')(({ theme }) => `
  font-size: 16px;
  font-weight: 700;
  line-height: 21px;
  color: ${theme.palette.primary.main};
`);

export const FieldValueMultiline = ({
  textValues,
}: FieldValueMultilineProps) => (
  <StyledFieldValueMultiline>
    {textValues.length ? (
      textValues.map((value, index) => (
        <div key={value}>
          {value}
          {index === 0 && ','}
        </div>
      ))
    ) : (
      <div>-</div>
    )}
  </StyledFieldValueMultiline>
);

export default FieldValueMultiline;
