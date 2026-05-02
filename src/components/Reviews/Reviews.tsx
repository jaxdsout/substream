'use client'

import { useStore } from '@/store/useStore'
import Image from 'next/image'
import styles from './Reviews.module.css'

export default function Reviews() {
  const { choice } = useStore()

  if (!choice) return null

  const imdbUrl = `https://www.imdb.com/title/${choice.imdb_id}/`
  const letterboxdSlug = choice.title
    ?.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[:().!,?'"]/g, '')
  const letterboxdUrl = `https://letterboxd.com/film/${letterboxdSlug}/`

  return (
    <div className={styles.row}>
      {choice.imdb_id && (
        <a href={imdbUrl} target="_blank" rel="noopener noreferrer" className={styles.link} aria-label="View on IMDb">
          <Image
            className={styles.logo}
            src="/logos/reviews/imdb.png"
            alt="IMDb"
            width={80}
            height={80}
          />
        </a>
      )}
      {choice.type === 'movie' && letterboxdSlug && (
        <a href={letterboxdUrl} target="_blank" rel="noopener noreferrer" className={styles.link} aria-label="View on Letterboxd">
          <Image
            className={styles.logo}
            src="/logos/reviews/letterboxd.png"
            alt="Letterboxd"
            width={80}
            height={80}
          />
        </a>
      )}
    </div>
  )
}
