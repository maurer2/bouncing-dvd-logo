import '@testing-library/jest-dom/vitest';
import * as matchers from 'jest-extended';

vi.mock('zustand'); // to make it work like Jest (auto-mocking)
expect.extend(matchers);
