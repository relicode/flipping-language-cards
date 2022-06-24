import React, { useEffect, useState } from 'react'

import FlipCard from '../../components/FlipCard'
import { fetchLibrary, Library, librarySelector } from '../../services/cards'

import styles from './styles.module.css'

type AppState = {
  idx: number,
  category: number,
  langFrom: number,
  langTo: number,
  isFlipped: boolean,
  library: Library,
}

type SelectProp = keyof Pick<AppState, 'category' | 'langFrom' | 'langTo'>

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    idx: 0,
    category: 0,
    langFrom: 0,
    langTo: 1,
    isFlipped: false,
    library: {
      categoryRows: {
        languagePlaceholder: [['lang1', 'lang2', 'lang3']],
      },
      languages: [],
    },
  })

  const flipCard = (flipState?: boolean | React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setState((prevState) => ({
      ...prevState,
      isFlipped: typeof flipState === 'boolean' ? flipState : !prevState.isFlipped
    }))
  }

  useEffect(() => {
    (async () => {
      const rawLibrary = await fetchLibrary()
      setState((prevState) => ({
        ...prevState,
        library: librarySelector(rawLibrary),
      }))
    })()
  }, [])

  const { category, langFrom, langTo, library } = state
  const { categoryRows, languages } = library
  const categories = Object.entries(categoryRows).sort()
  const [,categoryCardsInOrder] = categories[category]
  const categoryCards = categoryCardsInOrder
  /*
  const categoryCards = categoryCardsInOrder
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  */

  const handleChange = (prop: SelectProp, value: string) => {
    const parsedValue = parseInt(value, 10)
    console.log(prop, parsedValue)
    setState((prevState) => ({
      ...prevState,
      [prop]: parsedValue,
    }))
  }

  const navigateForward = () => {
    setState((prevState) => ({
      ...prevState,
      isFlipped: false,
      idx: state.idx < categoryCards.length - 1 ? state.idx + 1 : 0,
    }))
  }

  const navigateBack = () => {
    setState((prevState) => ({
      ...prevState,
      isFlipped: false,
      idx: state.idx === 0 ? categoryCards.length - 1 : state.idx - 1
    }))
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <span>
          <select value={category} onChange={(ev) => handleChange('category', ev.target.value)}>
            {categories.map(([cat], idx) => (
              <option
                value={idx}
                key={cat}
              >{cat}</option>
            ))}
          </select>

        </span>
        <span>
          <select value={langFrom} onChange={(ev) => handleChange('langFrom', ev.target.value)}>
            {languages.map((lang, idx) => (
              <option
                value={idx}
                key={lang}
              >{lang}</option>
            ))}
          </select>
        </span>
        <span>
          <select value={langTo} onChange={(ev) => handleChange('langTo', ev.target.value)}>
            {languages.map((lang, idx) => (
              <option
                value={idx}
                key={lang}
              >{lang}</option>
            ))}
          </select>
        </span>
      </header>
      <div className={styles.card}>
        <FlipCard
          isFlipped={state.isFlipped}
          text={[categoryCards[state.idx][langFrom], categoryCards[state.idx][langTo]]}
        />
      </div>
      <nav className={styles.nav}>
        <span onClick={navigateBack}>ᐸ</span>
        <span onClick={flipCard}>↻</span>
        <span onClick={navigateForward}>ᐳ</span>
      </nav>
    </div>
  )
}

export default App
