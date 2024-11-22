import * as fs from 'node:fs';

export function readJSON<T>(path: string): T {
  return JSON.parse(fs.readFileSync('./appData/' + path, 'utf-8'));
}
