import styled from 'styled-components/macro';

// eslint-disable-next-line import/prefer-default-export
export const LogoElement = styled.div.attrs((props) => ({
  style: {
    transform: `translate(${Math.round(props.positionX)}px, ${Math.round(props.positionY)}px)`,
  },
}))`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => `${props.widthValue}px`};
  height: ${(props) => `${props.heightValue}px`};
  color: ${(props) => `${props.colourValue}`};
  will-change: transform;
`;
