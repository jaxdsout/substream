'use client'

import { useStore } from '@/store/useStore'
import { useRouter } from 'next/navigation'
import { type ChangeEvent, type KeyboardEvent, useState } from 'react'
import { BackIcon, CloseIcon, FilterIcon, SearchIcon } from '../Icons/Icons'
import styles from './SearchBar.module.css'

const filters = [
  { key: '2', text: 'TV & Movies', value: 2 },
  { key: '3', text: 'Movies', value: 3 },
  { key: '4', text: 'TV Shows', value: 4 },
]

export default function SearchBar() {
  const router = useRouter()
  const {
    searchString,
    filter,
    region,
    isLoaded,
    results,
    choice,
    setSearchString,
    setFilter,
    autoSearch,
    clearStream,
    resetChoice,
  } = useStore()

  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const handleClear = () => {
    setSearchString('')
  }

  const handleSubmit = () => {
    if (!searchString.trim()) return
    autoSearch(searchString, filter, region)
    resetChoice()
    router.push(`/search/${encodeURIComponent(searchString.toLowerCase())}`)
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isLoaded && results.length === 0) {
      clearStream()
      router.push('/')
    }
    setSearchString(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit()
  }

  const handleFilterSelect = (value: number) => {
    setFilter(value)
    setDropdownOpen(false)
  }

  const handleBack = () => {
    resetChoice()
    if (searchString) {
      router.push(`/search/${encodeURIComponent(searchString)}`)
    } else {
      router.push('/')
    }
  }

  const activeFilter = filters.find((f) => f.value === filter)

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        {choice?.id && (
          <button onClick={handleBack} className={styles.backBtn} aria-label="Go back">
            <BackIcon />
            <span>BACK</span>
          </button>
        )}

        <div className={styles.inputWrapper}>
          <input
            type="search"
            placeholder="Search movies & TV..."
            value={searchString}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            enterKeyHint="search"
            spellCheck
            className={styles.input}
            aria-label="Search"
          />
          {searchString && (
            <button onClick={handleClear} className={styles.clearBtn} aria-label="Clear search">
              <CloseIcon />
            </button>
          )}
        </div>

        <button onClick={handleSubmit} className={styles.searchBtn} aria-label="Search">
          <SearchIcon />
        </button>

        <button
          onClick={() => setDropdownOpen((p) => !p)}
          className={styles.filterBtn}
          aria-label="Filter content type"
          aria-expanded={isDropdownOpen}
        >
          <FilterIcon />
          <span className={styles.filterLabel}>{activeFilter?.text ?? 'Filter'}</span>
        </button>
      </div>

      {isDropdownOpen && (
        <div className={styles.dropdown} role="listbox">
          {filters.map((f) => (
            <button
              key={f.key}
              role="option"
              aria-selected={filter === f.value}
              onClick={() => handleFilterSelect(f.value)}
              className={`${styles.dropdownItem} ${filter === f.value ? styles.dropdownItemSelected : ''}`}
            >
              {f.text}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
