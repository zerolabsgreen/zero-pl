import { useNavigate } from "react-router";
import Box from "@mui/material/Box"
import { styled } from "@mui/material/styles"
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import TollIcon from '@mui/icons-material/Toll'
import { QuestionSectionProps, QuestionSection } from '@zero-labs/zero-ui-components';

const Wrapper = styled(Box)`
  display: flex;
  margin-top: 90px;
  & > div:not(:last-child) {
      margin-right: 20px
  }
`

export const FirstQuestionsBlock = () => {
  const navigate = useNavigate();

  const questionDataSection: Omit<QuestionSectionProps, 'children'>[] = [
    {
      title: 'Are you',
      subtitle: 'New to Renewable Energy procurement?',
      description: 'Let us guide you in a simple step by step process!',
      btnName: 'Guide me',
      icon: <ErrorOutlineIcon />,
    },
    {
      title: 'Are you',
      subtitle: 'a Crypto Miner, Application or Crypto User?',
      description: 'head here for a dedicated and guided process',
      btnName: 'Make your crypto green!',
      icon: <TollIcon />,
      onClick: async () => {navigate('/wizard')},
    },
  ];

  return (
    <Wrapper>
      {questionDataSection.map((section) => {
        return (
          <QuestionSection
            key={section.subtitle}
            title={section.title}
            subtitle={section.subtitle}
            description={section.description}
            btnName={section.btnName}
            icon={section.icon}
            onClick={section.onClick}
          />
        );
      })}
    </Wrapper>
  )
}
