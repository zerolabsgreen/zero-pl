import { styled, useTheme } from '@mui/material/styles';
import Head from 'next/head';
import { ReactComponent as NotFoundSvg } from '../assets/not_found.svg';
import Header from '../components/Header';

const StyledNotFoundPage = styled('div')`
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 88px);
  align-items: center;
`;

const NotFoundPage = () => {
  const theme = useTheme();
  return (
  <>
    <Head>
      <title>404 - Page Not found</title>
      <style type={'text/css'}>{`body * { background-color: ${theme.palette.primary.main} ;}`}</style>
    </Head>
    <Header />
    <StyledNotFoundPage>
      <NotFoundSvg />
    </StyledNotFoundPage>
  </>
)};

export default NotFoundPage;
