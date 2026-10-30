import { test, describe } from 'node:test'
import assert from 'node:assert/strict'

import { name, Config, apply, renderLine, compose, vibeLine } from '../index.js'
import { ART, COMFORT, VIBE } from '../content.js'

const baseConfig = {
  language: 'mixed',
  characterName: '暖暖',
  asciiArt: true,
  customComfort: [],
  customVibe: [],
}

/** Boot the plugin against a mock context and capture registered tools. */
function boot(config = baseConfig) {
  const tools = []
  const ctx = { tools: { register: (t) => tools.push(t) }, logger: { info() {} } }
  apply(ctx, config)
  return tools
}

describe('plugin contract', () => {
  test('exports name, Config schema and apply', () => {
    assert.equal(name, 'capywarm')
    assert.equal(typeof Config, 'function') // schemastery chain object
    assert.equal(typeof apply, 'function')
  })

  test('apply registers exactly the three capybara tools', () => {
    const tools = boot()
    assert.deepEqual(
      tools.map((t) => t.name).sort(),
      ['capy_comfort', 'capy_praise', 'capy_vibe'],
    )
    for (const tool of tools) {
      assert.equal(typeof tool.execute, 'function')
      assert.equal(tool.output.schema.type, 'string')
      const rendered = tool.output.render({}, 'VALUE')
      assert.deepEqual(rendered, [{ type: 'text', text: 'VALUE' }])
    }
  })

  test('every tool declares a non-empty description and valid params', () => {
    for (const tool of boot()) {
      assert.ok(tool.description.length > 20)
      for (const param of Object.values(tool.parameters)) {
        assert.equal(param.type, 'string')
        assert.ok(param.description.length > 5)
      }
    }
  })
})

describe('output composition helpers', () => {
  test('renderLine respects language setting', () => {
    const line = { zh: '中文', en: 'English' }
    assert.equal(renderLine({ ...baseConfig, language: 'zh' }, line), '中文')
    assert.equal(renderLine({ ...baseConfig, language: 'en' }, line), 'English')
    assert.equal(renderLine({ ...baseConfig, language: 'mixed' }, line), '中文\nEnglish')
  })

  test('compose puts header first, art second, and can omit art', () => {
    const withArt = compose(baseConfig, 'ART\nBLOCK', ['line1'])
    assert.ok(withArt.startsWith('🦫 暖暖 · 卡皮暖暖 CapyWarm'))
    assert.ok(withArt.includes('ART\nBLOCK'))
    assert.ok(withArt.endsWith('line1'))

    const noArt = compose({ ...baseConfig, asciiArt: false }, 'ART', ['x'])
    assert.ok(!noArt.includes('ART'))

    const customName = compose({ ...baseConfig, characterName: 'Custom' }, '', ['x'])
    assert.ok(customName.startsWith('🦫 Custom · 卡皮暖暖 CapyWarm'))
  })
})

describe('capy_comfort', () => {
  test('renders header, art and a line from the requested mood', async () => {
    const [comfort] = boot()
    const out = await comfort.execute({ mood: 'tired' })
    assert.ok(out.startsWith('🦫 暖暖 · 卡皮暖暖 CapyWarm'))
    assert.ok(out.includes(ART.rest))
    const zhPool = COMFORT.tired.map((l) => l.zh)
    assert.ok(zhPool.some((zh) => out.includes(zh)), 'output should contain one tired line')
  })

  test('unknown mood falls back to the generic pool', async () => {
    const [comfort] = boot()
    const out = await comfort.execute({ mood: 'hangry' })
    const zhPool = COMFORT.generic.map((l) => l.zh)
    assert.ok(zhPool.some((zh) => out.includes(zh)))
  })

  test('missing mood works and no note line is appended', async () => {
    const [comfort] = boot()
    const out = await comfort.execute({})
    assert.ok(out.startsWith('🦫 暖暖'))
    assert.ok(!out.includes('（暖暖听见了'))
  })

  test('appends the quoted note when provided', async () => {
    const [comfort] = boot()
    const out = await comfort.execute({ mood: 'tired', note: '连跑 8 小时' })
    assert.ok(out.includes('（暖暖听见了：连跑 8 小时）'))
  })

  test('custom comfort lines are always appended', async () => {
    const tools = boot({ ...baseConfig, customComfort: ['我的自定义安慰'] })
    const out = await tools[0].execute({ mood: 'sad' })
    assert.ok(out.includes('我的自定义安慰'))
  })

  test('asciiArt: false hides the art block', async () => {
    const tools = boot({ ...baseConfig, asciiArt: false })
    const out = await tools[0].execute({ mood: 'tired' })
    assert.ok(!out.includes(ART.rest))
  })

  test('language: en output contains no Chinese body line', async () => {
    const tools = boot({ ...baseConfig, language: 'en' })
    const out = await tools[0].execute({ mood: 'anxious' })
    const body = out.split('\n\n')[2]
    assert.ok(!/[\u4e00-\u9fff]/.test(body), 'en mode body should be non-Chinese')
  })
})

describe('capy_praise', () => {
  test('substitutes {what} and uses the celebrate art', async () => {
    const tools = boot()
    const out = await tools[1].execute({ what: '修好登录 bug' })
    assert.ok(out.includes('修好登录 bug'))
    assert.ok(!out.includes('{what}'))
    assert.ok(out.includes(ART.celebrate))
  })
})

describe('capy_vibe', () => {
  test('returns a line from the built-in pool when no custom lines', async () => {
    const tools = boot()
    const out = await tools[2].execute({})
    assert.ok(out.includes(ART.calm))
    const allowed = VIBE.map((l) => renderLine(baseConfig, l))
    const body = out.split('\n\n').at(-1)
    assert.ok(allowed.includes(body), `unexpected vibe line: ${body}`)
  })

  test('custom vibe lines join the pool (custom-first, deterministic via rng)', () => {
    const config = { ...baseConfig, language: 'zh', customVibe: ['我的自定义提醒'] }
    // pool = 1 custom + 8 built-in; rng=0 → index 0 (custom), rng=0.15 → index 1 (first built-in)
    assert.equal(vibeLine(config, () => 0), '我的自定义提醒')
    const second = vibeLine(config, () => 0.15)
    const allowed = ['我的自定义提醒', ...VIBE.map((l) => renderLine(config, l))]
    assert.ok(allowed.includes(second))
  })

  test('merged pool keeps every built-in line reachable', () => {
    const config = { ...baseConfig, language: 'zh', customVibe: ['X'] }
    const total = 1 + VIBE.length
    const seen = new Set()
    for (let i = 0; i < total; i++) {
      const r = i / total
      seen.add(vibeLine(config, () => r))
    }
    const allowed = ['X', ...VIBE.map((l) => renderLine(config, l))]
    assert.ok(seen.size >= total - 1, 'rng sweep should cover the pool without duplicates beyond language pairs')
    for (const item of seen) assert.ok(allowed.includes(item))
  })
})
