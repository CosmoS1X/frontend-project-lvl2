import fs from 'fs';
import getFixturePath from '../src/getFixturePath.js';
import genDiff from '../index.js';
import stylish, { getData } from '../src/parsers.js';
import diff from '../src/diff.js';

const jsonF1 = getFixturePath('flat1.json');
const jsonF2 = getFixturePath('flat2.json');
const ymlF1 = getFixturePath('flat1.yml');
const ymlF2 = getFixturePath('flat2.yml');
const expectedF = fs.readFileSync(getFixturePath('expected_flat'), 'utf-8');

test('compare flat .json files', () => {
  expect(stylish(genDiff(jsonF1, jsonF2))).toBe(expectedF);
});

test('compare flat .yml files', () => {
  expect(stylish(genDiff(ymlF1, ymlF2))).toBe(expectedF);
});

const jsonR1 = getData(getFixturePath('recursive1.json'));
const jsonR2 = getData(getFixturePath('recursive2.json'));
const ymlR1 = getData(getFixturePath('recursive1.yml'));
const ymlR2 = getData(getFixturePath('recursive2.yml'));
const expectedR = fs.readFileSync(getFixturePath('expected_recursive'), 'utf-8');
const jsonData = diff(jsonR1, jsonR2);
const ymlData = diff(ymlR1, ymlR2);

test('compare recursive .json files', () => {
  expect(stylish(jsonData)).toBe(expectedR);
});

test('compare recursive .yml files', () => {
  expect(stylish(ymlData)).toBe(expectedR);
});
