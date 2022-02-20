import { useState, useCallback } from 'react';

type UseColor = [colour: string, changeColour: () => void];

export default function useColour(colours: string[]): Readonly<UseColor> {
  const [colour, setColour] = useState(colours[0]);

  const changeColour = useCallback(() => {
    const newColours = colours.filter((colourEntry) => colourEntry !== colour);

    const randomColourIndex = Math.floor(Math.random() * newColours.length);
    const newColour = newColours[randomColourIndex];

    setColour(newColour);
  }, [colour, colours]);

  return [colour, changeColour] as const;
}
