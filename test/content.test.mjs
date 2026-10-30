import { test, describe } from 'node:test'
import assert from 'node:assert/strict'

import { ART, COMFORT, PRAISE, VIBE, pick, normalizeMood } from '../content.js'

describe('content library integrity', () => {
  test('every comfort category is non-empty with bilingual pairs', () => {
    const categories = ['tired', 'frustrated', 'sad', 'anxious', 'generic']
    for (const key of categories) {
      assert.ok(Array.isArray(COMFORT[key]), `missing category: ${key}`)
      assert.ok(COMFORT[key].length >= 3, `${key} should have at least 3 lines`)
      for (const line of COMFORT[key]) {
        assert.ok(line.zh && line.zh.length > 5, `${key} zh line malformed`)
        assert.ok(line.en && line.en.length > 5, `${key} en line malformed`)
      }
    }
  })

  test('praise templates carry the {what} placeholder', () => {
    assert.ok(PRAISE.length >= 3)
    for (const line of PRAISE) {
      assert.match(line.zh, /\{what\}/)
      assert.match(line.en, /\{what\}/)
    }
  })

  test('vibe pool has at least 6 original lines', () => {
    assert.ok(VIBE.length >= 6)
    for (const line of VIBE) {
      assert.ok(line.zh && line.en)
    }
  })

  test('art blocks are multi-line and contain the capybara ears motif', () => {
    for (const art of Object.values(ART)) {
      assert.ok(art.includes('∧,,∧'))
      assert.ok(art.includes('\n'))
    }
  })
})

describe('pick()', () => {
  test('always returns an element of the list', () => {
    const list = ['a', 'b', 'c']
    for (let i = 0; i < 50; i++) {
      assert.ok(list.includes(pick(list)))
    }
  })

  test('honors an injected rng (rng=0 selects the first element)', () => {
    assert.equal(pick(['x', 'y', 'z'], () => 0), 'x')
    assert.equal(pick(['x', 'y', 'z'], () => 0.999), 'z')
  })
})

describe('normalizeMood()', () => {
  test('maps known moods case-insensitively and trims input', () => {
    assert.equal(normalizeMood('TIRED '), 'tired')
    assert.equal(normalizeMood('Anxious'), 'anxious')
    assert.equal(normalizeMood('sad'), 'sad')
    assert.equal(normalizeMood('frustrated'), 'frustrated')
  })

  test('falls back to generic for unknown/missing moods', () => {
    assert.equal(normalizeMood(undefined), 'generic')
    assert.equal(normalizeMood(''), 'generic')
    assert.equal(normalizeMood('hangry'), 'generic')
  })
})
