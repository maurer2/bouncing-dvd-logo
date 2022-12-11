import styled from 'styled-components';

export const GameWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const PauseButton = styled.button`
  all: unset;
  position: absolute;
  inset: 0;
  width: 100%; // needed in Firefox
  overflow: hidden;
  cursor: pointer;
`;
