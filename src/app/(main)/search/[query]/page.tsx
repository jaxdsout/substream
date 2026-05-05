'use client'

import Card from '@/components/Card/Card'
import { usePlatformStore } from '@/store/usePlatformStore'
import { useStore } from '@/store/useStore'
import { useParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import styles from '../../layout.module.css'

export default function SearchPage() {
  const { query } = useParams<{ query: string }>()
  const { results, isLoaded, searchFail, filter, region, searchString, autoSearch } = useStore()
  const { userPlatforms } = usePlatformStore()

  useEffect(() => {
    if (results.length === 0 && query && !isLoaded) {
      autoSearch(decodeURIComponent(query), filter, region, userPlatforms)
    }
  }, [query, filter, region, results.length, isLoaded, autoSearch, userPlatforms])

  // Re-search when platforms change while results are already showing
  const prevPlatforms = useRef(userPlatforms)
  useEffect(() => {
    if (prevPlatforms.current === userPlatforms) return
    prevPlatforms.current = userPlatforms
    if (query) autoSearch(decodeURIComponent(query), filter, region, userPlatforms)
    // intentionally reads filter/region/autoSearch as stable values, not re-run triggers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPlatforms])

  if (searchFail) {
    return <p className={styles.empty}>Search failed — please try again.</p>
  }

  if (isLoaded && results.length === 0) {
    return (
      <p className={styles.empty}>
        No results for &ldquo;{searchString}&rdquo; on any {userPlatforms.length > 0 && "selected"} {region} platforms.
      </p>
    )
  }

  return (
    <div className={`${styles.grid}${results.length < 5 ? ` ${styles.centered}` : ''}`}>
      {results.map((result) => (
        <Card key={result.id} result={result} />
      ))}
    </div>
  )
}
