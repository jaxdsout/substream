'use client'

import { useStore } from '@/store/useStore'
import { usePathname, useRouter } from 'next/navigation'
import styles from './Logo.module.css'

export default function Logo() {
  const router = useRouter()
  const pathname = usePathname()
  const clearStream = useStore((s) => s.clearStream)

  function handleClick() {
    clearStream()
    router.push('/')
  }

  return (
    <h1
      className={pathname === '/' ? styles.logo : styles.logoSmall}
      onClick={handleClick}
    >
      substream
    </h1>
  )
}
