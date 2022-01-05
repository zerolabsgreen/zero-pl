import { NextPage } from "next"
import Head from "next/head"
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
} from "../src/components/Home";

const LandingPage: NextPage = () => {
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
  )
}

export default LandingPage;
