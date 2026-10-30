// Module-customization hook: redirects the two DSH peer imports to local
// mocks so the plugin's pure logic can be tested without a real harness.
const MOCKS = {
  '@deepseek-ai/dsh-tools': new URL('./dsh-tools.mjs', import.meta.url).href,
  '@deepseek-ai/schemastery': new URL('./schemastery.mjs', import.meta.url).href,
}

export function resolve(specifier, context, nextResolve) {
  if (Object.prototype.hasOwnProperty.call(MOCKS, specifier)) {
    return { url: MOCKS[specifier], shortCircuit: true }
  }
  return nextResolve(specifier, context)
}
