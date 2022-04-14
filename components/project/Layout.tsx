import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineProject } from 'react-icons/ai';
import { VscGraph, VscRunAll } from 'react-icons/vsc';
import { BiNetworkChart } from 'react-icons/bi';
import { FiSave } from 'react-icons/fi';
import { useRecoilValue } from 'recoil';
import { modelJsonState } from '@libs/atom';

interface LayoutProps {
  children: React.ReactNode;
}

interface TabProps {
  current: boolean;
}

const FixedBox = styled.div`
  position: fixed;
  top: ${(props) => `${props.theme.header}px`};
  left: 0;
  width: 100%;
  background-color: ${(props) => props.theme.bgColor};
`;

const Tabs = styled.div`
  display: flex;
  padding: 0 20px;
  padding-top: 5px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  height: ${(props) => `${props.theme.project.tabHeight}px`};
  gap: 20px;
`;

const Tab = styled.div<TabProps>`
  height: 100%;
  display: flex;
  font-family: 'Poppins', sans-serif;
  align-items: center;
  border-bottom: 3px solid
    ${(props) => (props.current ? props.theme.accent1Color : 'transparent')};
  font-size: 14px;

  a {
    display: flex;
    align-items: center;
    gap: 5px;

    svg {
      font-size: 16px;
    }
  }
`;

const UtilBox = styled.div`
  height: ${(props) => `${props.theme.project.utilHeight}px`};
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 15px;

  button {
    display: flex;
    align-items: center;
    font-size: 18px;
  }
`;

const Container = styled.div`
  padding-top: 75px;
`;

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const basePath = `/${router.query.userId}/${router.query.projectId}`;
  const modelJson = useRecoilValue(modelJsonState);

  const onRunClick = () => {
    console.log(modelJson);
  };
  return (
    <>
      <FixedBox>
        <Tabs>
          <Tab
            current={
              router.asPath === basePath ||
              router.asPath === `${basePath}/about`
            }
          >
            <Link href={`${basePath}/about`}>
              <a>
                <AiOutlineProject />
                <span>About</span>
              </a>
            </Link>
          </Tab>
          <Tab current={router.asPath === `${basePath}/data`}>
            <Link href={`${basePath}/data`}>
              <a>
                <VscGraph />
                <span>Data</span>
              </a>
            </Link>
          </Tab>
          <Tab current={router.asPath === `${basePath}/model`}>
            <Link href={`${basePath}/model`}>
              <a>
                <BiNetworkChart />
                <span>Model</span>
              </a>
            </Link>
          </Tab>
        </Tabs>
        <UtilBox>
          <button>
            <FiSave />
          </button>
          <button onClick={onRunClick}>
            <VscRunAll />
          </button>
        </UtilBox>
      </FixedBox>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
