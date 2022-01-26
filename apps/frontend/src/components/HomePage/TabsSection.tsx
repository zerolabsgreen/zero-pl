import { SyntheticEvent, useState } from "react"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"

import { ReactComponent as MarketIcon } from '../../assets/svg/marketIcon.svg';
import { ReactComponent as PlatformIcon } from '../../assets/svg/platformIcon.svg';
import { ReactComponent as ProcurementIcon } from '../../assets/svg/procurementIcon.svg';
import { ReactComponent as IntegrationIcon } from '../../assets/svg/integrationIcon.svg';

const tabsData = [
  {
    img: MarketIcon,
    label: 'Myriad marketplaces',
    value:
      'Zero integrates myriad marketplaces—through a single, convenient, digital interface. Marketplace operators can thus tap into a new source of renewable energy buyers, helping attract growing business to their platforms.',
  },
  {
    img: PlatformIcon,
    label: 'Purchase on digital platforms',
    value:
      'Renewables procurement gets more transparent, faster, and easier thanks to Zero’s connection to digitalized marketplaces that make the process as easy as booking a hotel room or flight.',
  },
  {
    img: ProcurementIcon,
    label: 'Multiple procurement options',
    value:
      'Buyers get greater visibility into available supplies of verified renewable energy options—including energy attribute certificates (EACs) such as renewable energy certificates (RECs), guarantees of origin (GOs), and International RECs (I-RECs).',
  },
  {
    img: IntegrationIcon,
    label: 'Open integration protocol',
    value:
      'A standardized API enables any digitized renewable energy platform—including those built with EW Origin—to connect and post available supplies for buyers.',
  },
  {
    img: IntegrationIcon,
    label: 'New buyers',
    value:
      'EW Zero connects digital marketplace platform operators to new buyers, scaling demand for renewables and increasing demand liquidity. ',
  },
]

export const TabsSection = () => {
  const [tabsValue, setTabsValue] = useState(0);
  const handleTabsChange = (event: SyntheticEvent, newValue: number) => {
    setTabsValue(newValue);
  };

  return (
    <TabsSectionWrapper>
      <Box width="100%" position="relative">
        <TitleWrapper>
          <Title color="secondary">
            Advantages of using Zero
          </Title>
        </TitleWrapper>
        <StyledTabs
          value={tabsValue}
          onChange={handleTabsChange}
          scrollButtons={true}
          aria-label="scrollable force tabs example"
          variant="scrollable"
          allowScrollButtonsMobile
        >
        {tabsData.map((el) => {
              const Logo = el.img
              return (
                <Tab
                  key={el.label}
                  label={
                    <TabWrapper>
                      <Logo />
                      <TabLabel>
                        {el.label}
                      </TabLabel>
                      <TabValue>
                        {el.value}
                      </TabValue>
                    </TabWrapper>
                  }
                />
              );
            })}
        </StyledTabs>
      </Box>
    </TabsSectionWrapper>
  )
}

const TabsSectionWrapper = styled(Grid)`
  padding: 120px 40px 0 40px;
`

const TitleWrapper = styled(Box)(({ theme }) => `
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: ${theme.palette.primary.main};
`)

const Title = styled(Typography)`
  font-size: 32px;
  font-weight: 700;
  margin-left: 15px;
`

const StyledTabs = styled(Tabs)(({theme}) => `
  & .MuiTabs-indicator {
    background-color: transparent;
  }
  & .MuiTabScrollButton-root:first-of-type {
    position: absolute;
    top: 0;
    width: 50px;
    height: 50px;
    z-index: 9999;
    right: 105px;
    & .MuiSvgIcon-root {
      fill: ${theme.palette.secondary.main};
    }
  }
  & .MuiTabScrollButton-root:last-of-type {
    position: absolute;
    right: 55px;
    top: 0;
    width: 50px;
    height: 50px;
    z-index: 9999;
    & .MuiSvgIcon-root {
      fill: ${theme.palette.secondary.main};
    }
  }
`)

const TabWrapper = styled(Box)(({theme}) => `
  min-width: 289px;
  height: 385px;
  margin-right: 32px;
  border: 1px solid ${theme.palette.secondary.main};
  box-shadow: 0px 4px 10px rgba(160, 154, 198, 0.2);
  border-radius: 10px;
  padding: 32px 14px 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`)

const TabLabel = styled(Typography)`
  margin-top: 26px;
  margin-bottom: 20px;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  white-space: pre-wrap;
  text-align: center;
`

const TabValue = styled(Typography)`
  white-space: pre-wrap;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  text-align: center;
`
