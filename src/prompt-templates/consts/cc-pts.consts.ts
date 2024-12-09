import { PromptTemplate } from '@prisma/client';

import { CC_PROMPT_TEMPLATE_V1_VALUE } from './v1-template';

export const CC_PROMPT_TEMPLATE_V1: Dto<PromptTemplate> = {
  name: 'Cover Letter. C&C v1',
  active: true,
  companyId: null,
  value: CC_PROMPT_TEMPLATE_V1_VALUE,
  type: 'COVER_LETTER',
};
