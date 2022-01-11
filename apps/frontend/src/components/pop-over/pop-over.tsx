import {
  Box,
  Paper,
  Tooltip,
  tooltipClasses,
  useTheme,
} from '@mui/material';
import { FC, ReactElement } from 'react';
import { useStyles } from './pop-over.styles';
import { styled } from '@mui/styles';

export interface PopOverProps {
  children: ReactElement;
  popoverContent?: string;
  popoverContentElement?: ReactElement;
  hideTimeout?: number;
}

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
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
  const theme = useTheme();
  if (!popoverContent && !popoverContentElement) {
    throw new Error(
      `Please provide "popoverContent" or "popoverContentElement" property!`
    );
  }
  return (
    <CustomTooltip
      leaveDelay={hideTimeout}
      title={
        <Paper sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary }}>
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
