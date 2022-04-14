import Canvas from '@components/project/model/Canvas';
import Layout from '@components/project/Layout';
import Menu from '@components/project/model/Menu';
import Seo from '@components/Seo';
import { modelJsonState, rightClickState } from '@libs/atom';
import { IBlockData } from '@libs/const';
import { fetchApi, unLinkBlock } from '@libs/utils';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

interface ContextMenuProps {
  top: number;
  left: number;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: ${(props) =>
    `calc(100vh - ${
      props.theme.header.height +
      props.theme.project.tabHeight +
      props.theme.project.utilHeight
    }px)`};
`;

const CanvasContainer = styled.div`
  width: 100%;
  min-width: 1000px;
  height: 100%;
  overflow: auto;
`;

const MenuContainer = styled.div`
  width: 260px;
  min-width: 260px;
  height: 100%;
  border-left: 1px solid ${(props) => props.theme.borderColor};
`;

const ContextMenu = styled.div<ContextMenuProps>`
  position: fixed;
  top: ${(props) => `${props.top}px`};
  left: ${(props) => `${props.left}px`};
  z-index: 1000;
  width: 200px;
  padding: 5px 0;
  background-color: ${(props) => props.theme.bgColor};
  box-shadow: 0 3px 13px -2px #707070;

  & > div {
    width: 100%;
    height: 27px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    font-size: 13px;
    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme.accent1Color};
      color: #ffffff;
    }
  }
`;

interface ModelProps {
  blockData: {
    result: boolean;
    block: IBlockData;
  };
}

const Model: NextPage<ModelProps> = ({ blockData }) => {
  const [rightClick, setRightClick] = useRecoilState(rightClickState);
  const [modelJson, setModelJson] = useRecoilState(modelJsonState);

  const onDeleteBlock = () => {
    if (rightClick) {
      const { target } = rightClick;
      const newModelJson = unLinkBlock(modelJson.blockMap[target], modelJson);

      setModelJson(newModelJson);
    }
  };

  useEffect(() => {
    const handleDragOver = (event: any) => {
      event.preventDefault();
    };
    const handleContextMenu = (event: any) => {
      event.preventDefault();
      setRightClick(undefined);
    };

    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('click', handleContextMenu);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('dragover', handleDragOver);
      document.addEventListener('click', handleContextMenu);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [rightClick, setRightClick]);

  return (
    <Layout>
      <Container>
        <Seo />
        <CanvasContainer>
          <Canvas />
        </CanvasContainer>
        <MenuContainer>
          <Menu {...blockData.block} />
        </MenuContainer>
        {rightClick && (
          <ContextMenu top={rightClick.y} left={rightClick.x}>
            <div onClick={onDeleteBlock}>삭제</div>
          </ContextMenu>
        )}
      </Container>
    </Layout>
  );
};

export default Model;

export const getServerSideProps = async (ctx: any) => {
  const blockData = await fetchApi(
    'POST',
    `${process.env.API_URL}/project/get_block`,
    {
      framework: 'PT',
      version: '1.8.1',
    }
  );

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ['common'])),
      ...(blockData.ok && { blockData: blockData.data }),
    },
  };
};
