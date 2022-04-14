import Link from 'next/link';
import styled from 'styled-components';
import Logo from '../Logo';
import AlarmBtn from './AlarmBtn';
import LocaleBtn from './LocaleBtn';
import Profile from './Profile';
import Search from './Search';

const SHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => `${props.theme.header.height}px`};
  background-color: ${(props) => props.theme.header.bgColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const UtilBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  svg {
    color: ${(props) => props.theme.header.iconColor};
  }
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Header = () => {
  return (
    <SHeader>
      <Link href="/">
        <a>
          <Logo color="#ffffff" />
        </a>
      </Link>
      <UtilBox>
        <Search />
        <IconBox>
          <LocaleBtn />
          <AlarmBtn />
        </IconBox>
        <Profile />
      </UtilBox>
    </SHeader>
  );
};

export default Header;
