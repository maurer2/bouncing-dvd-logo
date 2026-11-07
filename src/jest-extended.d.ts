// vitest5 https://github.com/jest-community/jest-extended/issues/983
import 'vitest';

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Matchers<R, T> extends jest.Matchers<R> {}
}
