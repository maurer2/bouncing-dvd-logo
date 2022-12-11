import styled from 'styled-components';

import { ReactComponent as SoundIcon } from '../assets/sound.svg';

import type { SoundToggleStyleProps } from './SoundToggle.types';

export const SoundToggle = styled.button.attrs(() => ({ type: 'button' }))`
  all: unset;
  position: absolute;
  bottom: 0.5rem;
  right: 0.5em;
  cursor: pointer;
`;

export const SoundToggleIcon = styled(SoundIcon)<SoundToggleStyleProps>`
  display: block;

  .soundwaves {
    display: ${({ $soundIsDisabled }) => ($soundIsDisabled ? 'none' : 'block')};
  }
`;
