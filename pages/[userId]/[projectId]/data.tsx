import Layout from '@components/project/Layout';
import Seo from '@components/Seo';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import styled from 'styled-components';
import { MdArrowForwardIos } from 'react-icons/md';
import ToggleBtn from '@components/ToggleBtn';
import InputModal from '@components/project/data/InputModal';
import OutputModal from '@components/project/data/OutputModal';
import ImageModal from '@components/project/data/ImageModal';

interface IRow {
  clickAble?: boolean;
}

interface IInOutput {
  type: string;
}

interface IImageAction {
  resize?: {
    x: number;
    y: number;
  };
  rotate?: number;
}

interface IImageWrap {
  rotate?: number;
}

const Container = styled.div`
  width: 100%;
  height: ${(props) =>
    `calc(100vh - ${
      props.theme.header.height +
      props.theme.project.tabHeight +
      props.theme.project.utilHeight
    }px)`};
  background-color: #f0f0f0;
  padding: 0 20px;
  padding-top: 30px;
`;

const BoxLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  & > div {
    width: 100%;
    display: flex;
    gap: 20px;
  }
  min-width: 1200px;
  max-width: 1400px;
  /* margin: 0 auto; */
`;

const SettingBox = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 7px;
  box-shadow: 0 0 10px -3px #95a5a6;
  padding: 20px;
`;

const Title = styled.h3`
  font-size: 17px;
  font-weight: 500;
  font-family: 'Poppins', 'Spoqa Han Sans Neo', 'sans-serif';
`;

const Explanation = styled.p`
  font-size: 14px;
  line-height: 1.2;
  margin-top: 13px;
  min-height: 50px;
`;

const Row = styled.div<IRow>`
  padding: 8px 0;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: ${(props) => (props.clickAble ? 'pointer' : 'initial')};
`;

const Arrow = styled.span`
  display: flex;
  font-size: 20px;
  color: ${(props) => props.theme.textColor};
`;

const Label = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  & > label {
    font-size: 15px;
  }

  & > span {
    font-size: 12px;
    color: #707070;
  }
`;

const Input = styled.input`
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 6px 10px;
  background: transparent;
  border-radius: 4px;
  width: 100px;
  color: ${(props) => props.theme.textColor};
`;

const Select = styled.select`
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 8px 10px;
  font-size: 15px;
  background: transparent;
  border-radius: 4px;
  width: 150px;
  color: ${(props) => props.theme.textColor};
`;

const ImageLayout = styled.div`
  display: flex;
  gap: 20px;

  & > div {
    width: 100%;
  }
`;

const ImageBox = styled.div`
  width: 100%;
  height: 190px;
  background-color: #e0e0e0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageWrap = styled.div<IImageWrap>`
  position: absolute;
  transform: ${(props) =>
    props.rotate !== undefined ? `rotate(${props.rotate}deg)` : ''};

  ${Input} {
    width: 50px;
    height: 25px;
    background-color: #ffffff;
    font-size: 13px;
    position: absolute;
    text-align: center;
  }

  ${Input}:nth-child(2) {
    top: -35px;
    left: 50%;
    transform: translateX(-50%);
  }
  ${Input}:nth-child(3) {
    top: 50%;
    right: -60px;
    transform: translateY(-50%);
  }

  span {
    position: absolute;
    display: flex;
    font-size: 16px;
  }
  span:nth-child(2) {
    top: -30px;
    left: 50%;
    transform: translateX(-50%)
      ${(props) =>
        props.rotate !== undefined ? `rotate(-${props.rotate}deg)` : ''};
  }
  span:nth-child(3) {
    top: 50%;
    right: -30px;
    transform: translateY(-50%)
      ${(props) =>
        props.rotate !== undefined ? `rotate(-${props.rotate}deg)` : ''};
  }
`;

const Image = styled.div`
  width: 90px;
  height: 90px;
  background-color: #ffffff;
  box-shadow: 0 0 10px 0 #c0c0c0;
