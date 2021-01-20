import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const file1 = getFixturePath('file1.json');
const file2 = getFixturePath('file2.json');
const expected = readFile('expected_file');

test('compare 2 files', () => {
  expect(genDiff(file1, file2)).toBe(expected);
});
