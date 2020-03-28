import styled from 'styled-components/macro';

// eslint-disable-next-line import/prefer-default-export
export const GameWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  color: white;
  cursor: pointer;
  transition: filter 0.15s ease-in-out;
  filter: ${(({ isPaused }) => (isPaused ? 'opacity(0.25)' : 'opacity(1)'))};
  overflow: hidden;
`;
