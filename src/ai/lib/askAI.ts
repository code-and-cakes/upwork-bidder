import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';

import { OpenAIModels } from '../models/open-ai';

export async function askAI({
  system,
  user,
  temperature = 1,
  model = OpenAIModels.o1,
  json,
}: {
  system?: string;
  user?: string;
  temperature?: number;
  model?: OpenAIModels;
  json?: boolean;
}) {
  const messages = [];
  if (system) messages.push(new SystemMessage(system));
  if (user) messages.push(new HumanMessage(user));

  const openAI = new ChatOpenAI({
    model,
    temperature,
  });

  try {
    const { content } = await openAI.invoke(messages, {
      response_format:
        json && model !== OpenAIModels.o1 ? { type: 'json_object' } : undefined,
    });

    return json ? JSON.parse(content as string) : content;
  } catch (e) {
    console.error(
      'Failed to ask AI with messages:',
      messages.map((m) => m.content),
      e.message,
    );
  }
}
