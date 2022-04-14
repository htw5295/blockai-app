import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';

const Container = styled.div`
  width: 250px;
  height: 33px;
  border: 1px solid #707070;
  border-radius: 100px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 10px;

  svg {
    font-size: 18px;
    color: #a0a0a0;
  }

  input {
    background-color: transparent;
    border: none;
    outline: none;
    color: #ffffff;
    font-size: 13px;
    width: 100%;

    &::placeholder {
      color: #a0a0a0;
    }
  }
`;

const Search = () => {
  return (
    <Container>
      <AiOutlineSearch />
      <input type="text" placeholder="검색" />
    </Container>
  );
};

export default Search;
