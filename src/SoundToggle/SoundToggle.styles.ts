import styled from 'styled-components';

import SoundIcon from '../assets/sound.svg?react';
import type { useIsSoundDisabled } from '../Store2';

type SoundToggleStyleProps = {
  $isSoundDisabled: ReturnType<typeof useIsSoundDisabled>;
};

export const SoundToggleButton = styled.button.attrs(() => ({ type: 'button' }))`
  all: unset;
  position: absolute;
  inset-block-end: 0.5rem;
  inset-inline-end: 0.5em;
  cursor: pointer;
`;

export const SoundToggleIcon = styled(SoundIcon)<SoundToggleStyleProps>`
  display: block;

  .soundwaves {
    display: ${({ $isSoundDisabled }) => ($isSoundDisabled ? 'none' : 'block')};
  }
`;
