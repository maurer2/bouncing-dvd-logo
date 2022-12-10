import type { useRef, MutableRefObject } from 'react';

export type UseCollisionDetection = [
  hasCollidedWithStart: MutableRefObject<boolean>,
  hasCollidedWithEnd: MutableRefObject<boolean>,
];
