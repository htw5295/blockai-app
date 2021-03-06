import Seo from '@components/Seo';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';

const Container = styled.div``;

const Home: NextPage = () => {
  return (
    <Container>
      <Seo />
    </Container>
  );
};

export default Home;

export const getServerSideProps = async (ctx: any) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ['common'])),
    },
  };
};
