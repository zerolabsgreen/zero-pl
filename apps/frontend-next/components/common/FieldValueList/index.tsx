import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

export interface FieldValueListProps {
  valueList: Array<string>;
}

export function FieldValueList({ valueList = [] }: FieldValueListProps) {
  return (
    <StyledFieldValueList>
      {valueList.map((value, index) => (
        <Link
          key={value}
          href={`/buyer/${value}`}
        >
          <StyledBox component={'span'}>
            {value}
            {index < valueList.length - 1 && ', '}
          </StyledBox>
        </Link>
      ))}
    </StyledFieldValueList>
  );
}

export default FieldValueList;

const StyledFieldValueList = styled(Box)(({ theme }) => `
  font-size: 16px;
  line-height: 18px;
  color: ${theme.palette.primary.main};
  font-weight: 700;
`);

const StyledBox = styled(Box)(({ theme }) => `
  color: ${theme.palette.primary.main};
  cursor: pointer;
  transition: all .2s ease-in;
  &:hover {
    color: ${theme.palette.secondary.main}
  };
`)

