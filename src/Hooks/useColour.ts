import { useState, useCallback } from 'react';
import { random } from 'lodash';

export default function useColour(colours): Readonly<[any, () => void]> {
  const [colour, setColour] = useState(colours[0]);

  const setNewColour = useCallback(() => {
    const newColours = colours.filter((colourEntry) => colourEntry !== colour);
    const randomColourIndex = random(newColours.length - 1);
    const newColour = newColours[randomColourIndex];

    setColour(newColour);
  }, [colour, colours]);

  return [colour, setNewColour] as const;
}
