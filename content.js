/**
 * CapyWarm 卡皮暖暖 — original content library.
 *
 * All lines, the character 暖暖 (CapyWarm) and the ASCII art below are
 * original works written for this plugin. They intentionally avoid any
 * existing capybara IP: no "水豚噜噜" name or design (orange-on-head),
 * no quotes from third-party sticker packs, no licensed character traits.
 *
 * Character setting (original): 暖暖 is a calm capybara who likes
 * sunshine, slow walks, warm cocoa and deep breaths. Motto: 慢慢来.
 */

/** @type {Record<string, string>} */
export const ART = {
  calm: [
    '    ∧,,∧',
    '   (  ・ᴥ・)   ~☕',
    '   /    つ',
    ' ~~￣￣￣￣￣~~',
  ].join('\n'),
  celebrate: [
    '    ∧,,∧',
    '   ( = ᴥ = )ノ  ✧･ﾟ',
    '   /    つ🎉',
    ' ~~￣￣￣￣￣~~',
  ].join('\n'),
  rest: [
    '    ∧,,∧',
    '   (  -ᴥ-)  zZ',
    '   /    つ',
    ' ~~￣￣￣￣￣~~',
  ].join('\n'),
}

/**
 * Comfort lines keyed by mood. Every entry is an original two-language pair.
 * @type {Record<string, Array<{zh: string, en: string}>>}
 */
export const COMFORT = {
  tired: [
    {
      zh: '辛苦啦。暖暖的秘诀：累了就承认累，这不是软弱，是充电。给自己十分钟，回来再战。',
      en: 'You did enough for now. Admitting tiredness is not weakness — it is charging. Take ten minutes, then return.',
    },
    {
      zh: '暖水豚把今天分给你一杯热可可。先暖暖手，再把最后一件事做完，或者干脆留到明天。',
      en: 'Here, a cup of warm cocoa. Warm your hands, finish the last thing — or let it wait for tomorrow.',
    },
    {
      zh: '电量低于 20% 的水豚会去晒太阳，不写代码。你也一样，去晒一会儿吧。',
      en: 'A low-battery capybara goes to sit in the sun instead of coding. You should too.',
    },
  ],
  frustrated: [
    {
      zh: '报错很烦，但 bug 不是你的敌人，它只是排队等你处理的信。拆开一封是一封，暖暖陪你逐条看。',
      en: 'Errors are annoying, but a bug is just a letter waiting to be opened. One at a time — CapyWarm is with you.',
    },
    {
      zh: '深呼吸：吸 4 秒，停 4 秒，呼 6 秒。水豚遇到麻烦从不慌，因为慌不解决问题，热可可和重启才解决。',
      en: 'Breathe in 4s, hold 4s, out 6s. Panic never fixed anything; cocoa and a restart often do.',
    },
    {
      zh: '卡住了不是失败，是提醒：换个姿势，散个步，答案常常在第三百步的时候出现。',
      en: 'Being stuck is not failure — it is a hint to change position. Answers often arrive at step three hundred of a walk.',
    },
  ],
  sad: [
    {
      zh: '不开心也没关系，暖暖不问原因，就在这里陪你坐一会儿。情绪像天气，会过去的。',
      en: 'It is okay to feel down. CapyWarm will not ask why — just sit here a while. Moods are weather; they pass.',
    },
    {
      zh: '今天先对自己好一点：吃口热的，早点睡。世界可以等，你先被照顾。',
      en: 'Be gentle with yourself today: eat something warm, sleep early. The world can wait; you come first.',
    },
    {
      zh: '哪怕今天只完成了一件事，也值得被肯定。暖水豚已经替你记下了。',
      en: 'Even one finished thing today counts. CapyWarm has written it down for you.',
    },
  ],
  anxious: [
    {
      zh: '焦虑是把明天的雨提前淋在今天的身上。伞已经撑好了，先做眼前这一小步就好。',
      en: 'Anxiety is tomorrow\'s rain falling on today. The umbrella is up — just take the small step in front of you.',
    },
    {
      zh: '把担心写成清单，一件一件看：能做的做，不能做的交给时间。水豚的佛系哲学，亲测有效。',
      en: 'Write worries into a list: do the doable ones, hand the rest to time. Capybara-style calm, field-tested.',
    },
    {
      zh: '你已经处理过很多个「看起来完不成」的日子了，这次也一样的。',
      en: 'You have survived many days that looked impossible. This one is no different.',
    },
  ],
  generic: [
    {
      zh: '暖暖在。想说什么都可以，不想说就一起安静地待着，情绪稳定是水豚的看家本领。',
      en: 'CapyWarm is here. Talk if you like, or just sit quietly — emotional stability is the house specialty.',
    },
    {
      zh: '慢慢来，比较快。这是水豚的节奏，也可以是你的。',
      en: 'Slow is smooth, smooth is fast. The capybara rhythm — borrow it anytime.',
    },
    {
      zh: '窗外的天很好，代码改天再骂它。先喝口水，动一动。',
      en: 'The sky outside looks nice. Yell at the code later — water first, then stretch.',
    },
  ],
}

