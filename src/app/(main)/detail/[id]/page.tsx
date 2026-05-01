'use client'

import Reviews from '@/components/Reviews/Reviews'
import Sources from '@/components/Sources/Sources'
import { useStore } from '@/store/useStore'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import styles from './page.module.css'

export default function DetailPage() {
  const { id } = useParams<{ id: string }>()
  const { choice, region, loadChoice } = useStore()

  useEffect(() => {
    if (!choice?.id && id) {
      loadChoice(id, region)
    }
  }, [choice, id, region, loadChoice])

  if (!choice?.id) {
    return <div className={styles.loading} aria-busy="true" />
  }

  return (
    <div className={styles.layout}>
      <div className={styles.left}>
        {choice.posterLarge && (
          <Image
            className={styles.poster}
            src={choice.posterLarge}
            alt={choice.title ?? ''}
            width={300}
            height={450}
            unoptimized
            priority
          />
        )}
      </div>

      <div className={styles.right}>
        <h2 className={styles.title}>{choice.title?.toUpperCase()}</h2>

        <div className={styles.meta}>
          {choice.user_rating != null && (
            <div className={styles.rating}>
              <span className={styles.ratingValue}>{choice.user_rating}</span>
              <span className={styles.ratingMax}> / 10</span>
            </div>
          )}
          {choice.year && (
            <div className={styles.metaRow}>
              <span className={styles.label}>YEAR</span>
              {choice.year}
            </div>
          )}
          <div className={styles.metaRow}>
            <span className={styles.label}>RATING</span>
            {choice.us_rating ?? 'NR'}
          </div>
          {choice.runtime_minutes && (
            <div className={styles.metaRow}>
              <span className={styles.label}>RUNTIME</span>
              {choice.runtime_minutes} min
            </div>
          )}
          {choice.genre_names && choice.genre_names.length > 0 && (
            <div className={styles.metaRow}>
              <span className={styles.label}>GENRE</span>
              {choice.genre_names.join(', ')}
            </div>
          )}
        </div>

        <div className={styles.divider} />

        <Reviews />

        <div className={styles.sourcesSection}>
          <h3 className={styles.servicesHeading}>// SERVICES</h3>
          <Sources />
        </div>
      </div>
    </div>
  )
}
