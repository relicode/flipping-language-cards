import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'

import { Library } from '../../services/cards'
import FlipCard from '../../components/FlipCard'
import styles from './styles.module.css'

export const appElementId = 'app'
export const appElement = document.getElementById(appElementId)

const shuffle = (unshuffled: [string, string, string][]) => unshuffled
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)

const App: React.FC<Library> = ({ categoryRows, languages }) => {
  const [index, setIndex] = useState(0)
  const [category, setCategory] = useState(0)
  const [langFrom, setLangFrom] = useState(0)
  const [langTo, setLangTo] = useState(1)
  const [flipped, setIsFlipped] = useState(false)

  const categories = Object.entries(categoryRows).sort()
  const [,categoryCardsInOrder] = categories[category]

  const [categoryCards, setCategoryCards] = useState(shuffle(categoryCardsInOrder))

  useEffect(() => {
    setCategoryCards(shuffle(categoryCardsInOrder))
  }, [categoryCardsInOrder])

  const handleNumericChange = (setter: React.Dispatch<React.SetStateAction<number>>, value: string, resetIndex = false) => {
    if (resetIndex) {
      setIndex(0)
      setIsFlipped(false)
    }
    setter(parseInt(value, 10))
  }

  const navigateForward = () => {
    setIndex(index < categoryCards.length - 1 ? index + 1 : 0)
    setIsFlipped(false)
  }

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const afterOpenModal = () => { console.log('modal was opened') }

  return (
    <div className={styles.app}>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Settings"
      >
        <div className={styles.wrapper}>
          <label>
            <span>From:</span><br />
            <select value={langFrom} onChange={(ev) => handleNumericChange(setLangFrom, ev.target.value)}>
              {languages.map((lang, idx) => (
                <option
                  value={idx}
                  key={lang}
                >{lang}</option>
              ))}
            </select>
          </label>
          <label>
            <hr /><span>To:</span><br />
            <select value={langTo} onChange={(ev) => handleNumericChange(setLangTo, ev.target.value)}>
              {languages.map((lang, idx) => (
                <option
                  value={idx}
                  key={lang}
                >{lang}</option>
              ))}
            </select>
          </label>
          <label>
            <hr /><span>Category:</span><br />
            <select value={category} onChange={(ev) => handleNumericChange(setCategory, ev.target.value, true)}>
              {categories.map(([cat], idx) => (
                <option
                  value={idx}
                  key={cat}
                >{cat}</option>
              ))}
            </select>
          </label>
          <div>
            <button onClick={() => setModalIsOpen(false)}>Close</button>
          </div>
        </div>
      </Modal>
      <div className={styles.card}>
        <FlipCard
          onClick={() => setIsFlipped(!flipped)}
          isFlipped={flipped}
          text={[categoryCards[index][langFrom], categoryCards[index][langTo]]}
        />
      </div>
      <nav className={styles.nav}>
        <span onClick={() => setModalIsOpen(!modalIsOpen)}>⚙</span>
        <span onClick={navigateForward}>ᐳ</span>
      </nav>
    </div>
  )
}

export default App
