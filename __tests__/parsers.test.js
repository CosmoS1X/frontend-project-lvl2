import { getData } from '../src/parsers.js';
import getFixturePath from '../src/getFixturePath.js';

test('Get JSON data', () => {
  expect(getData(getFixturePath('flat1.json'))).toEqual({
    host: 'hexlet.io',
    timeout: 50,
    follow: false,
    proxy: '123.234.53.22',
  });
});

test('Get Yaml data', () => {
  expect(getData(getFixturePath('flat2.yml'))).toEqual({
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  });
});

test('Incorrect filepath', () => {
  expect(() => getData(getFixturePath('wrong/file'))).toThrow();
});
