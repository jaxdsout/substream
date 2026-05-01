'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './InfoModal.module.css'

export default function InfoModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const modal = open ? (
    <div className={styles.backdrop} onClick={() => setOpen(false)} role="dialog" aria-modal>
      <div className={styles.panel} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.title}>// ABOUT SUBSTREAM</span>
          <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Close">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className={styles.divider} />

        <p className={styles.body}>
          Substream helps you find where to watch movies on free or
          subscription-based streaming platforms. We only surface services
          you already pay for or can access for free — no rentals, no VOD.
        </p>

        <div className={styles.divider} />

        <p className={styles.credit}>
          Made possible by{' '}
          <a
            href="https://watchmode.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Watchmode
          </a>
        </p>
      </div>
    </div>
  ) : null

  return (
    <>
      <button
        className={styles.trigger}
        onClick={() => setOpen(true)}
        aria-label="About Substream"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="6.25" stroke="currentColor" strokeWidth="1.25" />
          <rect x="6.25" y="6" width="1.5" height="4.5" rx="0.75" fill="currentColor" />
          <circle cx="7" cy="3.75" r="0.875" fill="currentColor" />
        </svg>
      </button>

      {typeof document !== 'undefined' && createPortal(modal, document.body)}
    </>
  )
}
