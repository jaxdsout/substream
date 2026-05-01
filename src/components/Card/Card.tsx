'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import type { ResultData } from '@/lib/types'
import styles from './Card.module.css'

interface CardProps {
  result: ResultData
}

export default function Card({ result }: CardProps) {
  const router = useRouter()
  const { region, loadChoice } = useStore()

  if (!result.image_url || result.image_url === 'https://cdn.watchmode.com/posters/blank.gif') {
    return null
  }

  const posterUrl = result.image_url?.replace('w185', 'w342')

  const handleClick = async () => {
    await loadChoice(result.id, region)
    router.push(`/detail/${result.id}`)
  }

  const title =
    result.name.length > 36
      ? result.name.substring(0, 33) + '...'
      : result.name

  return (
    <div className={styles.card} onClick={handleClick} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}>
      <div className={styles.posterWrapper}>
        <Image
          className={styles.poster}
          src={posterUrl}
          alt={result.name}
          fill
          unoptimized
          sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 20vw"
        />
      </div>
      <p className={styles.title}>{title}</p>
    </div>
  )
}
