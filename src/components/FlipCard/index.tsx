import ReactCardFlip from 'react-card-flip'

import styles from './styles.module.css'

export type Props = {
  onClick: any,
  isFlipped: boolean,
  text: [string, string],
}

const FlipCard: React.FC<Props> = ({ isFlipped, text, onClick }) => {
  const [textFront, textBack] = text
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <ReactCardFlip
        containerClassName={styles.container}
        flipDirection="horizontal"
        isFlipped={isFlipped}
      >
        <div className={styles.card}>{textFront}</div>
        <div className={styles.card}>{textBack}</div>
      </ReactCardFlip>
    </div>
  )
}

export default FlipCard
