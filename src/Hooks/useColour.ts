import { useState, useCallback } from 'react';
import { random } from 'lodash-es';

export default function useColour(colours: string[]): Readonly<[string, () => void]> {
  const [colour, setColour] = useState(colours[0]);

  const changeColour = useCallback(() => {
    const newColours = colours.filter((colourEntry) => colourEntry !== colour);
    const randomColourIndex = random(newColours.length - 1);
    const newColour = newColours[randomColourIndex];

    setColour(newColour);
  }, [colour, colours]);

  return [colour, changeColour] as const;
}
