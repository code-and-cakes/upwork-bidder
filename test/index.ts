import * as fs from 'node:fs';
import * as path from 'node:path';

import { parseJobInfo } from '../src/automation/lib/parseJobInfo';

async function testParseJobs() {
  const html = fs.readFileSync(path.join(__dirname, 'job-info.html'), 'utf-8');
  return parseJobInfo(html);
}

testParseJobs();
