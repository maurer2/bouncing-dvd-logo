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
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
