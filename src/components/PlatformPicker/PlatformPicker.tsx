'use client'

import { PLATFORM_LIST } from '@/lib/platforms'
import { usePlatformStore } from '@/store/usePlatformStore'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import styles from './PlatformPicker.module.css'

const VISIBLE_COUNT = PLATFORM_LIST.findIndex((p) => p.imagePath === '/logos/platforms/primevideo.png') + 1

function LogoBtn({ p, selected, onToggle }: { p: (typeof PLATFORM_LIST)[0]; selected: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`${styles.logoBtn} ${selected ? styles.logoBtnSelected : ''}`}
      aria-pressed={selected}
      aria-label={p.displayName}
      title={p.displayName}
    >
      <Image src={p.imagePath} alt={p.displayName} width={60} height={60} />
    </button>
  )
}

export default function PlatformPicker() {
  const { userPlatforms, togglePlatform, clearPlatforms } = usePlatformStore()
  const [isExpanded, setExpanded] = useState(false)

  const sorted = useMemo(() => {
    const selected = PLATFORM_LIST.filter((p) => userPlatforms.includes(p.imagePath))
    const unselected = PLATFORM_LIST.filter((p) => !userPlatforms.includes(p.imagePath))
    return [...selected, ...unselected]
  }, [userPlatforms])

  const visible = sorted.slice(0, VISIBLE_COUNT)
  const hidden = sorted.slice(VISIBLE_COUNT)

  return (
    <div className={styles.panel}>
      <div className={`panelHeader ${styles.header}`}>
        <span>Platform Filter</span>
        {userPlatforms.length > 0 && (
          <button onClick={clearPlatforms} className={styles.clearBtn}>
            CLEAR
          </button>
        )}
      </div>
      <div className={styles.row}>
        {visible.map((p) => (
          <LogoBtn key={p.imagePath} p={p} selected={userPlatforms.includes(p.imagePath)} onToggle={() => togglePlatform(p.imagePath)} />
        ))}

        {!isExpanded && hidden.length > 0 && (
          <button className={styles.ellipsisBtn} onClick={() => setExpanded(true)} aria-label="Show more platforms">
            •••
          </button>
        )}

        {isExpanded && hidden.map((p) => (
          <LogoBtn key={p.imagePath} p={p} selected={userPlatforms.includes(p.imagePath)} onToggle={() => togglePlatform(p.imagePath)} />
        ))}
      </div>
    </div>
  )
}
