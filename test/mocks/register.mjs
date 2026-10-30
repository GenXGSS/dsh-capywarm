// Registers the resolver hook before tests run.
// Usage: node --test --import ./test/mocks/register.mjs test/
import { register } from 'node:module'

register('./hook.mjs', import.meta.url)
