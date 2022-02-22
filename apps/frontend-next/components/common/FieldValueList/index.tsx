import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

export interface FieldValueListProps {
  valueList: Array<string>;
  disableLink?: boolean;
}

export function FieldValueList({ valueList = [], disableLink = false }: FieldValueListProps) {
  return (
    <StyledFieldValueList>
      {valueList.map((value, index) => disableLink ? (
        <Box component={'span'} key={value}>
          {value}
          {index < valueList.length - 1 && ', '}
        </Box>
      ) : (
        <StyledLink
          key={value}
          href={`user/${value}`}
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

