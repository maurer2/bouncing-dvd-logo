import type { ReactElement, SVGProps } from 'react';
/* eslint-disable @typescript-eslint/no-explicit-any */

declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.wav' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  // allows import of svg as react components
  export const ReactComponent: (props: SVGProps<SVGSVGElement>) => ReactElement;
  const src: string;
  export default src;
}
