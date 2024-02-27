import read from "../reader";

jest.setTimeout(15000);

test('testing func', async () => {
  const promise = read();

  const result = await promise;
  expect(result).toBeInstanceOf(ArrayBuffer);
});