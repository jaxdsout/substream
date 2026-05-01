'use client'

import Card from '@/components/Card/Card'
import { useStore } from '@/store/useStore'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import styles from './page.module.css'

export default function SearchPage() {
  const { query } = useParams<{ query: string }>()
  const { results, isLoaded, filter, region, searchString, autoSearch } = useStore()

  useEffect(() => {
    if (results.length === 0 && query && !isLoaded) {
      autoSearch(decodeURIComponent(query), filter, region)
    }
  }, [query, filter, region, results.length, isLoaded, autoSearch])

  if (isLoaded && results.length === 0) {
    return (
      <p className={styles.empty}>
        No results for &ldquo;{searchString}&rdquo; on any {region} platforms.
      </p>
    )
  }

  return (
    <div className={styles.grid}>
      {results.map((result) => (
        <Card key={result.id} result={result} />
      ))}
    </div>
  )
}
