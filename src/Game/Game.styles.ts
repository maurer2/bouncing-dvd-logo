import styled from 'styled-components';

export const GameWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  color: white;
  cursor: pointer;
  transition: filter 0.15s ease-in-out;
  overflow: hidden;
  outline: none;
`;

export const PauseButton = styled.button`
  position: absolute;
  inset: 0;
  appearance: none;
  background: 0;
  padding: 0;
  border: 0;
  outline: none;
  text-indent: 9999px;
  overflow: hidden;
`;
