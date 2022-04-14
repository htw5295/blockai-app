import styled from 'styled-components';

export interface ModalProps {
  resetFn: any;
}

interface IModalGrid {
  col: number;
}

export const ModalContainer = styled.div`
  padding: 20px;
`;

export const Title = styled.h3`
  font-size: 19px;
`;

export const ModalGrid = styled.div<IModalGrid>`
  margin-top: 30px;
  display: grid;
  grid-template-columns: ${(props) => `${'220px '.repeat(props.col)}50px`};
  row-gap: 5px;

  label {
    font-size: 16px;
    margin-left: 15px;
    margin-right: 3px;
  }

  label:nth-child(1) {
    margin-left: 0;
  }
`;

export const ModalGridHeader = styled.div`
  border-bottom: 2px solid ${(props) => props.theme.accent1Color};
  padding-bottom: 5px;
  margin-bottom: 5px;
`;

export const ModalRemoveBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 100%;
  align-items: center;
  button {
    color: #e74c3c;
    padding-left: 5px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ModalAddBtn = styled.div`
  margin-top: 20px;
  button {
    color: ${(props) => props.theme.accent1Color};
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ModalBtnBox = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 40px;
  width: 100%;

  button {
    border-radius: 4px;
    padding: 6px 20px;
    color: #ffffff;
    font-size: 15px;
  }

  button:nth-child(1) {
    background-color: #9e9e9e;
  }
  button:nth-child(2) {
    background-color: ${(props) => props.theme.accent1Color};
  }
`;

interface IInput {
  width?: string;
}

export const Input = styled.input`
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 6px 10px;
  background: transparent;
  border-radius: 4px;
  width: ${(props) => (props.width ? props.width : '100px')};
  color: ${(props) => props.theme.textColor};
`;

export const Select = styled.select`
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 8px 10px;
  font-size: 15px;
  background: transparent;
  border-radius: 4px;
  width: 150px;
  color: ${(props) => props.theme.textColor};
`;
