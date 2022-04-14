import Modal from '@components/Modal';
import React, { useState } from 'react';
import {
  Input,
  ModalAddBtn,
  ModalBtnBox,
  ModalContainer,
  ModalGrid,
  ModalGridHeader,
  ModalProps,
  ModalRemoveBtn,
  Select,
  Title,
} from './ModalElements';

interface ImageModalProps extends ModalProps {
  data: {
    [key: string]: any;
  };
  setData: Function;
}

interface ICntData {
  type: string;
  value: any;
  key: number;
}

export default function ImageModal({
  resetFn,
  data,
  setData,
}: ImageModalProps) {
  const [cntData, setCntData] = useState<ICntData[]>(
    Object.keys(data).map((key, i) => ({
      type: key,
      value: data[key],
      key: i,
    }))
  );
  const [index, setIndex] = useState(Object.values(data).length);

  const onTypeChange = (
    event: React.FormEvent<HTMLSelectElement>,
    i: number
  ) => {
    const {
      currentTarget: { value },
    } = event;

    setCntData((prev) => {
      const newData = [...prev];
      newData[i].type = value;

      if (value === 'resize') {
        newData[i].value = {
          x: 1,
          y: 1,
        };
      } else if (value === 'rotate') {
        newData[i].value = 0;
      }

      return newData;
    });
  };

  type options = {
    resizePos: string;
  };
  const onValueChange = (
    event: React.FormEvent<any>,
    i: number,
    options?: options
  ) => {
    const {
      currentTarget: { value },
    } = event;

    setCntData((prev) => {
      const newData = [...prev];

      if (options?.resizePos) {
        newData[i].value[options.resizePos] = value;
      } else {
        newData[i].value = value;
      }
      return newData;
    });
  };

  const onAddClick = () => {
    setCntData((prev) => {
      const newData = [...prev];
      newData.push({
        type: 'resize',
        value: {
          x: 1,
          y: 1,
        },
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
    const newData = {} as any;
    cntData.forEach((data) => {
      newData[data.type] = data.value;
    });
    setData(newData);
    resetFn();
  };

  return (
    <Modal resetFn={resetFn}>
      <ModalContainer>
        <Title>Action 추가</Title>
        <ModalGrid col={2}>
          <ModalGridHeader>Action</ModalGridHeader>
          <ModalGridHeader>Value</ModalGridHeader>
          <ModalGridHeader></ModalGridHeader>
          {cntData.map((data, i) => (
            <React.Fragment key={data.key}>
              <div>
                <Select
                  onChange={(event) => onTypeChange(event, i)}
                  defaultValue={data.type}
                >
                  <option value="resize">Resize</option>
                  <option value="rotate">Rotate</option>
                </Select>
              </div>
              {data.type === 'resize' && (
                <div>
                  <label>x: </label>
                  <Input
                    onChange={(event) =>
                      onValueChange(event, i, { resizePos: 'x' })
                    }
                    type="number"
                    value={data.value.x}
                    width="50px"
                  />
                  <label>y: </label>
                  <Input
                    onChange={(event) =>
                      onValueChange(event, i, { resizePos: 'y' })
                    }
                    type="number"
                    value={data.value.y}
                    width="50px"
                  />
                </div>
              )}
              {data.type === 'rotate' && (
                <div>
                  <Input
                    onChange={(event) => onValueChange(event, i)}
                    type="number"
                    value={data.value}
                  />
                </div>
              )}
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
