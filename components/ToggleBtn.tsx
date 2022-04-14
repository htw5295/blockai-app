import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';

const Switch = styled.div`
  background-color: #ffffff;
  border-radius: 100%;
  height: 22px;
  width: 22px;
  box-shadow: 0 2px 10px -3px #101010;
  position: absolute;
`;

interface IContainer {
  state: boolean;
  width: number;
  height: number;
}

const Container = styled.div<IContainer>`
  position: relative;
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  border-radius: 100px;
  background-color: ${(props) =>
    props.state ? props.theme.accent1Color : '#dddddd'};
  padding: 2.5px;
  transition: background-color 0.15s ease-in-out;
  cursor: pointer;

  ${Switch} {
    width: ${(props) => `${props.height - 5}px`};
    height: ${(props) => `${props.height - 5}px`};
    left: ${(props) =>
      props.state ? `${props.width - props.height + 3}px` : '2.5px'};
    transition: left 0.15s ease-in-out;
  }
`;

interface ToogleBtnProps {
  state: boolean;
  width?: number;
  height?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function ToggleBtn({
  state,
  width = 58,
  height = 30,
  onClick,
}: ToogleBtnProps) {
  return (
    <Container state={state} width={width} height={height} onClick={onClick}>
      <Switch />
    </Container>
  );
}
