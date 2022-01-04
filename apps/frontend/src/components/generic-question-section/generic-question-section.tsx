import { Box, Typography, useMediaQuery, Theme } from '@mui/material';
import * as React from 'react';
import useStyles from './generic-question-section-styles';
import WelcomePageSubmitButton from '../welcome-page-submit-button/welcome-page-submit-button';
import { variables } from '@energyweb/zero-protocol-labs-theme';
import { ReactNode } from 'react-transition-group/node_modules/@types/react';
import { SvgIconProps } from '@mui/material';

export interface IGenericQuestionSectionProps {
  children?: ReactNode;
  title: string;
  label: string;
  desc: string;
  btnName: string;
  icon: SvgIconProps;
  onClick?: () => void;
}

export const GenericQuestionSection: React.FC<IGenericQuestionSectionProps> = ({
  children,
  label,
  desc,
  btnName,
  icon,
  title,
  onClick
}) => {
  const styles = useStyles();
  const windowRespWidth = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  return (
    <Box p="20px 0 25px 0" width="100%">
      <Box
        p="0 10px"
        position="relative"
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        className={styles.questionSection}
      >
        <Typography
          fontSize="32px"
          position="absolute"
          fontWeight="700"
          color={variables.secondaryColor}
          bgcolor={variables.primaryColor}
          borderRadius={'20px'}
          p={`${windowRespWidth ? '0 10px 0 10px' : '0 50px 0 50px'}`}
          top="-30px"
          textAlign="center"
        >
          {title}
        </Typography>
        <Typography
          fontSize="32px"
          fontWeight="700"
          color={variables.secondaryColor}
          mt="9px"
          textAlign="center"
        >
          {label}
        </Typography>
        <Typography
          fontSize="20px"
          fontWeight="700"
          color={variables.white}
          mb="50px"
          mt={!label ? '7px' : ''}
          textAlign="center"
        >
          {desc}
        </Typography>
        {children}
        <Box
          width={!windowRespWidth ? '380px' : 'unset'}
          display="flex"
          justifyContent="center"
          position="absolute"
          bottom="-20px"
          bgcolor={variables.primaryColor}
        >
          <Box width={windowRespWidth ? '280px' : '340px'}>
            <WelcomePageSubmitButton name={btnName} icon={icon} onClick={onClick} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GenericQuestionSection;
