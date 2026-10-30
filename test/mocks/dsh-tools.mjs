// Mock of @deepseek-ai/dsh-tools: defineTool is an identity wrapper — the
// real one only derives/validates args from `parameters`, which the tests
// exercise separately through direct execute() calls.
export function defineTool(definition) {
  return Object.freeze({ ...definition })
}
