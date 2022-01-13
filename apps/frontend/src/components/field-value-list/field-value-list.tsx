import { Box, styled } from '@mui/material';
import { Link } from 'react-router-dom';

export interface FieldValueListProps {
  valueList: Array<string>;
}

export function FieldValueList({ valueList = [] }: FieldValueListProps) {
  return (
    <StyledFieldValueList>
      {valueList.map((value, index) => (
        <StyledLink
          key={value}
          to={`/partners/filecoin/nodes/${value}/transactions`}
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

