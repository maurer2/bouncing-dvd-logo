import { renderHook, act } from '@testing-library/react-hooks';

import { colours } from '../../Store';

import customHook from './useColour';

describe('useColourHook', () => {
  let result;

  beforeEach(() => {
    result = renderHook(() => customHook([...colours])).result;
  });

  it('should not return empty array', () => {
    expect(result.current).not.toEqual([]);
  });

  it('should return white as default colour', () => {
    const [colour] = result.current;
    expect(colour).toBe('white');
  });

  it('should not return white as colour after triggering changeColor CB', () => {
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).not.toBe('white');
  });

  it('should not return previous colour after triggering changeColor CB', () => {
    const prevColours: string[] = ['white'];

    const cycles = Array.from(Array(colours.length ** 2).keys());

    cycles.forEach(() => {
      act(() => {
        result.current[1]();
      });
      expect(result.current[0]).not.toBe(prevColours.at(-1));
      prevColours.push(result.current[0]);
    });
  });
});
