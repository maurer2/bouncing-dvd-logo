import type { useRef } from 'react';

export type UseCollisionDetection = [
  hasCollidedWithStart: ReturnType<typeof useRef<boolean>>,
  hasCollidedWithEnd: ReturnType<typeof useRef<boolean>>,
];
