import Layout from '@components/Layout';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <CookiesProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CookiesProvider>
    </RecoilRoot>
  );
}

export default appWithTranslation(MyApp);
