import styled from '@emotion/styled';
import { memo } from 'react';
import { ReactComponent as NotFoundSvg } from './not_found.svg';
import { Helmet } from 'react-helmet-async';

/* eslint-disable-next-line */
export interface NotFoundPageProps {}

const StyledNotFoundPage = styled.div`
  display: flex;
  justify-content: center;
  height: calc(100vh - 88px);
  align-items: center;
`;

export const NotFoundPage = memo(() => (
  <StyledNotFoundPage>
    <Helmet>
      <title>404 - Page Not found</title>
      <style type={'text/css'}>{`body * { background-color: #2D1155 ;}`}</style>
    </Helmet>
    <NotFoundSvg />
  </StyledNotFoundPage>
));

export default NotFoundPage;
