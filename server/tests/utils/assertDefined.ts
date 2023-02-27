export default function assertDefined<T>(
  value: T | null | undefined
): asserts value is T {
  expect(value).not.toEqual(null);
}
