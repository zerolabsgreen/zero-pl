import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export interface FieldValueListProps {
  valueList: Array<string>;
  // temporary for example purpose
  disableLink?: boolean;
}

export function FieldValueList({ valueList = [], disableLink = false }: FieldValueListProps) {
  return (
    <StyledFieldValueList>
      {valueList.map((value, index) => disableLink ? (
        <Box component={'span'}>
          {value}
          {index < valueList.length - 1 && ', '}
        </Box>
      ) : (
        <StyledLink
          key={value}
          // @TODO temporary, uncomment to proper after fixing page
          to={'#'}
          // to={`/partners/filecoin/nodes/${value}/beneficiary`}
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

