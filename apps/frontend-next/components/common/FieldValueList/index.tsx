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
        <StyledLink
          key={value}
          href={`/partners/filecoin/nodes/${value}/transactions`}
        >
          <Box component={'span'}>
            {value}
            {index < valueList.length - 1 && ', '}
          </Box>
        </StyledLink>
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

const StyledLink = styled(Link)(({ theme }) => `
  text-decoration: none;
  color: ${theme.palette.primary.main}
`)

