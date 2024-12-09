export function parseTemplate(template: string, variables: object): string {
  const missingKeys = [];

  const result = template.replace(/{{(.*?)}}/g, (_, key) => {
    const trimmedKey = key.trim();
    if (variables.hasOwnProperty(trimmedKey)) {
      return variables[trimmedKey];
    } else {
      missingKeys.push(trimmedKey);
      return `{{${trimmedKey}}}`; // Placeholder for missing values
    }
  });

  if (missingKeys.length > 0) {
    console.warn(`Warning: Missing values for keys: ${missingKeys.join(', ')}`);
  }

  const extraKeys = Object.keys(variables).filter(
    (key) => !template.includes(`\${${key}}`),
  );
  if (extraKeys.length > 0) {
    console.warn(`Warning: Unused variables provided: ${extraKeys.join(', ')}`);
  }

  return result;
}
