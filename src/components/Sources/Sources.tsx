'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { useStore } from '@/store/useStore'
import { findLogo } from '@/lib/logos'
import type { SourceData } from '@/lib/types'
import styles from './Sources.module.css'

function filterUniqueSources(sources: SourceData[]): SourceData[] {
  const seen = new Map<string, SourceData>()

  for (const source of sources) {
    const name = source.name ?? ''
    if (
      (source.type === 'sub' || source.type === 'free') &&
      !/\(via|\(Via|On Demand/i.test(name)
    ) {
      const logoPath = findLogo(name)
      if (logoPath && !seen.has(name)) {
        seen.set(name, { ...source, logo: logoPath })
      }
    }
  }

  return Array.from(seen.values())
}

export default function Sources() {
  const { choice, region } = useStore()

  const filteredSources = useMemo(
    () => (choice?.sources ? filterUniqueSources(choice.sources) : []),
    [choice]
  )

  if (filteredSources.length === 0) {
    return (
      <p className={styles.empty}>
        Not currently streaming on any {region} platforms.
      </p>
    )
  }

  return (
    <div className={styles.grid}>
      {filteredSources.map((source, i) => (
        <a
          key={i}
          href={source.web_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.logoLink}
          aria-label={source.name}
        >
          <Image
            className={styles.logo}
            src={source.logo!}
            alt={source.name ?? ''}
            width={80}
            height={80}
          />
        </a>
      ))}
    </div>
  )
}
