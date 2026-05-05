'use client'

import InfoModal from '@/components/InfoModal/InfoModal'
import Logo from '@/components/Logo/Logo'
import SearchBar from '@/components/SearchBar/SearchBar'
import { usePathname } from 'next/navigation'
import styles from './layout.module.css'

export default function MainLayout({ children }: { children: React.ReactNode }) {
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
      <InfoModal />
    </div>
  )
}
