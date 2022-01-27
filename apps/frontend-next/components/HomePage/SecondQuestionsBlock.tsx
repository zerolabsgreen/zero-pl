import { styled, Theme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { QuestionSection } from "@zero-labs/zero-ui-components"
import { ReactComponent as CountryImg } from '../../assets/country.svg';
import { ReactComponent as GeneratorImg } from '../../assets/generator.svg';
import { ReactComponent as TWHImg } from '../../assets/twh.svg';

const awaitsData = [
  { img: <CountryImg />, count: '90', name: 'Countries' },
  { img: <GeneratorImg />, count: '560', name: 'Generators' },
  { img: <TWHImg />, count: '356', name: 'TWh' },
];

export const SecondQuestionsBlock = () => {
  const screenSizeBelowSm = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))

  return (
    <QuestionSectionWrapper>
      <QuestionSection
        title={
          screenSizeBelowSm
            ? 'What awaits you'
            : 'What awaits you inside of Zero? '
        }
        subtitle={screenSizeBelowSm ? 'inside of Zero?' : ''}
        description={`Zero App is a place where You'll find:`}
        btnName={'Create account'}
        icon={<PersonAddAltIcon />}
      >
        <QuestionsWrapper>
        {awaitsData.map((item) => (
          <Box display="flex" alignItems="center" key={item.name}>
            {item.img}
            <Box ml="23px">
              <CountText>
                {item.count}
              </CountText>
              <NameText color="secondary">
                {item.name}
              </NameText>
            </Box>
          </Box>)
        )}
        </QuestionsWrapper>
      </QuestionSection>
    </QuestionSectionWrapper>
  )
}

const QuestionSectionWrapper = styled(Grid)`
  padding: 122px 41px 0 40px;
`

const QuestionsWrapper = styled(Box)`
  width: 60%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 125px;
  margin-top: 25px;
  justify-content: space-between;
`

const CountText = styled(Typography)`
  font-weight: 700;
  font-size: 32px;
  color: #fff;
  line-height: 30px;
`

const NameText = styled(Typography)`
  font-weight: 600;
  font-size: 22px;
`
