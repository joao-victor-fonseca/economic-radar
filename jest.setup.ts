/// <reference lib="dom" />

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => `<img {...props} />`,
}));
