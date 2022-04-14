import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import styled from 'styled-components';
import { IoHomeOutline, IoPeopleOutline } from 'react-icons/io5';
import { AiOutlineClockCircle, AiOutlineFolderAdd } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userState } from '@libs/atom';

interface TabProps {
  current: boolean;
}

const Container = styled.div`
  position: fixed;
  top: ${(props) => `${props.theme.header.height}px`};
  left: 0;
  width: ${(props) => `${props.theme.sidebar.width}px`};
  height: ${(props) => `calc(100vh - ${props.theme.header.height}px)`};
  border-right: 1px solid ${(props) => props.theme.borderColor};
  padding: 20px 0;
`;

const Tab = styled.a<TabProps>`
  display: flex;
  width: 100%;
  height: 45px;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  font-size: 15px;
  background-color: ${(props) =>
    props.current ? props.theme.sidebar.accentColor : 'transparent'};

  & > div:first-child {
    display: flex;
    align-items: center;
    gap: 7px;
    svg {
      font-size: 18px;
    }
  }
`;

const NewProjectBtn = styled.a`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 13px;
  background-color: ${(props) => props.theme.accent1Color};
  color: #ffffff;
  gap: 5px;
  svg {
    font-size: 20px;
  }
`;

const ProjectList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px 0;
  padding-left: 15px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-right: none;
  border-left: none;

  font-size: 14px;
  list-style-type: disc;
`;

const ProjectListBox = styled.div`
  padding: 0 20px;
  margin-bottom: 20px;
`;

const Sidebar = () => {
  const user = useRecoilValue(userState);
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Container>
      <Link href="/">
        <Tab current={router.pathname === '/'}>
          <div>
            <IoHomeOutline />
            <span>{t('sidebar.home')}</span>
          </div>
        </Tab>
      </Link>
      <Tab as="div" current={false}>
        <div>
          <AiOutlineClockCircle />
          <span>{t('sidebar.recentProject')}</span>
        </div>
        <Link href="/">
          <NewProjectBtn>
            <span>New</span>
            <AiOutlineFolderAdd />
          </NewProjectBtn>
        </Link>
      </Tab>
      <ProjectListBox>
        {user && user.recent && (
          <ProjectList>
            {user.recent.map((project) => (
              <li key={`project${project.id}`}>
                <Link href={`/${user.id}/${project.id}`}>
                  <a>{project.title}</a>
                </Link>
              </li>
            ))}
          </ProjectList>
        )}
      </ProjectListBox>
      <Link href="/community">
        <Tab current={router.pathname === '/community'}>
          <div>
            <IoPeopleOutline />
            <span>{t('sidebar.community')}</span>
          </div>
        </Tab>
      </Link>
    </Container>
  );
};

export default Sidebar;
