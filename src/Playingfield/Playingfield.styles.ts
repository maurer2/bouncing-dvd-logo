import styled from 'styled-components';

type PlayingFieldWrapperStyleProps = {
  $isPaused: boolean;
};

export const PlayingFieldWrapper = styled.div<PlayingFieldWrapperStyleProps>`
  position: relative;
  width: 100%;
  height: 100%;
  transform: translateZ(0);
  pointer-events: none;
  filter: ${({ $isPaused }) => ($isPaused ? 'invert(50%) brightness(0.25);' : 'none')};
  transition: filter 0.1s;
  contain: strict;
  will-change: filter;
`;
