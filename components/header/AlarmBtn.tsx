import { VscBell } from 'react-icons/vsc';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;

  svg {
    font-size: 23px;
  }
`;

const AlarmBtn = () => {
  return (
    <Container>
      <VscBell />
    </Container>
  );
};

export default AlarmBtn;
