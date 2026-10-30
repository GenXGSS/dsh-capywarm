// Mock of @deepseek-ai/schemastery: chainable builder that mimics the
// subset used by the plugin (object / union / array / string / boolean /
// number + .default() / .description()). Validation itself is the vendored
// platform package's job, not something the plugin relies on at runtime.
const chain = () => {
  const node = () => chain()
  node.default = () => node
  node.description = () => node
  node.required = () => node
  return node
}

export default {
  object: chain,
  union: chain,
  array: chain,
  string: chain,
  boolean: chain,
  number: chain,
}
