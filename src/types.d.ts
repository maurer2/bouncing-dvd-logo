// oxlint-disable @typescript-eslint/no-explicit-any

declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.wav' {
  const value: any;
  export default value;
}

declare module '*.vtt' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const src: string;
  export default src;
}
