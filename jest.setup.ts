/// <reference lib="dom" />

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    // simple mock that returns an img tag string during tests
    return `<img />`;
  },
}));
