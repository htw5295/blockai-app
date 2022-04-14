import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset};

  * {
    box-sizing: border-box;
  }

  body {
    line-height: 1.5;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-size: 15px;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  button {
    margin: 0;
    padding: 0;
    background-color: transparent;
    font: inherit;
    outline: none;
    border: none;
    cursor: pointer;
  }

  input, textarea {
    font: inherit;
    outline: none;
  }

  img {
    display: block;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  padding: 0 20px;
  max-width: 1200px;
  margin: 0 auto;
`;
