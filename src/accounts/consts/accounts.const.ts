import { Account } from '@prisma/client';

import { readJSON } from '../../shared/lib/readJSON';

const fileNames = [
  'vadym.account.json',
  'naz.account.json',
  'lolita.account.json',
];

export const ACCOUNTS = fileNames.map((fileName) =>
  readJSON<Dto<Account> & { skills: string[] }>(`accounts/${fileName}`),
);
