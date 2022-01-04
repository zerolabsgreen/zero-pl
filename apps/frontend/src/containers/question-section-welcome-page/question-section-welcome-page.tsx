import { Box } from '@mui/material';
import useStyles from './question-section-welcome-page-styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TollIcon from '@mui/icons-material/Toll';
import GenericQuestionSection, { IGenericQuestionSectionProps } from '../../components/generic-question-section/generic-question-section';
import { useNavigate } from 'react-router-dom';



export const QuestionSectionWelcomePage = () => {
  const styles = useStyles();

  const navigate = useNavigate();

  const dataSection: Omit<IGenericQuestionSectionProps, 'children'>[] = [
    {
      title: 'Are you',
      label: 'New to Renewable Energy procurement?',
      desc: 'Let us guide you in a simple step by step process!',
      btnName: 'Guide me',
      icon: <ErrorOutlineIcon />,
    },
    {
      title: 'Are you',
      label: 'a Crypto Miner, Application or Crypto User?',
      desc: 'head here for a dedicated and guided process',
      btnName: 'Make your crypto green!',
      icon: <TollIcon />,
      onClick: () => navigate('/wizard')
    },
  ];

  return (
    <Box display="flex" mt="89px" className={styles.wrapper}>
      {dataSection.map((el) => {
        return (
          <GenericQuestionSection
            key={el.label}
            title={el.title}
            label={el.label}
            desc={el.desc}
            btnName={el.btnName}
            icon={el.icon}
            onClick={el.onClick}
          />
        );
      })}
    </Box>
  );
};

export default QuestionSectionWelcomePage;
