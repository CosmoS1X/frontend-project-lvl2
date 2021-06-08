import fs from 'fs';
import path from 'path';
import genDiff from '../index.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);

const json1 = getFixturePath('file1.json');
const json2 = getFixturePath('file2.json');
const yml1 = getFixturePath('file1.yml');
const yml2 = getFixturePath('file2.yml');
const expectedStylish = fs.readFileSync(getFixturePath('stylish.txt'), 'utf-8');
const expectedPlain = fs.readFileSync(getFixturePath('plain.txt'), 'utf-8');
const expectedJSON = fs.readFileSync(getFixturePath('json.txt'), 'utf-8');

const tests = [
  [json1, json2, 'stylish', expectedStylish],
  [yml1, yml2, 'stylish', expectedStylish],
  [json1, json2, 'plain', expectedPlain],
  [yml1, yml2, 'plain', expectedPlain],
  [json1, json2, 'json', expectedJSON],
  [yml1, yml2, 'json', expectedJSON],
];

test('Compare files with stylish format by default', () => {
  expect(genDiff(json1, json2)).toBe(expectedStylish);
});

test('If formatter is unknown', () => {
  expect(() => genDiff(yml1, yml2, 'test')).toThrow();
});

describe.each(tests)('Test each formatter', (file1, file2, formatter, expected) => {
  test(`Compare ${path.extname(file1)} files with ${formatter} format`, () => {
    expect(genDiff(file1, file2, formatter)).toBe(expected);
  });
});
