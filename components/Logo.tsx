import Image from 'next/image';
import styled from 'styled-components';

interface LogoProps {
  width?: number;
  fontSize?: number;
  color?: string;
}

const SLogo = styled.div<LogoProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Montserrat', sans-serif;
  /* font-weight: 600; */
  font-size: ${(props) => `${props.fontSize}px`};
  color: ${(props) => props.color};
  img {
    width: ${(props) => `${props.width}px`};
  }
`;

const Logo = ({ width = 24, fontSize = 18, color = '#000000' }: LogoProps) => {
  return (
    <SLogo width={width} fontSize={fontSize} color={color}>
      <img src="/img/Logo.svg" />
      <span>BLOCKAI</span>
    </SLogo>
  );
};

export default Logo;
