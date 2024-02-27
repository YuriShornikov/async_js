import GameSavingLoader from '../app';
import read from '../reader';
import json from '../parser';

jest.mock('../reader', () => jest.fn());
jest.mock('../parser', () => jest.fn());

beforeEach(() => {
  // Сброс моков перед каждым тестом
  jest.clearAllMocks();
});

test('testing GameSavingLoader', async () => {
  const expectedSaving = {
    id: 1,
    created: 1629936000,
    userInfo: {
      id: 42,
      name: 'Player',
      level: 5,
      points: 1000,
    },
  };

  // Мокируем функции read и json
  read.mockResolvedValue('fakeData');
  json.mockResolvedValue(expectedSaving);

  // Вызываем метод load с использованием async/await
  const result = await GameSavingLoader.load();

  expect(result).toEqual(expectedSaving);

  expect(read).toHaveBeenCalledTimes(1);
  expect(json).toHaveBeenCalledTimes(1);
  expect(json).toHaveBeenCalledWith('fakeData');
});

test('error', async () => {

  // Мокируем функцию read
  read.mockRejectedValue(new Error('Read error'));

  // Загрузка должна завершиться ошибкой
  await expect(GameSavingLoader.load()).rejects.toThrow('Unable to load the game saving');

  // Проверяем, что функции были вызваны правильно
  expect(read).toHaveBeenCalledTimes(1);
  expect(json).not.toHaveBeenCalled();
});