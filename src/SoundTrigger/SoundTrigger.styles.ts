import styled from 'styled-components';

import { ReactComponent as SoundIcon } from '../assets/sound.svg';

import type { SoundTriggerStyleProps } from './SoundTrigger.types';

export const SoundTrigger = styled.button.attrs(() => ({ type: 'button' }))`
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


export const SoundTriggerIcon = styled(SoundIcon)<SoundTriggerStyleProps>`
  display: block;
  fill: currentColor;
  transform: rotate(45deg);

  .sound-waves {
    ${({ status }: SoundTriggerStyleProps) => status === 'inactive' && 'display: none;'}
  }
`;

export const SoundTriggerText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
`;
