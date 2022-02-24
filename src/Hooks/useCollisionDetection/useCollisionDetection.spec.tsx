import { renderHook } from '@testing-library/react-hooks';

import customHook from './useCollisionDetection';

type Params = [position: number, objectSize: number, worldSize: number];

const defaultProps: Params = [100, 200, 1000];

describe('useCollisionDetection', () => {
  const setup = (props: Params = defaultProps) => renderHook(() => customHook(...props));

  it('should return a value', () => {
    const { result } = setup();

    expect(typeof result.current[0].current).toBe('boolean');
    expect(typeof result.current[1].current).toBe('boolean');
  });

  it('should return positive collisionWithStart when position is negative', () => {
    const props: Params = [-10, 200, 1000];

    const { result } = setup(props);

    expect(result.current[0].current).toBe(true);
  });

  it('should return positive collisionWithStart when position is 0', () => {
    const props: Params = [0, 200, 1000];

    const { result } = setup(props);

    expect(result.current[0].current).toBe(true);
  });

  it('should return positive collisionWithStart when position is larger than 0', () => {
    const props: Params = [1, 200, 1000];

    const { result } = setup(props);

    expect(result.current[0].current).toBe(false);
  });

  it('should return positive collisionWithStart when position is larger than 100', () => {
    const props: Params = [10, 200, 1000];

    const { result } = setup(props);

    expect(result.current[0].current).toBe(false);
  });

  it('should return positive collisionWithEnd when position is larger than world size', () => {
    const props: Params = [1001, 200, 1000];

    const { result } = setup(props);

    expect(result.current[1].current).toBe(true);
  });

  it('should return positive collisionWithEnd when position is as large as world size', () => {
    const props: Params = [1000, 200, 1000];

    const { result } = setup(props);

    expect(result.current[1].current).toBe(true);
  });

  it.skip('should return positive collisionWithEnd when position is larger than world size - object size', () => {
    const props: Params = [800, 200, 1000];

    const { result } = setup(props);

    expect(result.current[0].current).toBe(true);
  });

  it('should return false collisionWithEnd when position is as smaller than world size - object size', () => {
    const props: Params = [500, 200, 1000];

    const { result } = setup(props);

    expect(result.current[0].current).toBe(false);
  });
});