`;

const Data: NextPage = () => {
  const [options, setOptions] = useState([false, false, false]);
  const [modalShow, setModalShow] = useState<string | undefined>(undefined);

  const [input, setInput] = useState<IInOutput[]>([]);
  const [output, setOutput] = useState<IInOutput[]>([]);
  const [imageAction, setImageAction] = useState<IImageAction>({});
  const [imageSize, setImageSize] = useState({
    x: 1,
    y: 1,
  });

  const toggleOptions = (num: number) => {
    setOptions((prev) => {
      const newOptions = [...prev];
      newOptions[num] = !newOptions[num];

      return newOptions;
    });
  };

  const onImageSizeChange = (
    event: React.FormEvent<HTMLInputElement>,
    pos: string
  ) => {
    const {
      currentTarget: { value },
    } = event;
    setImageSize((prev) => {
      const newPos = {} as any;
      newPos[pos] = Number(value);

      return {
        ...prev,
        ...newPos,
      };
    });
  };

  return (
    <Layout>
      <Seo />
      <Container>
        <BoxLayout>
          <div>
            <SettingBox>
              <Title>Input, Output Set up</Title>
              <Explanation>
                These are input output set up. These are input output set up
              </Explanation>
              <Row clickAble={true} onClick={() => setModalShow('input')}>
                <Label>
                  <label>Input</label>
                  <span>{input.length} inputs</span>
                </Label>
                <Arrow>
                  <MdArrowForwardIos />
                </Arrow>
              </Row>
              <Row clickAble={true} onClick={() => setModalShow('output')}>
                <Label>
                  <label>Output</label>
                  <span>{output.length} outputs</span>
                </Label>
                <Arrow>
                  <MdArrowForwardIos />
                </Arrow>
              </Row>
            </SettingBox>
            <SettingBox>
              <Title>Data, Batch size Set up</Title>
              <Explanation>These are data batch size set up</Explanation>
              <Row>
                <Label>
                  <label>Data folder</label>
                </Label>
                <Input type="text" />
              </Row>
              <Row>
                <Label>
                  <label>Batch size</label>
                </Label>
                <Input type="number" defaultValue={0} />
              </Row>
            </SettingBox>
            <SettingBox>
              <Title>Options Set up</Title>
              <Explanation>These are options set up</Explanation>
              <Row>
                <Label>
                  <label>Use valid dataset</label>
                </Label>
                <ToggleBtn
                  state={options[0]}
                  onClick={() => toggleOptions(0)}
                />
              </Row>
              <Row>
                <Label>
                  <label>Valid dataset from train dataset</label>
                </Label>
                <ToggleBtn
                  state={options[1]}
                  onClick={() => toggleOptions(1)}
                />
              </Row>
              <Row>
                <Label>
                  <label>Train dataset: Valid dataset ratio</label>
                </Label>
                <ToggleBtn
                  state={options[2]}
                  onClick={() => toggleOptions(2)}
                />
              </Row>
            </SettingBox>
          </div>
          <div>
            <SettingBox>
              <Title>Image 2 Preprocessing</Title>
              <Explanation>
                Image 2 Preprocessing Image 2 Preprocessing
              </Explanation>
              <ImageLayout>
                <div>
                  <Row>
                    <Label>
                      <label>Type</label>
                    </Label>
                    <Select>
                      <option>Dropdown</option>
                    </Select>
                  </Row>
                  <Row>
                    <Label>
                      <label>Channel</label>
                    </Label>
                    <Select>
                      <option>Dropdown</option>
                    </Select>
                  </Row>
                </div>
                <div>
                  <ImageBox>
                    <ImageWrap>
                      <Image />
                      <Input
                        type="number"
                        value={imageSize.x}
                        onChange={(event) => onImageSizeChange(event, 'x')}
                      />
                      <Input
                        type="number"
                        value={imageSize.y}
                        onChange={(event) => onImageSizeChange(event, 'y')}
                      />
                    </ImageWrap>
                  </ImageBox>
                </div>
              </ImageLayout>
            </SettingBox>
            <SettingBox>
              <Title>Image 2 Preprocessing</Title>
              <Explanation>
                Image 2 Preprocessing Image 2 Preprocessing
              </Explanation>
              <ImageLayout>
                <div>
                  <Row clickAble={true} onClick={() => setModalShow('image')}>
                    <Label>
                      <label>Select Action</label>
                    </Label>
                    <Arrow>
                      <MdArrowForwardIos />
                    </Arrow>
                  </Row>
                </div>
                <div>
                  <ImageBox>
                    <ImageWrap rotate={imageAction.rotate || 0}>
                      <Image />
                      <span>{imageAction.resize?.x || imageSize.x}</span>
                      <span>{imageAction.resize?.y || imageSize.y}</span>
                    </ImageWrap>
                  </ImageBox>
                </div>
              </ImageLayout>
            </SettingBox>
          </div>
          {modalShow === 'input' && (
            <InputModal
              resetFn={() => setModalShow(undefined)}
              data={input}
              setData={setInput}
            />
          )}
          {modalShow === 'output' && (
            <OutputModal
              resetFn={() => setModalShow(undefined)}
              data={output}
              setData={setOutput}
            />
          )}
          {modalShow === 'image' && (
            <ImageModal
              resetFn={() => setModalShow(undefined)}
              data={imageAction}
              setData={setImageAction}
            />
          )}
        </BoxLayout>
      </Container>
    </Layout>
  );
};

export default Data;

export const getServerSideProps = async (ctx: any) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ['common'])),
    },
  };
};
