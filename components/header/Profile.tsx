import styled from 'styled-components';
import { IoMdArrowDropdown } from 'react-icons/io';

const Container = styled.div`
  display: flex;
`;

const Image = styled.div`
  width: 27px;
  height: 27px;
  border-radius: 100%;
  background-color: #9b59b6;
`;

const ImageIcon = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 3px;
`;

const Profile = () => {
  return (
    <Container>
      <ImageIcon>
        <Image></Image>
        <IoMdArrowDropdown />
      </ImageIcon>
    </Container>
  );
};

export default Profile;
