import { parseTemplate } from '../src/shared/lib/parseTemplate';

// Example usage:
const template =
  'Hello, {{escaped}}! Your name is {name}, and you have {count} messages.';
const variables = { name: 'John', count: 5, escaped: '42' };

const result = parseTemplate(template, variables);
console.log(result);

// export async function test() {}
//
// test();
