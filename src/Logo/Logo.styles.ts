import styled from 'styled-components';

export const LogoElement = styled.figure`
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 138.66px;
  margin: 0;
  will-change: translate;
  contain: strict;

  translate: var(--translate-x) var(--translate-y);
  color: var(--colour);
`;
