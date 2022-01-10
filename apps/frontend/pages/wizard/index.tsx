import { NextPage } from 'next';
import Head from 'next/head';
import {
  WizardPageWrapper,
  WizardContentWrapper,
  TitleWrapper,
  Title,
  Subtitle,
  WizardForm,
  SelectedProtocolProvider,
} from '@zerolabs/zero-pl-crypto-flow';

const WizardPage: NextPage = () => {
  return (
    <WizardPageWrapper>
      <Head>
        <title>Zero | Create request</title>
      </Head>
      <SelectedProtocolProvider>
        <WizardContentWrapper>
          <TitleWrapper>
            <Title color="secondary">
              Great! Let’s make your crypto green!
            </Title>
            <Subtitle color="#fff">
              Congratulations on wanting to help the planet
              by buying Renewable Energy
            </Subtitle>
          </TitleWrapper>
          <WizardForm />
        </WizardContentWrapper>
      </SelectedProtocolProvider>
      </WizardPageWrapper>
  );
};

export default WizardPage;
