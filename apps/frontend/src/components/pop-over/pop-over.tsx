import {
  Box,
  Paper,
  Theme,
  Tooltip,
  tooltipClasses,
  withStyles,
} from '@mui/material';
import Fade from '@mui/material/Fade';
import Popper from '@mui/material/Popper';
import React, { FC, ReactElement, ReactNode, useState } from 'react';
import { useStyles } from './pop-over.styles';
import { styled } from '@mui/styles';
/* eslint-disable-next-line */

export interface PopOverProps {
  children: ReactElement;
  popoverContent?: string;
  popoverContentElement?: ReactElement;
  hideTimeout?: number;
}

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme: Theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: '500px',
    fontSize: '12px',
    padding: 0,
  },
}));

export const PopOver: FC<PopOverProps> = ({
  popoverContentElement,
  popoverContent,
  hideTimeout,
  children,
}) => {
  const styles = useStyles();
  if (!popoverContent && !popoverContentElement) {
    throw new Error(
      `Please provide "popoverContent" or "popoverContentElement" property!`
    );
  }
  return (
    <CustomTooltip
      leaveDelay={hideTimeout}
      title={
        <Paper sx={{ backgroundColor: '#2D1155', color: '#fff' }}>
          <Box p={'10px 40px'}>
            {popoverContent ? (
              <pre className={styles.popoverText}>{popoverContent}</pre>
            ) : (
              popoverContentElement
            )}
          </Box>
        </Paper>
      }
    >
      {children}
    </CustomTooltip>
  );
};

export default PopOver;
