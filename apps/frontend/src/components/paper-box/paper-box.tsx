import { Paper } from '@mui/material';
import { ReactNode } from 'react';

/* eslint-disable-next-line */
export interface PaperBoxProps {
  children: ReactNode;
  bgColor?: string;
  customPadding?: string | number;
  customHeight?: string;
  customBorderRadius?: string;
  display?: string;
}

export const PaperBox = ({
  customBorderRadius = '10px',
  customHeight,
  children,
  bgColor,
  display,
}: PaperBoxProps) => (
  <Paper
    sx={{
      boxShadow: 'none',
      height: customHeight,
      p: 3,
      backgroundColor: bgColor,
      borderRadius: customBorderRadius,
      display: display,
    }}
  >
    {children}
  </Paper>
);

export default PaperBox;
