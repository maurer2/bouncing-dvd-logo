import '@testing-library/jest-dom/vitest';
import * as matchers from 'jest-extended';
// https://brightinventions.pl/blog/snapshot-testing-styled-components-with-vitest/
import { styleSheetSerializer } from 'jest-styled-components/serializer';
import { expect } from 'vitest';

// @ts-expect-error types can't be loaded for some reason
expect.addSnapshotSerializer(styleSheetSerializer);

vi.mock('zustand'); // to make it work like Jest (auto-mocking)
expect.extend(matchers);
