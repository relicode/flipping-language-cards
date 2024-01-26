import chalk from 'chalk'

const verbEndings = ['ar', 'er', 'ir'] as const

type VerbEnding = (typeof verbEndings)[number]
type Verb = `${string}${VerbEnding}`
type Conjugations = Readonly<{
  yo: string,
  tú: string,
  vos: string,
  usted: string,
  élElla: string,
  nosotros: string,
  ustedes: string,
  vosotros: string,
  ellosEllas: string,
}>

const conjugationsMap: { [ K in VerbEnding ]: Conjugations } = {
  ar: {
    yo: 'o',
    tú: 'as',
    vos: 'ás',
    usted: 'a',
    élElla: 'a',
    nosotros: 'amos',
    ustedes: 'an',
    vosotros: 'áis',
    ellosEllas: 'an',
  } as const,
  er: {
    yo: 'o',
    tú: 'es',
    vos: 'és',
    usted: 'e',
    élElla: 'e',
    nosotros: 'emos',
    ustedes: 'en',
    vosotros: 'éis',
    ellosEllas: 'en',
  } as const,
  ir: {
    yo: 'o',
    tú: 'es',
    vos: 'ís',
    usted: 'e',
    élElla: 'e',
    nosotros: 'imos',
    ustedes: 'en',
    vosotros: 'ís',
    ellosEllas: 'en',
  } as const,
} as const

const matchesRegExp = (re: RegExp, s?: string) => typeof s === 'string' && re.test(s)

const verbRegExp = new RegExp(`.+${verbEndings.join('|')}$`)
const isVerb = (s?: string): s is Verb => matchesRegExp(verbRegExp, s)

const verbEndingRegExp = new RegExp(`^${verbEndings.join('|')}$`)
const isVerbEnding = (s?: string): s is VerbEnding => matchesRegExp(verbEndingRegExp, s)

const getVerbBaseAndEnding = (verb: Verb): [string, VerbEnding] => {
  const split = verb.split('')
  const endingSplit = split.splice(-2)
  const [base, ending] = [split, endingSplit].map((s) => s.join(''))
  if (!base) throw new Error(`Invalid verb base in word ${verb}: ${base}`)
  if (!isVerbEnding(ending)) throw new Error(`Invalid verb ending in word ${verb}: ${ending}`)
  return [base, ending]
}

const decorate = (base: string, conjugation: string) => base + chalk.bold.italic(conjugation)

const getPresentConjugations = (verb: Verb) => {
  const [base, ending] = getVerbBaseAndEnding(verb)
  const { yo, tú, vos, usted, élElla, nosotros, ustedes, vosotros, ellosEllas } = conjugationsMap[ending]

  return [
    `Yo ${decorate(base, yo)}`,
    `Tú ${decorate(base, tú)} / vos ${decorate(base, vos)} / usted ${decorate(base, usted)}`,
    `Él / ella ${decorate(base, élElla)}`,
    `Nosotros ${decorate(base, nosotros)}`,
    `Ustedes ${decorate(base, ustedes)} / vosotros ${decorate(base, vosotros)}`,
    `Ellos / ellas ${base + chalk.bold.italic(ellosEllas)}`,
  ]
}

const print = (word: string, idx: number, arr: unknown[]) => {
  console.log(`${word}${idx + 1 === arr.length ? '\n' : ''}`)
}

const conjugateRegularVerbPresent = (verb: string) => {
  if (!isVerb(verb)) throw new Error(`Invalid verb: ${verb}`)
  getPresentConjugations(verb).forEach(print)
}

conjugateRegularVerbPresent('amar')
conjugateRegularVerbPresent('temer')
conjugateRegularVerbPresent('vivir')

// Outputs:
//
// Yo amo
// Tú amas / vos amás / usted ama
// Él / ella ama
// Nosotros amamos
// Ustedes aman / vosotros amáis
// Ellos / ellas aman

// Yo temo
// Tú temes / vos temés / usted teme
// Él / ella teme
// Nosotros tememos
// Ustedes temen / vosotros teméis
// Ellos / ellas temen

// Yo vivo
// Tú vives / vos vivís / usted vive
// Él / ella vive
// Nosotros vivimos
// Ustedes viven / vosotros vivís
// Ellos / ellas viven