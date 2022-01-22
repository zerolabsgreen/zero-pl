import styled from '@emotion/styled';
import { Helmet } from 'react-helmet-async';
import useTheme from '@mui/material/styles/useTheme';
import { ReactComponent as NotFoundSvg } from './not_found.svg';

const StyledNotFoundPage = styled.div`
  display: flex;
  justify-content: center;
  height: calc(100vh - 88px);
  align-items: center;
`;

export const NotFoundPage = () => {
  const theme = useTheme();
  return (
  <StyledNotFoundPage>
    <Helmet>
      <title>404 - Page Not found</title>
      <style type={'text/css'}>{`body * { background-color: ${theme.palette.primary.main} ;}`}</style>
    </Helmet>
    <NotFoundSvg />
  </StyledNotFoundPage>
)};

export default NotFoundPage;
