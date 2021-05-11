import fs from 'fs';
import path from 'path';
import process from 'process';
import yaml from 'js-yaml';

const mapping = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

export default (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  try {
    const extension = path.extname(fullPath);
    const format = extension.slice(1);
    const data = fs.readFileSync(fullPath, 'utf-8');
    return mapping[format](data);
  } catch (e) {
    throw new Error(`File ${fullPath} does not exist`);
  }
};
