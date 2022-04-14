import Layout from '@components/project/Layout';
import Seo from '@components/Seo';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';

const Container = styled.div``;

const About: NextPage = () => {
  return (
    <Layout>
      <Seo />
      <Container>asdfasdf</Container>
    </Layout>
  );
};

export default About;

export const getServerSideProps = async (ctx: any) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ['common'])),
    },
  };
};
