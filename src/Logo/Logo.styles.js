import styled from 'styled-components/macro';

// eslint-disable-next-line import/prefer-default-export
export const LogoElement = styled.figure.attrs((props) => ({
  style: {
    transform: `translate(${Math.floor(props.positionX)}px, ${Math.floor(props.positionY)}px)`,
  },
}))`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => `${props.widthValue}px`};
  height: ${(props) => `${props.heightValue}px`};
  margin: 0;
  color: ${(props) => `${props.colourValue}`};
  will-change: transform;
`;
