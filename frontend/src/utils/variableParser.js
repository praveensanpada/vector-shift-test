const TEMPLATE_VARIABLE_REGEX = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

export const extractTemplateVariables = (text = "") => {
  const variables = new Set();
  let match;

  while ((match = TEMPLATE_VARIABLE_REGEX.exec(text)) !== null) {
    variables.add(match[1]);
  }

  return Array.from(variables);
};