/** Original praise lines for finished work. */
export const PRAISE = [
  {
    zh: '「{what}」完成啦！暖水豚为你鼓掌（啪叽啪叽），今天也很了不起。',
    en: '"{what}" is done! CapyWarm applauds you — well done today.',
  },
  {
    zh: '干得漂亮！{what} 已收录进「今日值得骄傲」清单，晚点奖励自己一点好的。',
    en: 'Nice work! "{what}" has been filed under "things to be proud of today" — treat yourself later.',
  },
  {
    zh: '{what} 解决！看，事情是一件一件做完的，你正在稳定推进，这就是最厉害的那种厉害。',
    en: '{what} handled! Things get done one by one, and steady progress is the best kind of progress.',
  },
  {
    zh: '完成 {what} 的你，就像晒饱太阳的水豚一样闪闪发光。下一个任务不急，先得意三秒。',
    en: 'You, having finished {what}, glow like a sun-bathed capybara. No rush on the next task — savor it for three seconds.',
  },
]

/**
 * Original "stable emotion" vibe lines — gentle nudges and grounding thoughts.
 */
export const VIBE = [
  {
    zh: '情绪稳定不是没有情绪，是像水豚一样，让它慢慢流过去。',
    en: 'Emotional stability is not the absence of feelings — it is letting them drift past, capybara-style.',
  },
  {
    zh: '喝水，伸懒腰，看窗外二十秒。暖暖检查完毕：你值得休息一下。',
    en: 'Drink water, stretch, look out the window for twenty seconds. Check complete: you have earned a break.',
  },
  {
    zh: '今日份提醒：你不需要把所有事都做完，只需要把下一件事做好。',
    en: 'Today\'s reminder: you do not need to finish everything, only to do the next thing well.',
  },
  {
    zh: '别人的进度条是别人的，你的节奏是你的。水豚从不和猎豹比速度。',
    en: 'Other people\'s progress bars are theirs. Capybaras never race cheetahs.',
  },
  {
    zh: '热可可不是拖延，是中间态休息。科学（大概）。',
    en: 'Cocoa is not procrastination; it is an intermediate resting state. Science, probably.',
  },
  {
    zh: '如果今天很难，就把它算作热身赛。正赛明天开始，现在先散个步。',
    en: 'If today is hard, call it the warm-up. The real match starts tomorrow — take a walk first.',
  },
  {
    zh: '把「我必须」换成「我选择」，压力会小很多。暖暖试过了。',
    en: 'Swap "I must" for "I choose" and the weight drops. CapyWarm tested it.',
  },
  {
    zh: '晚上早点睡，明天的难题交给你明天的版本。迭代会修复很多 bug。',
    en: 'Sleep early; tomorrow\'s problems belong to tomorrow\'s you. Iteration fixes many bugs.',
  },
]

/**
 * Pick a random element from a list.
 * @template T
 * @param {T[]} list
 * @param {() => number} [rng]
 * @returns {T}
 */
export function pick(list, rng = Math.random) {
  return list[Math.floor(rng() * list.length)]
}

/**
 * Resolve a mood key to a comfort list key.
 * @param {string|undefined} mood
 * @returns {keyof typeof COMFORT}
 */
export function normalizeMood(mood) {
  const key = String(mood ?? '').trim().toLowerCase()
  if (key && Object.prototype.hasOwnProperty.call(COMFORT, key)) return key
  return 'generic'
}
