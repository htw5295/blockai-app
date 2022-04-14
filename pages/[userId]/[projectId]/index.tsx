import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import About from './about';

const Project: NextPage = () => {
  return <About />;
};

export default Project;

export const getServerSideProps = async (ctx: any) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ['common'])),
    },
  };
};
