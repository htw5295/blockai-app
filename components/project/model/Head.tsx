import { dragBlockState, modelJsonState } from '@libs/atom';
import { IBlock } from '@libs/const';
import { getNewBlockName, linkBlock, unLinkBlock } from '@libs/utils';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

interface ContainerProps {
  dragOver: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background-color: #505050;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${(props) =>
    props.dragOver
      ? '0 0px 10px 3px #3de01c'
      : '0 0 10px -3px rgba(0, 0, 0, 0.5)'};
`;

export default function Head() {
  const dragBlock = useRecoilValue(dragBlockState);
  const [dragOver, setDragOver] = useState(false);
  const [modelJson, setModelJson] = useRecoilState(modelJsonState);

  const onDrop = () => {
    if (
      modelJson.head.next.length > 0 &&
      modelJson.head.next[0] === dragBlock!.name
    ) {
      setDragOver(false);
      return;
    }

    const newModelJson = linkBlock(dragBlock!, modelJson.head, modelJson);
    setModelJson(newModelJson);
    setDragOver(false);
  };

  const onDragOver = () => {
    setDragOver(true);
  };

  const onDragLeave = () => {
    setDragOver(false);
  };

  return (
    <Container
      {...(dragBlock && {
        onDrop,
        onDragOver,
        onDragLeave,
      })}
      dragOver={dragOver}
    >
      Head
    </Container>
  );
}
