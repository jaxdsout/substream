'use client'

import { findPlatformImage } from '@/lib/platforms'
import type { SourceData } from '@/lib/types'
import { usePlatformStore } from '@/store/usePlatformStore'
import { useStore } from '@/store/useStore'
import Image from 'next/image'
import { useMemo } from 'react'
import styles from './Platforms.module.css'

function filterUniqueSources(sources: SourceData[], userPlatforms: string[]): SourceData[] {
  const seen = new Map<string, SourceData>()

  for (const source of sources) {
    const name = source.name ?? ''
    if (
      (source.type === 'sub' || source.type === 'free') &&
      !/\(via|\(Via|On Demand/i.test(name)
    ) {
      const imagePath = findPlatformImage(name)
      if (imagePath && !seen.has(name)) {
        if (userPlatforms.length === 0 || userPlatforms.includes(imagePath)) {
          seen.set(name, { ...source, logo: imagePath })
        }
      }
    }
  }

  return Array.from(seen.values())
}

export default function Platforms() {
  const { choice, region } = useStore()
  const { userPlatforms } = usePlatformStore()

  const filteredSources = useMemo(
    () => (choice?.sources ? filterUniqueSources(choice.sources, userPlatforms) : []),
    [choice, userPlatforms]
  )

  if (filteredSources.length === 0) {
    return (
      <p className={styles.empty}>
        {userPlatforms.length > 0
          ? 'Not available on your platforms.'
          : `Not currently streaming on any ${region} platforms.`}
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
