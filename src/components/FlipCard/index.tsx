import ReactCardFlip from 'react-card-flip'

import styles from './styles.module.css'

export type Props = {
  isFlipped: boolean,
  text: [string, string],
}

const FlipCard: React.FC<Props> = ({ isFlipped, text }) => {
  const [textFront, textBack] = text
  return (
    <ReactCardFlip
      containerClassName={styles.container}
      flipDirection="horizontal"
      isFlipped={isFlipped}
    >
      <div className={styles.card}>{textFront}</div>
      <div className={styles.card}>{textBack}</div>
    </ReactCardFlip>
  )
}

export default FlipCard