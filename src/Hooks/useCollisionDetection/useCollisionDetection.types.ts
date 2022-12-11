import type { MutableRefObject } from 'react';

export type UseCollisionDetection = [
  hasCollidedWithStart: MutableRefObject<boolean>,
  hasCollidedWithEnd: MutableRefObject<boolean>,
];
