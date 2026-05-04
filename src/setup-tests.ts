import '@testing-library/jest-dom/vitest';
// eslint-disable-next-line import-x/no-namespace
import * as matchers from 'jest-extended';
import { expect } from 'vitest';
// https://brightinventions.pl/blog/snapshot-testing-styled-components-with-vitest/
import { styleSheetSerializer } from 'jest-styled-components/serializer';

// @ts-expect-error types can't be loaded for some reason
expect.addSnapshotSerializer(styleSheetSerializer);

vi.mock('zustand'); // to make it work like Jest (auto-mocking)
expect.extend(matchers);
