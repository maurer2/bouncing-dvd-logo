import type { Theme } from './tokens';

declare module 'styled-components' {
  // oxlint-disable-next-line typescript/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}
