import styled from '@emotion/styled';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from '../components/Header';
import ProofPage from '../pages/ProofPage';
import NotFoundPage from '../pages/NotFoundPage';
import PurchasePage from '../pages/PurchasePage';
import { WizardPage } from '../pages/WizardPage';
import { WelcomePage } from '../pages/WelcomePage';
import { ThankYouPage } from '../pages/ThankYouPage';
import { AddressMappingProvider, SelectedProtocolProvider } from '../context';
import WizardThankPage from '../pages/WizardThankYouPage';
import { useAxiosDefaults } from '../hooks';
import ProofExamplePage from '../pages/ProofExamplePage';

const StyledDiv = styled.div`
  background-color: #f6f3f9;
  min-height: 100vh;
`;

export const App = () => {
  useAxiosDefaults();
  return (
      <StyledDiv>
        <Header />
        <main>
          <Routes>
            <Route path={'/'} element={<WelcomePage />} />
            <Route
              path={'/partners/filecoin/purchases/:productId'}
              element={<ProofPage />}
            />
            <Route
              path={'/partners/filecoin/nodes/:productId/transactions'}
              element={<PurchasePage />}
            />
            <Route
              path={'/wizard'}
              element={
                <SelectedProtocolProvider>
                  <AddressMappingProvider>
                    <WizardPage />
                  </AddressMappingProvider>
                </SelectedProtocolProvider>
              }
            />
            <Route
            path={'/wizard/thank-you'}
            element={
            <SelectedProtocolProvider>
              <WizardThankPage />
            </SelectedProtocolProvider>
            }
            />
            <Route
              path={'proof/example'}
              element={<ProofExamplePage />}
            />
            <Route path={'/thank-you'} element={<ThankYouPage />} />
            <Route path={'/404'} element={<NotFoundPage />} />
            <Route path={'*'} element={<Navigate to={'/'} />} />
          </Routes>
        </main>
      </StyledDiv>
  );
};

export default App;
