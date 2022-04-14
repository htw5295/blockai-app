import { modelJsonState, userState } from '@libs/atom';
import { getBlockList } from '@libs/utils';
import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Block from './Block';
import Head from './Head';

interface ContainerProps {
  ref: React.RefObject<HTMLDivElement>;
}

interface BlockGroupProps {
  top: number;
  left: number;
}

const Container = styled.div<ContainerProps>`
  min-height: 100%;
  position: relative;
`;

const BlockGroup = styled.div<BlockGroupProps>`
  position: absolute;
  top: ${(props) => `${props.top}px`};
  left: ${(props) => `${props.left}px`};
  width: 450px;
  padding: 100px;

  & > div {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 100%;
  }
`;

const BlockLine = styled.div`
  height: 100%;
  position: absolute;
  width: 2px;
  background-color: #000000;
  z-index: -10;
`;

const Canvas = () => {
  const modelJson = useRecoilValue(modelJsonState);
  const $stage = useRef<HTMLDivElement>(null);

  return (
    <Container ref={$stage}>
      <BlockGroup top={modelJson.pos.y} left={modelJson.pos.x}>
        <div>
          <Head />
          {getBlockList(modelJson).map((block, i) => (
            <Block key={`block${i}`} {...block} active={true} />
          ))}
          <BlockLine />
        </div>
      </BlockGroup>
    </Container>
  );
};

export default Canvas;
