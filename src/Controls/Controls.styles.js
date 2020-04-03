import styled from 'styled-components/macro';

// eslint-disable-next-line import/prefer-default-export
export const Controls = styled.div`
  display: flex;
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
`;

export const Control = styled.button.attrs(() => ({
  type: 'button',
}))`
  padding: 0;
  border: 0;
  background: none;
  color: white;
  outline: none;
  cursor: pointer;

  svg {
    display: block;
    fill: currentColor;
    transform: rotate(45deg);
  }
`;
