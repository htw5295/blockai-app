import { userState } from '@libs/atom';
import { cookieKey, userData } from '@libs/const';
import { GlobalStyle } from '@styles/styles';
import { lightTheme } from '@styles/theme';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useSetRecoilState } from 'recoil';
import styled, { ThemeProvider } from 'styled-components';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

interface MainProps {
  viewSidebar: boolean;
}

const Main = styled.div<MainProps>`
  padding-top: ${(props) => `${props.theme.header.height}px`};
  padding-left: ${(props) =>
    props.viewSidebar ? `${props.theme.sidebar.width}px` : '0px'};
`;

const Layout = ({ children }: LayoutProps) => {
  const [cookies, setCookie] = useCookies();
  const setUser = useSetRecoilState(userState);
  const router = useRouter();

  const viewSidebar =
    !router.pathname.includes('/[userId]/[projectId]') &&
    router.pathname !== '/login';

  useEffect(() => {
    setUser(userData);

    if (!cookies[cookieKey.locale]) {
      const userLanguage = window.navigator.language || 'en-US';
      const locale = userLanguage.split('-')[0];

      setCookie(cookieKey.locale, locale, {
        path: '/',
        secure: true,
        sameSite: 'none',
      });
    }

    if (router.locale !== cookies.locale) {
      router.push(router.asPath, undefined, {
        locale: cookies[cookieKey.locale],
      });
    }
  }, [setUser]);
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <Header />
      {viewSidebar && <Sidebar />}
      <Main viewSidebar={viewSidebar}>{children}</Main>
    </ThemeProvider>
  );
};

export default Layout;
