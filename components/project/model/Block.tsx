import { dragBlockState, modelJsonState, rightClickState } from '@libs/atom';
import { IBlock } from '@libs/const';
import { getNewBlockName, linkBlock, unLinkBlock } from '@libs/utils';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

interface SBlockProps {
  ref: React.RefObject<HTMLDivElement>;
  dragOver: boolean;
}

const SBlock = styled.div<SBlockProps>`
  background-color: ${(props) => props.theme.accent1Color};
  width: 100%;
  border-radius: 6px;
  color: #ffffff;
  cursor: pointer;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  box-shadow: ${(props) =>
    props.dragOver
      ? '0 0px 10px 3px #3de01c'
      : '0 0 10px -3px rgba(0, 0, 0, 0.5)'};
  font-size: 13px;
  padding: 5px 0;
`;

const BlockName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ParamsBox = styled.div`
  margin-top: 10px;
`;
const ParamsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 20px;

  label {
    font-size: 12px;
  }
  input {
    width: 60px;
    font-size: 11px;
    border: none;
    outline: none;
    padding: 2px 10px;
  }
`;

const Block = (props: IBlock) => {
  const [dragBlock, setDragBlock] = useRecoilState(dragBlockState);
  const [modelJson, setModelJson] = useRecoilState(modelJsonState);
  const [dragOver, setDragOver] = useState(false);
  const [params, setParams] = useState(props.parameters);
  const setRightClick = useSetRecoilState(rightClickState);
  const $block = useRef<HTMLDivElement>(null);

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    setDragBlock(props);
    setDragOver(false);
  };

  const onDragEnd = () => {
    setDragBlock(undefined);
    setDragOver(false);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const target = modelJson.blockMap[props.name];

    if (target.name === dragBlock!.name) return;
    if (
      dragBlock?.active &&
      dragBlock.prev.length > 0 &&
      dragBlock.prev[0] === target.name
    ) {
      setDragOver(false);
      return;
    }

    const newModelJson = linkBlock(dragBlock!, target, modelJson);
    setModelJson(newModelJson);
    setDragOver(false);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    setDragOver(true);
  };

  const onDragLeave = () => {
    setDragOver(false);
  };

  const onContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setTimeout(() => {
      setRightClick({
        target: props.name,
        x: event.clientX,
        y: event.clientY,
      });
    });
  };

  const onParamsChange = (
    event: React.FormEvent<HTMLInputElement> | any,
    index: number
  ) => {
    setParams((prev) => {
      const newParams = [...prev];
      const newParam = [prev[index][0], event.target.value];
      newParams[index] = newParam;

      return newParams;
    });
  };

  const onBlur = (event: any) => {
    console.log(params);
    // const newModelJson = { ...modelJson };
    // const newBlockMap = { ...newModelJson.blockMap };
    // newBlockMap[props.name] = {
    //   ...newBlockMap[props.name],
    //   parameters: params,
    // };
    // newModelJson.blockMap = newBlockMap;

    // setModelJson(newModelJson);
  };

  return (
    <SBlock
      draggable="true"
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      {...(props.active && {
        onBlur,
        onDrop,
        onDragOver,
        onDragLeave,
        onContextMenu,
      })}
      ref={$block}
      dragOver={dragOver}
    >
      <BlockName>{props.originName ?? props.name}</BlockName>
      {props.active && (
        <ParamsBox>
          {props.parameters.map((params, i) => {
            if (params.length === 1) {
              return (
                <ParamsRow key={`${props.name}param${i}`}>
                  <label>{params[0]}</label>
                  <input
                    type="text"
                    onChange={(event) => onParamsChange(event, i)}
                  />
                </ParamsRow>
              );
            }
          })}
        </ParamsBox>
      )}
    </SBlock>
  );
};

export default Block;
