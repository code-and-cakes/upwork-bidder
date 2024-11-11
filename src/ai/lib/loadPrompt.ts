import * as fsp from 'node:fs/promises';
import * as path from 'node:path';

import Handlebars from 'handlebars';

export const loadPrompt = async (name: string) => {
  const templateFile = await fsp.readFile(
    path.resolve(__dirname, '..', '..', '..', '..', 'templates', `${name}.hbs`),
    'utf8',
  );

  return Handlebars.compile(templateFile);
};
