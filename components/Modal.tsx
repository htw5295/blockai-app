import React, { useRef } from 'react';
import styled from 'styled-components';

interface IContainer {
  ref: React.RefObject<HTMLDivElement>;
}

const Container = styled.div<IContainer>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 0;
`;

const Box = styled.div`
  box-shadow: 0 0 10px -3px #000000;
  border-radius: 9px;
  background-color: #ffffff;
`;

interface ModalProps {
  children: React.ReactNode;
  resetFn: any;
}

export default function Modal({ children, resetFn }: ModalProps) {
  const $container = useRef<HTMLDivElement>(null);

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === $container.current) {
      resetFn();
    }
  };
  return (
    <Container ref={$container} onClick={onClick}>
      <Box>{children}</Box>
    </Container>
  );
}
