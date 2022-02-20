import { renderHook, act } from '@testing-library/react-hooks';

import customHook from './useChangeDelta';

type Params = [
  startValue: number,
  hasCollided: boolean,
]

const defaultProps: Params = [
  50,
  false,
];

describe('useChangeDelta', () => {
  const setup = (props: Params = defaultProps) => renderHook(() => customHook(...props));

  it('should return a value', () => {
    const { result } = setup();

    expect(typeof result.current[0].current).toBe('number');
  });

  it('should return the same absolute value as inputted if no collision has occurred', () => {
    const { result } = setup();

    expect(Math.abs(result.current[0].current)).toBe(defaultProps[0]);
  });

  it('should not return the same absolute value as inputted if collision has occurred', () => {
    const collisionProps: Params = [
      50,
      true,
    ];

    const { result } = setup(collisionProps);

    expect(Math.abs(result.current[0].current)).not.toBe(defaultProps[0]);
  });

  it('returned value should not deviate more than maxRandomness/2 percentage', () => {
    const collisionProps: Params = [
      50,
      true,
    ];

    const { result } = setup(collisionProps);

    const upperBound = collisionProps[0] * (1 + 5 / 100);
    const lowerBound = collisionProps[0] * (1 - 5 / 100);

    const value = Math.abs(result.current[0].current);

    expect(value).toBeLessThanOrEqual(upperBound);
    expect(value).toBeGreaterThan(lowerBound);
  });
});
