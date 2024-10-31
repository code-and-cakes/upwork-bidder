import * as fs from 'node:fs';
import * as path from 'node:path';

import { parseJobs } from '../src/automation/lib/parseJobs';

async function testParseJobs() {
  const html = fs.readFileSync(path.join(__dirname, 'html.txt'), 'utf-8');
  return parseJobs(html);
}

testParseJobs();
