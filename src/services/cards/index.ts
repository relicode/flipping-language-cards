import rawLibrary from './library.json'

type RawLibrary = typeof rawLibrary
export const fetchRawLibrary = () => new Promise<RawLibrary>((res) => res(rawLibrary))

type CategoryRows = Readonly<{ [key: string]: [string, string, string][] }>
const getCategoryRows = (library: RawLibrary) => library.contentRows
  .reduce<Readonly<CategoryRows>>((acc, [category, en, sp, fi]) => (
    acc[category] ? {
      ...acc,
      [category]: [...acc[category], [en, sp, fi]],
    } : {
      ...acc,
      [category]: [[en, sp, fi]],
    }
  ), {})

const getLanguages = (library: RawLibrary) => library.languages

export type Library = {
  categoryRows: CategoryRows
  languages: ReturnType<typeof getLanguages>
}

export const librarySelector = (library: RawLibrary): Library => ({
  categoryRows: getCategoryRows(library),
  languages: getLanguages(library),
})

const fetchLibrary = () => fetchRawLibrary().then(((r) => librarySelector(r)))
export default fetchLibrary
