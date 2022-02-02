import Head from "next/head";
import { AdvisorsBlock } from "../components/HomePage/AdvisorsBlock";
import { FirstQuestionsBlock } from "../components/HomePage/FirstQuestionsBlock";
import { Footer } from "../components/HomePage/Footer";
import { SearchBlock } from "../components/HomePage/SearchBlock";
import { SecondQuestionsBlock } from "../components/HomePage/SecondQuestionsBlock";
import { WelcomeBlock, WelcomeSubtitle, WelcomeTitle, Wrapper } from "../components/HomePage/styled";
import { TabsSection } from "../components/HomePage/TabsSection";

export function Index() {
  return (
  <Wrapper>
    <Head>
      <title>Zero | Welcome</title>
    </Head>
    <main>
      <WelcomeBlock>
        <WelcomeTitle color="secondary">
          Welcome to Zero
        </WelcomeTitle>
        <WelcomeSubtitle>
          the global search engine for buying Renewable Energy
        </WelcomeSubtitle>
        <SearchBlock />
        <FirstQuestionsBlock />
      </WelcomeBlock>
      <SecondQuestionsBlock />
      <TabsSection />
      <AdvisorsBlock />
      <Footer />
    </main>
  </Wrapper>
  );
}

export default Index;
