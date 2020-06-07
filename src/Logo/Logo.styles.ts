import styled from 'styled-components/macro';

export const LogoElement = styled.figure.attrs((props) => ({ style: { transform: `translate(${Math.floor(props.positionX)}px, ${Math.floor(props.positionY)}px)` } }))`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => `${props.widthValue}px`};
  height: ${(props) => `${props.heightValue}px`};
  margin: 0;
  color: ${(props) => `${props.colourValue}`};
  will-change: transform;
  opacity: ${(({ isPaused }) => (isPaused ? '0.25' : '1'))};
`;
