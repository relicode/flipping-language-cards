import React, { useEffect, useState } from 'react'

import FlipCard from '../../components/FlipCard'
import { Library } from '../../services/cards'

import styles from './styles.module.css'

const shuffle = (unshuffled: [string, string, string][]) => unshuffled
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)

const App: React.FC<Library> = ({ categoryRows, languages }) => {
  const [index, setIndex] = useState(0)
  const [category, setCategory] = useState(0)
  const [langFrom, setLangFrom] = useState(0)
  const [langTo, setLangTo] = useState(1)
  const [flipped, setFlipped] = useState(false)

  const categories = Object.entries(categoryRows).sort()
  const [,categoryCardsInOrder] = categories[category]

  const [categoryCards, setCategoryCards] = useState(shuffle(categoryCardsInOrder))

  useEffect(() => {
    setCategoryCards(shuffle(categoryCardsInOrder))
  }, [categoryCardsInOrder])

  const handleNumericChange = (setter: React.Dispatch<React.SetStateAction<number>>, value: string, resetIndex = false) => {
    if (resetIndex) {
      setIndex(0)
      setFlipped(false)
    }
    setter(parseInt(value, 10))
  }

  const navigateForward = () => {
    setIndex(index < categoryCards.length - 1 ? index + 1 : 0)
    setFlipped(false)
  }

  const navigateBack = () => {
    setIndex(index === 0 ? categoryCards.length - 1 : index - 1)
    setFlipped(false)
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <span>
          <select value={category} onChange={(ev) => handleNumericChange(setCategory, ev.target.value, true)}>
            {categories.map(([cat], idx) => (
              <option
                value={idx}
                key={cat}
              >{cat}</option>
            ))}
          </select>
        </span>
        <span>
          <select value={langFrom} onChange={(ev) => handleNumericChange(setLangFrom, ev.target.value)}>
            {languages.map((lang, idx) => (
              <option
                value={idx}
                key={lang}
              >{lang}</option>
            ))}
          </select>
        </span>
        <span>
          <select value={langTo} onChange={(ev) => handleNumericChange(setLangTo, ev.target.value)}>
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
          isFlipped={flipped}
          text={[categoryCards[index][langFrom], categoryCards[index][langTo]]}
        />
      </div>
      <nav className={styles.nav}>
        <span onClick={navigateBack}>ᐸ</span>
        <span onClick={() => setFlipped(!flipped)}>↻</span>
        <span onClick={navigateForward}>ᐳ</span>
      </nav>
    </div>
  )
}

export default App
