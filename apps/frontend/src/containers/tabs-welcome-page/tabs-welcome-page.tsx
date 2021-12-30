import {
  Box,
  Typography,
  Tabs,
  Tab,
  useMediaQuery,
  Theme,
} from '@material-ui/core';
import { variables } from '@energyweb/zero-protocol-labs-theme';
import React, { SyntheticEvent } from 'react';
import useStyles from './tabs-welcome-page-styles';
import marketIcon from '../../assets/svg/marketIcon.svg';
import platformIcon from '../../assets/svg/platformIcon.svg';
import procurementIcon from '../../assets/svg/procurementIcon.svg';
import integrationIcon from '../../assets/svg/integrationIcon.svg';

const tabsData = [
  {
    img: marketIcon,
    label: 'Myriad marketplaces',
    value:
      'Zero integrates myriad marketplaces—through a single, convenient, digital interface. Marketplace operators can thus tap into a new source of renewable energy buyers, helping attract growing business to their platforms.',
  },
  {
    img: platformIcon,
    label: 'Purchase on digital platforms',
    value:
      'Renewables procurement gets more transparent, faster, and easier thanks to Zero’s connection to digitalized marketplaces that make the process as easy as booking a hotel room or flight.',
  },
  {
    img: procurementIcon,
    label: 'Multiple procurement options',
    value:
      'Buyers get greater visibility into available supplies of verified renewable energy options—including energy attribute certificates (EACs) such as renewable energy certificates (RECs), guarantees of origin (GOs), and International RECs (I-RECs).',
  },
  {
    img: integrationIcon,
    label: 'Open integration protocol',
    value:
      'A standardized API enables any digitized renewable energy platform—including those built with EW Origin—to connect and post available supplies for buyers.',
  },
  {
    img: integrationIcon,
    label: 'New buyers',
    value:
      'EW Zero connects digital marketplace platform operators to new buyers, scaling demand for renewables and increasing demand liquidity. ',
  },
];

export const TabsWelcomePage = () => {
  const styles = useStyles();

  const [value, setValue] = React.useState(3);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box width="100%" position="relative">
      <Box
        className={styles.wrapper}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="relative"
      >
        <Typography
          fontSize="32px"
          fontWeight="700"
          color={variables.secondaryColor}
          ml="15px"
          className={styles.title}
        >
          Advantages of using Zero
        </Typography>
      </Box>
      <Tabs
        className={styles.tabs}
        value={value}
        onChange={handleChange}
        scrollButtons={true}
        aria-label="scrollable force tabs example"
        variant="scrollable"
        allowScrollButtonsMobile
      >
        {tabsData.map((el) => {
          return (
            <Tab key={el.label}
              label={
                <React.Fragment>
                  <Box
                    minWidth="289px"
                    height="385px"
                    className={styles.tab}
                  >
                    <img src={el.img} alt="tabs-img" />
                    <Typography
                      mt="26px"
                      mb="20px"
                      color={variables.white}
                      fontSize="24px"
                      fontWeight={700}
                      whiteSpace="pre-wrap"
                      textAlign="center"
                    >
                      {el.label}
                    </Typography>
                    <Typography
                      whiteSpace="pre-wrap"
                      width="100%"
                      fontSize="16px"
                      fontWeight="500"
                      color={variables.white}
                      textAlign="center"
                    >
                      {el.value}
                    </Typography>
                  </Box>
                </React.Fragment>
              }
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

export default TabsWelcomePage;
