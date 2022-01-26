import Paper from '@mui/material/Paper';
import { ReactNode } from 'react';

export interface PaperBoxProps {
  children: ReactNode;
  bgColor?: string;
  customPadding?: string | number;
  customHeight?: string;
  customBorderRadius?: string;
  display?: string;
  minHeight?: string;
  marginTop?: string;
}

export const PaperBox = ({
  customBorderRadius = '10px',
  customHeight = '100%',
  customPadding,
  children,
  bgColor,
  display,
  marginTop
}: PaperBoxProps) => (
  <Paper
    sx={{
      boxShadow: 'none',
      height: customHeight,
      p: customPadding ?? 3,
      backgroundColor: bgColor,
      borderRadius: customBorderRadius,
      display,
      marginTop,
    }}
  >
    {children}
  </Paper>
);

export default PaperBox;
