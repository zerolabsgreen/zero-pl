import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import styled from '@mui/material/styles/styled';
import Tooltip from '@mui/material/Tooltip';
import { FC, ReactElement } from 'react';

export interface PopOverProps {
  children: ReactElement;
  popoverContent?: string;
  popoverContentElement?: ReactElement;
  hideTimeout?: number;
}

export const PopOver: FC<PopOverProps> = ({
  popoverContentElement,
  popoverContent,
  hideTimeout,
  children,
}) => {
  if (!popoverContent && !popoverContentElement) {
    throw new Error(
      `Please provide "popoverContent" or "popoverContentElement" property!`
    );
  }
  return (
    <Tooltip
      leaveDelay={hideTimeout}
      title={
        <StyledPaper>
          <StyledBox>
            {popoverContentElement ?? popoverContent}
          </StyledBox>
        </StyledPaper>
      }
    >
      {children}
    </Tooltip>
  );
};

export default PopOver;

const StyledPaper = styled(Paper)(({ theme }) => `
  background-color: ${theme.palette.primary.main};
  color: ${theme.palette.text.primary};
  width: 100%;
`);
const StyledBox = styled(Box)`
  font-size: 12px;
  font-family: Rajdhani;
  font-weight: 600;
  text-align: center;
  padding: 10px 40px
`
