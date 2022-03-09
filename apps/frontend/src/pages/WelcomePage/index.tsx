import {
  // AdvisorsBlock,
  // FirstQuestionsBlock,
  // Footer,
  // SearchBlock,
  // SecondQuestionsBlock,
  // TabsSection,
  // WelcomeBlock,
  // WelcomeSubtitle,
  // WelcomeTitle,
  Wrapper
} from "../../components/HomePage";

export const WelcomePage = () => {
  window.onload = function() {
    window.location.href = "https://zerolabs.green";
  }
  return (
    <Wrapper>
      {/* <main>
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
      </main> */}
    </Wrapper>
  );
};

export default WelcomePage;
