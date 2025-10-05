import styled from 'styled-components';
import type { ComponentProps } from 'react';

import { ReactComponent as SoundIcon } from '../assets/sound.svg';

import type SoundToggle from './SoundToggle';

type SoundToggleProps = ComponentProps<typeof SoundToggle>;
type SoundToggleStyleProps = {
  $isSoundDisabled: SoundToggleProps['isSoundDisabled'];
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
