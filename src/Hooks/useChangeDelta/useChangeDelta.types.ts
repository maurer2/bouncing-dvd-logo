import type { useRef } from 'react';

export type UseChangeDelta = [
  changeDelta: ReturnType<typeof useRef<number>>
];
