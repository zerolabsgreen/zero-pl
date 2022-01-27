import Head from "next/head";
import { Header } from "../components/Header";
import {
  AdvisorsBlock,
  FirstQuestionsBlock,
  Footer,
  SearchBlock,
  SecondQuestionsBlock,
  TabsSection,
  WelcomeBlock,
  WelcomeSubtitle,
  WelcomeTitle,
  Wrapper
} from "../components/HomePage";

export function Index() {
  return (
  <Wrapper>
    <Head>
      <title>Zero | Welcome</title>
    </Head>
    <main>
      <Header />
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
