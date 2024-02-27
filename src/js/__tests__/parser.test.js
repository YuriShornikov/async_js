import json from '../parser';

jest.setTimeout(15000);

test('testing error', async () => {
  const data = 'invalidData';
  const result = await json(data);

  expect(result).toEqual(expect.any(String));
});
