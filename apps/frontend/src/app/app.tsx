import styled from '@emotion/styled';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from '../components/header/header';
import ProofPage from '../pages/ProofPage';
import NotFoundPage from '../pages/NotFoundPage';
import PurchasePage from '../pages/PurchasePage';
import { ProductOfferPage } from '../pages/ProductOfferPage';
import { WizardPage } from '../pages/WizardPage';
import { WelcomePage } from '../pages/WelcomePage';
import { ThankYouPage } from '../pages/ThankYouPage';
import { AddressMappingProvider, SelectedProtocolProvider } from '../context';
import WizardThankPage from '../pages/WizardThankYouPage';
// import { UserPage } from '../pages/UserPage';
import { useAxiosDefaults } from '../hooks';

const StyledDiv = styled.div`
  background-color: #f6f3f9;
  min-height: 100vh;
`;

export const App = () => {
  useAxiosDefaults();
  return (
    <SelectedProtocolProvider>
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
              path={'/product-offer/:productId'}
              element={<ProductOfferPage />}
            />
            <Route
              path={'/wizard'}
              element={
                <AddressMappingProvider>
                  <WizardPage />
                </AddressMappingProvider>
              }
            />
            {/* <Route
              path={'/user-page'}
              element={<UserPage />}
            /> */}
            <Route path={'/wizard/thank-you'} element={<WizardThankPage />} />
            <Route path={'/thank-you'} element={<ThankYouPage />} />
            <Route path={'/404'} element={<NotFoundPage />} />
            <Route path={'*'} element={<Navigate to={'/'} />} />
          </Routes>
        </main>
      </StyledDiv>
    </SelectedProtocolProvider>
  );
};

export default App;
