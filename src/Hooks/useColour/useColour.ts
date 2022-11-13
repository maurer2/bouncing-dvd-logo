import { useState, useCallback } from 'react';

import type { StoreType } from '../../Store';

import type { UseColour } from './useColor.types';

export default function useColour(colours: StoreType['colours']): Readonly<UseColour> {
  const [colour, setColour] = useState<StoreType['colours'][number]>(colours[0]);

  const changeColour = useCallback(() => {
    const newColours = colours.filter((colourEntry) => colourEntry !== colour);

    const randomColourIndex = Math.floor(Math.random() * newColours.length);
    const newColour = newColours[randomColourIndex];

    setColour(newColour);
  }, [colour, colours]);

  return [colour, changeColour] as const;
}
