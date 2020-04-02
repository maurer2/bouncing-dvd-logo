import styled from 'styled-components/macro';

// eslint-disable-next-line import/prefer-default-export
export const Controls = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const Control = styled.button.attrs(() => ({
  type: 'button',
}))`
  padding: 0.5rem 1rem;
  border: 1px solid white;
  background: none;
  color: white;
`;
