import '@testing-library/jest-dom/vitest';
import * as matchers from 'jest-extended';
import { expect } from 'vitest';
// https://brightinventions.pl/blog/snapshot-testing-styled-components-with-vitest/
// @ts-ignore
import { styleSheetSerializer } from 'jest-styled-components/serializer';

expect.addSnapshotSerializer(styleSheetSerializer as any);

vi.mock('zustand'); // to make it work like Jest (auto-mocking)
expect.extend(matchers);
