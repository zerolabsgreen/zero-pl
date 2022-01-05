import { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Theme } from '@mui/material/styles/createTheme';
import { SvgIconProps } from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

export interface QuestionSectionProps {
  title: string;
  subtitle: string;
  description: string;
  btnName: string;
  icon: SvgIconProps;
  onClick?: () => void | Promise<void>;
  children?: ReactNode;
}

export const QuestionSection: FC<QuestionSectionProps> = ({
  children,
  subtitle,
  description,
  btnName,
  icon,
  title,
  onClick,
}) => {
  const windowRespWidth = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  return (
    <Box p="20px 0 25px 0" width="100%">
      <QuestionsSectionWrapper>
        <Title color="secondary">
          {title}
        </Title>
        <Subtitle color="secondary">
          {subtitle}
        </Subtitle>
        <Description mt={!subtitle ? '7px' : ''} >
          {description}
        </Description>
        {children}
        <BtnWrapper width={!windowRespWidth ? '380px' : 'unset'}>
          <Box width={windowRespWidth ? '280px' : '340px'}>
          <SubmitBtn
            type="submit"
            variant="contained"
            endIcon={icon}
            onClick={onClick}
          >
            {btnName}
          </SubmitBtn>
          </Box>
        </BtnWrapper>
      </QuestionsSectionWrapper>
    </Box>
  );
};

const QuestionsSectionWrapper = styled(Box)`
  padding: 0 10px;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%2300D08AFF' stroke-width='2' stroke-dasharray='10' stroke-dashoffset='23' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 10px;
`
const Title = styled(Typography)(({theme}) => `
  font-size: 32px;
  position: absolute;
  font-weight: 700;
  background-color: ${theme.palette.primary.main};
  border-radius: 20px;
  padding: 0 50px 0 50px;
  top: -30px;
  text-align: center;
`)

const Subtitle = styled(Typography)`
 font-size: 32px;
  font-weight: 700;
  margin-top: 9px;
  text-align: center;
`

const Description = styled(Typography)`
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 50px;
  text-align: center;
`

const BtnWrapper = styled(Box)(({theme}) => `
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: -20px;
  background-color: ${theme.palette.primary.main};
`)

const SubmitBtn = styled(Button)`
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  height: 48px;
  font-size: 16px;
  font-weight: 700;
`
