import styled from 'styled-components';

import { ReactComponent as SoundIcon } from '../assets/sound.svg';
import { useIsSoundDisabled } from '../Store2';

import type SoundToggle from './SoundToggle';

type SoundToggleStyleProps = {
  $isSoundDisabled: ReturnType<typeof useIsSoundDisabled>;
};

export const SoundToggleButton = styled.button.attrs(() => ({ type: 'button' }))`
  all: unset;
  position: absolute;
  bottom: 0.5rem;
  right: 0.5em;
  cursor: pointer;
`;

export const SoundToggleIcon = styled(SoundIcon)<SoundToggleStyleProps>`
  display: block;

  .soundwaves {
    display: ${({ $isSoundDisabled }) => ($isSoundDisabled ? 'none' : 'block')};
  }
`;
