import rawLibrary from './library.json'

type RawLibrary = typeof rawLibrary
export const fetchLibrary = () => new Promise<RawLibrary>((res) => res(rawLibrary))

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

type Languages = Readonly<RawLibrary['languages']>
const getLanguages = (library: RawLibrary): Languages => library.languages

export type Library = {
  categoryRows: CategoryRows
  languages: Languages
}
export const librarySelector = (library: RawLibrary): Library => ({
  categoryRows: getCategoryRows(library),
  languages: getLanguages(library),
})