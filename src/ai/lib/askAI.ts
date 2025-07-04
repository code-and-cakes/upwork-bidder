import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';
import { OpenAIModel } from '@prisma/client';

import { OpenAIModels } from '../models/open-ai';
import { extractJsonFromCodeBlock } from './extractJsonFromCodeBlock';

const ModelMap: Record<OpenAIModel, OpenAIModels> = {
  [OpenAIModel.GPT35_TURBO]: OpenAIModels.GPT35Turbo,
  [OpenAIModel.GPT4O]: OpenAIModels.GPT4o,
  [OpenAIModel.GPT4O_MINI]: OpenAIModels.GPT4oMini,
  [OpenAIModel.GPT4_TURBO]: OpenAIModels.GPT4Turbo,
  [OpenAIModel.O1_MINI]: OpenAIModels.o1Mini,
  [OpenAIModel.O1]: OpenAIModels.o1,
};

export async function askAI({
  system,
  user,
  temperature = 1,
  model = OpenAIModel.GPT4_TURBO,
  json,
}: {
  system?: string;
  user?: string;
  temperature?: number;
  model?: OpenAIModel;
  json?: boolean;
}) {
  const messages = [];
  if (system) messages.push(new SystemMessage(system));
  if (user) messages.push(new HumanMessage(user));

  const isSpecial = (
    [OpenAIModel.O1, OpenAIModel.O1_MINI] as OpenAIModel[]
  ).includes(model);

  const openAI = new ChatOpenAI({
    model: ModelMap[model],
    temperature: !isSpecial ? temperature : undefined,
  });

  try {
    const { content } = await openAI.invoke(messages, {
      response_format: json && !isSpecial ? { type: 'json_object' } : undefined,
    });

    if (isSpecial && json) {
      return extractJsonFromCodeBlock(content as string);
    }

    return json ? JSON.parse(content as string) : content;
  } catch (e) {
    console.error(
      'Failed to ask AI with messages:',
      messages.map((m) => m.content),
      e.message,
    );
  }
}
