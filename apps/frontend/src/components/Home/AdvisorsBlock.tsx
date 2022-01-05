import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/system/createTheme/createTheme";
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

import { ReactComponent as EcoImg } from '../../../assets/eco-advisor.svg';
import { ReactComponent as StandardImg } from '../../../assets/standard-advisor.svg';
import { ReactComponent as REBAImg } from '../../../assets/reba-advisor.svg';
import { ReactComponent as ReSourceImg } from '../../../assets/resource-advisor.svg';
import { ReactComponent as EnergyImg } from '../../../assets/energy-advisor.svg';
import { ReactComponent as PttImg } from '../../../assets/ptt-advisor.svg';

const advisorsData = [
  {
    key: 'advisor1',
    advisorsArray: [
      { key: 'ecoImg', icon: <EcoImg /> },
      { key: 'standardImg', icon: <StandardImg /> },
      { key: 'rebaImg', icon: <REBAImg /> },
    ],
  },
  {
    key: 'advisor2',
    advisorsArray: [
      { key: 'resourceImg', icon: <ReSourceImg /> },
      { key: 'energyImg', icon: <EnergyImg /> },
      { key: 'pttImg', icon: <PttImg /> },
    ],
  },
];

export const AdvisorsBlock = () => {
  const screenSizeBelowMd = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'))
  return (
    <Wrapper>
      <Box>
        <Title color="secondary">
          Advisors
        </Title>
        {advisorsData.map((el) => (
          <AdvisorBlock key={el.key}>
            {el.advisorsArray.map((item) => (
              <AdvisorItem
                key={item.key}
                pb={`${screenSizeBelowMd ? '50px' : '90px'}`}
              >
                {item.icon}
              </AdvisorItem>
            ))}
          </AdvisorBlock>
        ))}
      </Box>
    </Wrapper>
  )
}

const Wrapper = styled(Grid)`
  padding: 95px 41px 30px 40px;
`

const Title = styled(Typography)`
  font-weight: 700;
  font-size: 32px;
  text-align: center;
  margin-bottom: 36px;
`

const AdvisorBlock = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`

const AdvisorItem = styled(Box)`
  width: 300px;
  display: flex;
  justify-content: center;
`
