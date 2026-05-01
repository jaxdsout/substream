'use client'

import { usePathname } from 'next/navigation'
import Logo from '@/components/Logo/Logo'
import SearchBar from '@/components/SearchBar/SearchBar'
import styles from './AppShell.module.css'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <div className={styles.container}>
      <div className={styles.scanlines} aria-hidden />

      <div
        className={`${styles.spacer} ${!isHome ? styles.spacerCollapsed : ''}`}
        aria-hidden
      />

      <header className={styles.header}>
        <Logo />
        <SearchBar />
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  )
}
