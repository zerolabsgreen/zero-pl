import { Box, Typography, useMediaQuery, Theme } from '@material-ui/core';
import { variables } from '@energyweb/zero-protocol-labs-theme';
import { ReactComponent as EcoImg } from './assets/eco.svg';
import { ReactComponent as StandardImg } from './assets/standard.svg';
import { ReactComponent as REBAImg } from './assets/REBA.svg';
import { ReactComponent as ReSourceImg } from './assets/re-source.svg';
import { ReactComponent as EnergyImg } from './assets/energy.svg';
import { ReactComponent as PttImg } from './assets/ptt.svg';

const advisorsDate = [
  {
    key: 'advisor1',
    advisorsArray: [
      { key: 'ecoImg', node: <EcoImg /> },
      { key: 'standardImg', node: <StandardImg /> },
      { key: 'rebaImg', node: <REBAImg /> },
    ],
  },
  {
    key: 'advisor2',
    advisorsArray: [
      { key: 'resourceImg', node: <ReSourceImg /> },
      { key: 'energyImg', node: <EnergyImg /> },
      { key: 'pttImg', node: <PttImg /> },
    ],
  },
];

export const AdvisorsSection = () => {
  const windowRespWidth = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  return (
    <Box>
      <Typography
        fontWeight={700}
        fontSize="32px"
        color={variables.secondaryColor}
        textAlign="center"
        mb="36px"
      >
        Advisors
      </Typography>
      {advisorsDate.map((el, index) => {
        return (
          <Box
            key={el.key}
            display="flex"
            width="100%"
            justifyContent="space-around"
            alignItems="center"
            flexWrap="wrap"
          >
            {el.advisorsArray.map((item) => {
              return (
                <Box
                  key={item.key}
                  width="300px"
                  display="flex"
                  justifyContent="center"
                  pb={`${windowRespWidth ? '50px' : '90px'}`}
                >
                  {item.node}
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
};

export default AdvisorsSection;
