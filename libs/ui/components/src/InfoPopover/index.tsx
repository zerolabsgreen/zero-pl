import { ReactElement, ReactNode } from 'react';
import HelpOutline from '@mui/icons-material/HelpOutline';
import Box, { BoxProps } from '@mui/material/Box';
import PopOver from '../PopOver';
import useTheme from '@mui/material/styles/useTheme';

interface InfoPopoverProps {
  noIcon?: boolean;
  popoverContentElement?: ReactElement;
  popoverContent?: string;
  children: ReactNode;
  hideTimeout?: number;
  isFilecoin?: boolean;
  boxProps?: BoxProps;
}

export const InfoPopover = ({
  noIcon,
  popoverContentElement,
  popoverContent,
  children,
  hideTimeout,
  boxProps,
}: InfoPopoverProps) => {
  const theme = useTheme();

  if (noIcon) {
    return (
      <PopOver popoverContent={popoverContent}>
        <Box
          component={'span'}
          sx={{
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          {...boxProps}
        >
          {children}
        </Box>
      </PopOver>
    )
  };

  return (
    <Box component={'span'} {...boxProps}>
      {children}
      <PopOver
        hideTimeout={hideTimeout}
        popoverContent={popoverContent}
        popoverContentElement={popoverContentElement}
      >
        <HelpOutline
          sx={{
            fontSize: '12px',
            marginLeft: '4px',
            color: theme.palette.primary.light,
            cursor: 'pointer',
            position: 'relative',
          }}
        />
      </PopOver>
    </Box>
  )
};

export default InfoPopover;
