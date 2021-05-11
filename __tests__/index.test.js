import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../formatters/index.js';

const getFixturePath = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.join(__dirname, '..', '__fixtures__', filename);
};

const jsonF1 = getFixturePath('flat1.json');
const jsonF2 = getFixturePath('flat2.json');
const ymlF1 = getFixturePath('flat1.yml');
const ymlF2 = getFixturePath('flat2.yml');
const expectedF = fs.readFileSync(getFixturePath('expected_flat'), 'utf-8');

test('compare flat .json files', () => {
  expect(genDiff(jsonF1, jsonF2)).toBe(expectedF);
});

test('compare flat .yml files', () => {
  expect(genDiff(ymlF1, ymlF2)).toBe(expectedF);
});

const jsonR1 = getFixturePath('recursive1.json');
const jsonR2 = getFixturePath('recursive2.json');
const ymlR1 = getFixturePath('recursive1.yml');
const ymlR2 = getFixturePath('recursive2.yml');
const expectedR = fs.readFileSync(getFixturePath('expected_recursive'), 'utf-8');
const expectedP = fs.readFileSync(getFixturePath('expected_plain'), 'utf-8');
const expectedJ = fs.readFileSync(getFixturePath('expected_json.json'), 'utf-8');

test('compare recursive .json files with stylish format', () => {
  expect(genDiff(jsonR1, jsonR2, 'stylish')).toBe(expectedR);
});

test('compare recursive .yml files with stylish format by default', () => {
  expect(genDiff(ymlR1, ymlR2)).toBe(expectedR);
});

test('compare recursive .json files with plain format', () => {
  expect(genDiff(jsonR1, jsonR2, 'plain')).toBe(expectedP);
});

test('compare recursive .yml files with plain format', () => {
  expect(genDiff(ymlR1, ymlR2, 'plain')).toBe(expectedP);
});

test('compare recursive .json files with json format', () => {
  expect(genDiff(jsonR1, jsonR2, 'json')).toBe(JSON.stringify(JSON.parse(expectedJ)));
});

test('if formatter is unknown', () => {
  expect(() => genDiff(ymlR1, ymlR2, 'test')).toThrow();
});
