import { cookieKey } from '@libs/const';
import { useRouter } from 'next/router';
import React from 'react';
import { useCookies } from 'react-cookie';
import { IoIosGlobe } from 'react-icons/io';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  svg {
    font-size: 24px;
  }
`;

const Selector = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
`;

const LocaleBtn = () => {
  const [_, setCookie] = useCookies();
  const router = useRouter();

  const onChangeLocale = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setCookie(cookieKey.locale, value, {
      path: '/',
      secure: true,
      sameSite: 'none',
    });

    router.push(
      {
        pathname: router.asPath,
      },
      undefined,
      {
        locale: value,
      }
    );
  };

  return (
    <Container>
      <IoIosGlobe />
      <Selector onChange={onChangeLocale} defaultValue={router.locale}>
        <option value="ko">한국어</option>
        <option value="en">English</option>
      </Selector>
    </Container>
  );
};

export default LocaleBtn;
