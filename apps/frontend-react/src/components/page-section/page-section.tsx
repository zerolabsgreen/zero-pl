import clsx from 'clsx';
import { Box, Paper, Typography } from '@mui/material';
import { ReactNode, ReactNodeArray } from 'react';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  style: {
    '@media (max-width: 375px)': {
      padding: '15px',
    },
  },
}));

export interface PageSectionProps {
  headingText: string;
  wrapperClassName?: string;
  paperClassName?: string;
  headingTextClassName?: string;
  helperTextClassName?: string;
  sectionHelpText?: ReactNode;
  children: ReactNode | ReactNodeArray;
}

export const PageSection = ({
  children,
  headingText,
  sectionHelpText,
  paperClassName,
  wrapperClassName,
  headingTextClassName,
  helperTextClassName,
}: PageSectionProps) => {
  const classes = useStyles();

  return (
    <Box pt={'13px'} className={clsx(classes.style, wrapperClassName)}>
      <Typography
        sx={{ my: '13px', textTransform: 'uppercase' }}
        color={'#2D1155'}
        lineHeight={'31px'}
        fontSize={'24px'}
        fontWeight={700}
        className={headingTextClassName}
      >
        {headingText}
      </Typography>
      <Paper
        className={clsx(classes.style, paperClassName)}
        sx={{ p: 4, borderRadius: '10px' }}
      >
        {sectionHelpText && (
          <Box mb={3}>
            <Typography
              component={'div'}
              fontWeight={600}
              color={'#2D1155'}
              fontSize={'18px'}
              className={helperTextClassName}
            >
              {sectionHelpText}
            </Typography>
          </Box>
        )}
        {children}
      </Paper>
    </Box>
  );
};

export default PageSection;
