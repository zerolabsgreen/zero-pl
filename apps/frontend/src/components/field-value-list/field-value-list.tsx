import styled from '@emotion/styled';
import { Box } from '@material-ui/core';
import StorageIcon from '@material-ui/icons/Storage';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface FieldValueListProps {
  valueList: Array<string>;
}

const StyledFieldValueList = styled(Box)`
  font-size: 16px;
  line-height: 18px;
  color: #2d1155;
  font-weight: 700;
`;

export function FieldValueList({ valueList = [] }: FieldValueListProps) {
  return (
    <StyledFieldValueList>
      {valueList.map((value, index) => (
        <Link
          key={value}
          to={`/partners/filecoin/nodes/${value}/transactions`}
        >
          <Box component={'span'}>
            {value}
            {index < valueList.length - 1 && ', '}
          </Box>
        </Link>
      ))}
    </StyledFieldValueList>
  );
}

export default FieldValueList;
