import Modal from '@components/Modal';
import React, { useEffect, useState } from 'react';
import {
  ModalContainer,
  Title,
  ModalGrid,
  ModalGridHeader,
  Select,
  ModalRemoveBtn,
  ModalAddBtn,
  ModalBtnBox,
  ModalProps,
} from './ModalElements';

interface InputModalProps extends ModalProps {
  data: {
    type: string;
  }[];
  setData: Function;
}

interface ICntData {
  type: string;
  key: number;
}

export default function InputModal({
  resetFn,
  data,
  setData,
}: InputModalProps) {
  const [cntData, setCntData] = useState<ICntData[]>(
    data.map((d, i) => ({
      type: d.type,
      key: i,
    }))
  );
  const [index, setIndex] = useState(data.length);

  const onChange = (event: React.FormEvent<HTMLSelectElement>, i: number) => {
    const {
      currentTarget: { value },
    } = event;

    setCntData((prev) => {
      const newData = [...prev];
      newData[i].type = value;
      return newData;
    });
  };

  const onAddClick = () => {
    setCntData((prev) => {
      const newData = [...prev];
      newData.push({
        type: 'image',
        key: index,
      });
      return newData;
    });
    setIndex((prev) => prev + 1);
  };

  const onRemoveClick = (i: number) => {
    setCntData((prev) => {
      const newData = [...prev];
      newData.splice(i, 1);
      return newData;
    });
  };

  const onConfirmBtn = () => {
    setData(cntData);
    resetFn();
  };

  return (
    <Modal resetFn={resetFn}>
      <ModalContainer>
        <Title>Add Input</Title>
        <ModalGrid col={1}>
          <ModalGridHeader>Total: {cntData.length}</ModalGridHeader>
          <ModalGridHeader></ModalGridHeader>
          {cntData.map((row: any, i: number) => (
            <React.Fragment key={`inputModalRow${row.key}`}>
              <div>
                <Select
                  onChange={(event) => onChange(event, i)}
                  defaultValue={row.type}
                >
                  <option value="image">Image</option>
                  <option value="text">Text</option>
                </Select>
              </div>
              <ModalRemoveBtn>
                <button onClick={() => onRemoveClick(i)}>삭제</button>
              </ModalRemoveBtn>
            </React.Fragment>
          ))}
        </ModalGrid>
        <ModalAddBtn>
          <button onClick={onAddClick}>추가</button>
        </ModalAddBtn>
        <ModalBtnBox>
          <button onClick={resetFn}>취소</button>
          <button onClick={onConfirmBtn}>확인</button>
        </ModalBtnBox>
      </ModalContainer>
    </Modal>
  );
}
