import { IBlockData, modelKey } from '@libs/const';
import React, { useState } from 'react';
import styled from 'styled-components';
import Block from './Block';

interface TabProps {
  current: boolean;
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Tabs = styled.div`
  background-color: ${(props) => props.theme.borderColor};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
`;

const Tab = styled.div<TabProps>`
  background-color: ${(props) =>
    props.current ? props.theme.accent1Color : props.theme.bgColor};
  color: ${(props) => (props.current ? '#ffffff' : '#404040')};
  font-size: 13px;
  font-family: 'Poppins', sans-serif;
  height: 30px;
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SearchBox = styled.div`
  height: 45px;
  min-height: 45px;
  width: 100%;
  background-color: ${(props) => props.theme.accent1Color};
  display: flex;
  align-items: center;
  padding: 0 10px;
  input {
    width: 100%;
    border: none;
    outline: none;
    border-radius: 100px;
    font-size: 13px;
    padding: 3px 13px;
  }
`;

const BlockList = styled.div`
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Menu = (props: IBlockData) => {
  const [cntTab, setCntTab] = useState({
    key: modelKey.Layer as string,
    data: props.Layer,
  });
  const [keyword, setKeyword] = useState('');

  const tabList = [
    modelKey.Layer,
    modelKey.Operation,
    modelKey.Activation,
    modelKey.Loss,
    modelKey.Custom,
  ];

  const onTabClick = (key: string) => {
    setCntTab({
      key,
      data: props[key],
    });
  };

  const onKeywordChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setKeyword(value);
  };

  return (
    <Container>
      <Tabs>
        {tabList.map((tab) => (
          <Tab
            current={cntTab.key === tab}
            key={`tab${tab}`}
            onClick={() => onTabClick(tab)}
          >
            {tab}
          </Tab>
        ))}
      </Tabs>
      <SearchBox>
        <input
          type="text"
          placeholder="검색"
          value={keyword}
          onChange={onKeywordChange}
        />
      </SearchBox>
      <BlockList>
        {cntTab.data &&
          cntTab.data.map((block, i) => {
            const lowerKeyword = keyword.toLocaleLowerCase();
            const lowerBlockName = block.name.toLocaleLowerCase();
            if (lowerBlockName.includes(lowerKeyword)) {
              return (
                <Block key={`${block.name}${i}`} {...block} active={false} />
              );
            }
          })}
      </BlockList>
    </Container>
  );
};

export default Menu;
