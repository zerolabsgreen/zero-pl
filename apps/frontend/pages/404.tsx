import styled from "@emotion/styled";
import type { NextPage } from "next";
import Head from "next/head";
import { ReactComponent as NotFoundSvg } from '../assets/not_found.svg';

const Custom404: NextPage = () => {
  return (
    <Wrapper>
      <Head>
        <title>404 - Page Not Found</title>
        <style type={'text/css'}>{`body * { background-color: #2D1155 ;}`}</style>
      </Head>
      <NotFoundSvg />
    </Wrapper>
  )
};

export default Custom404;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  align-items: center;
`;
