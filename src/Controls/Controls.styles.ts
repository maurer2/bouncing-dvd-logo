import styled from 'styled-components';

import { ReactComponent as SoundIcon } from '../assets/sound.svg';

import { ControlStyleProps } from './Controls.types';

export const Controls = styled.div`
  display: flex;
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
`;

export const Control = styled.button.attrs(() => ({ type: 'button' }))`
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

export const Icon = styled(SoundIcon)<ControlStyleProps>`
  display: block;
  fill: currentColor;
  transform: rotate(45deg);

  .sound-waves {
    ${(props) => props.status === 'inactive' && 'display: none;'}
  }
`;
