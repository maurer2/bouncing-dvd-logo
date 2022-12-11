import styled from 'styled-components';

import { ReactComponent as SoundIcon } from '../assets/sound.svg';

import type { SoundToggleStyleProps } from './SoundToggle.types';

export const SoundToggle = styled.button.attrs(() => ({ type: 'button' }))`
  display: flex;
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  padding: 0;
  border: 0;
  background: none;
  color: white;
  outline: none;
  cursor: pointer;
  width: 5vw;
  height: 5vw;
  min-width: 50px;
  min-height: 50px;
`;

export const SoundToggleIcon = styled(SoundIcon)<SoundToggleStyleProps>`
  display: block;
  fill: currentColor;
  transform: rotate(45deg);

  .sound-waves {
    ${({ $status }: SoundToggleStyleProps) => $status === 'inactive' && 'display: none;'}
  }
`;
