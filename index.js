/**
 * CapyWarm 卡皮暖暖 — an original capybara emotional-support plugin for
 * DeepSeek Harness (DSH). This file is the Cordis plugin entry: it exports
 * `name`, an optional Schemastery `Config`, and `apply(ctx, config)`.
 *
 * All content is original; see content.js for the IP note.
 */
import { defineTool } from '@deepseek-ai/dsh-tools'
import Schema from '@deepseek-ai/schemastery'
import { ART, COMFORT, PRAISE, VIBE, pick, normalizeMood } from './content.js'

export const name = 'capywarm'

/**
 * @typedef {Object} CapyWarmConfig
 * @property {'zh'|'en'|'mixed'} language  Line language.
 * @property {string} characterName        Name shown in the output header.
 * @property {boolean} asciiArt            Prepend original ASCII art.
 * @property {string[]} customComfort      Extra comfort lines (plain strings).
 * @property {string[]} customVibe         Extra vibe lines (plain strings).
 */

/** @type {import('@deepseek-ai/schemastery').Schema<CapyWarmConfig>} */
export const Config = Schema.object({
  language: Schema.union(['zh', 'en', 'mixed'])
    .default('mixed')
    .description('台词语言 / line language'),
  characterName: Schema.string()
    .default('暖暖')
    .description('角色名 / character name shown in the header'),
  asciiArt: Schema.boolean()
    .default(true)
    .description('是否附带原创 ASCII 小水豚 / prepend original ASCII art'),
  customComfort: Schema.array(Schema.string())
    .default([])
    .description('自定义安慰台词，逐条追加 / extra comfort lines'),
  customVibe: Schema.array(Schema.string())
    .default([])
    .description('自定义情绪提醒台词，逐条追加 / extra vibe lines'),
})

/**
 * Render a bilingual line according to the configured language.
 * @param {CapyWarmConfig} config
 * @param {{zh: string, en: string}} line
 * @returns {string}
 */
function renderLine(config, line) {
  if (config.language === 'zh') return line.zh
  if (config.language === 'en') return line.en
  return `${line.zh}\n${line.en}`
}

/**
 * Compose the final tool output: header, optional art, body lines.
 * @param {CapyWarmConfig} config
 * @param {string} art
 * @param {string[]} lines
 * @returns {string}
 */
function compose(config, art, lines) {
  const parts = [`🦫 ${config.characterName} · 卡皮暖暖 CapyWarm`]
  if (config.asciiArt && art) parts.push(art)
  parts.push(...lines)
  return parts.join('\n\n')
}

/**
 * @param {import('@deepseek-ai/cordis').Context} ctx
 * @param {CapyWarmConfig} config
 */
export function apply(ctx, config) {
  // -- capy_comfort ---------------------------------------------------------
  ctx.tools.register(defineTool({
    name: 'capy_comfort',
    description:
      'Offer the user warm, emotionally stable comfort in the voice of an ' +
      'original capybara character (卡皮暖暖). Use when the user seems tired, ' +
      'frustrated, sad or anxious, or explicitly asks for comfort / 情绪价值. ' +
      'Relay the message to the user verbatim, with warmth, and keep your ' +
      'other output brief.',
    parameters: {
      mood: {
        type: 'string',
        required: false,
        description:
          'User mood: tired | frustrated | sad | anxious. Anything else falls back to a generic comfort line.',
      },
      note: {
        type: 'string',
        required: false,
        description: 'Optional one-line context about what happened, quoted or paraphrased.',
      },
    },
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: value }],
    },
    async execute(args) {
      const mood = normalizeMood(args.mood)
      const line = renderLine(config, pick(COMFORT[mood]))
      const lines = [line]
      if (args.note) lines.push(`（暖暖听见了：${args.note}）`)
      if (config.customComfort.length > 0) lines.push(pick(config.customComfort))
      const art = mood === 'tired' || mood === 'sad' ? ART.rest : ART.calm
      return compose(config, art, lines)
    },
  }))

  // -- capy_praise ----------------------------------------------------------
  ctx.tools.register(defineTool({
    name: 'capy_praise',
    description:
      'Celebrate a finished task with an original capybara cheer. Use right ' +
      'after completing something the user cares about, or when the user ' +
      'shares good news. Relay the message verbatim with a celebratory tone.',
    parameters: {
      what: {
        type: 'string',
        required: true,
        description: 'Short description of the finished thing, e.g. "修好登录 bug" or "shipped v1.0".',
      },
    },
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: value }],
    },
    async execute(args) {
      const template = pick(PRAISE)
      const line = renderLine(config, template).replaceAll('{what}', args.what)
      return compose(config, ART.celebrate, [line])
    },
  }))

  // -- capy_vibe ------------------------------------------------------------
  ctx.tools.register(defineTool({
    name: 'capy_vibe',
    description:
      'Send a random gentle, grounding "stable emotion" nudge from the ' +
      'original capybara (rest, hydration, pacing, self-kindness). Use for ' +
      'long working sessions, idle chit-chat, or when the user asks for a ' +
      'daily vibe / 摸鱼语录.',
    parameters: {},
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: value }],
    },
    async execute() {
      const lines = []
      if (config.customVibe.length > 0 && Math.random() < 0.5) {
        lines.push(pick(config.customVibe))
      } else {
        lines.push(renderLine(config, pick(VIBE)))
      }
      return compose(config, ART.calm, lines)
    },
  }))

  ctx.logger?.info?.('[capywarm] 卡皮暖暖已就位 · CapyWarm is ready to warm things up')
}
