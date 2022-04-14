import Logo from '@components/Logo';
import Seo from '@components/Seo';
import { Wrapper } from '@styles/styles';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

interface IForm {
  id: string;
  pw: string;
}

const Container = styled.div`
  padding-top: 100px;
  min-height: ${(props) => `calc(100vh - ${props.theme.header.height}px)`};
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
`;

const LoginBox = styled.div`
  width: 100%;
  max-width: 370px;
  background-color: #ffffff;
  height: 350px;
  border-radius: 12px;
  box-shadow: 0 0 10px -3px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 50px;
  gap: 10px;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #c0c0c0;
  padding: 7px 12px;
  font-size: 15px;
`;

const LoginBtn = styled.button`
  background-color: ${(props) => props.theme.accent1Color};
  color: #ffffff;
  padding: 12px 0;
  margin-top: 10px;
`;

const Login = () => {
  const { register, handleSubmit } = useForm<IForm>({
    defaultValues: {
      id: 'test',
      pw: 'test',
    },
  });

  const onValid = (data: IForm) => {};
  return (
    <Container>
      <Seo title="Login" />
      <LoginBox>
        <Link href="/">
          <a>
            <Logo width={30} fontSize={22} />
          </a>
        </Link>
        <Form onSubmit={handleSubmit(onValid)}>
          <Input {...register('id', { required: true })} placeholder="아이디" />
          <Input
            {...register('pw', { required: true })}
            type="password"
            placeholder="비밀번호"
          />
          <LoginBtn>로그인</LoginBtn>
        </Form>
      </LoginBox>
    </Container>
  );
};

export default Login;
