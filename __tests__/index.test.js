import fs from 'fs';
import getFixturePath from '../src/getFixturePath.js';
import genDiff from '../index.js';

const json1 = getFixturePath('file1.json');
const json2 = getFixturePath('file2.json');
const yml1 = getFixturePath('file1.yml');
const yml2 = getFixturePath('file2.yml');
const expected = fs.readFileSync(getFixturePath('expected_file'), 'utf-8');

test('compare .json files', () => {
  expect(genDiff(json1, json2)).toBe(expected);
});

test('compare .yml files', () => {
  expect(genDiff(yml1, yml2)).toBe(expected);
});
