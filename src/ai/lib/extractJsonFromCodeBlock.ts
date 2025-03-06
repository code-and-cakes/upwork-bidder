export function extractJsonFromCodeBlock(text: string) {
  const match = text.match(/```json\n([\s\S]*?)\n```/);

  if (match) {
    try {
      return JSON.parse(match[1]);
    } catch (error) {
      return JSON.parse(text);
    }
  }
}
