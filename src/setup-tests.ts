import '@testing-library/jest-dom/vitest';
// eslint-disable-next-line import-x/no-namespace
import * as matchers from 'jest-extended';
import { expect } from 'vitest';
// https://brightinventions.pl/blog/snapshot-testing-styled-components-with-vitest/
// @ts-ignore types can't be loaded
import { styleSheetSerializer } from 'jest-styled-components/serializer';

// @ts-ignore types can't be loaded
expect.addSnapshotSerializer(styleSheetSerializer as any);

vi.mock('zustand'); // to make it work like Jest (auto-mocking)
expect.extend(matchers);
