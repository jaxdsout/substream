'use client'

import { useStore } from '@/store/useStore'
import { useRouter } from 'next/navigation'
import { type ChangeEvent, type KeyboardEvent, useState } from 'react'
import { BackIcon, CloseIcon, FilterIcon, LayerIcon, SearchIcon } from '../Icons/Icons'
import PlatformPicker from '../PlatformPicker/PlatformPicker'
import styles from './SearchBar.module.css'

export default function SearchBar() {
  const router = useRouter()
  const {
    searchString,
    filter,
    region,
    isLoaded,
    results,
    choice,
    userPlatforms,
    setSearchString,
    setFilter,
    autoSearch,
    clearStream,
    resetChoice,
  } = useStore()

  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [isPlatformOpen, setPlatformOpen] = useState(false)

  const handleClear = () => {
    setSearchString('')
  }

  const handleSubmit = () => {
    if (!searchString.trim()) return
    autoSearch(searchString, filter, region)
    resetChoice()
    router.push(`/search/${encodeURIComponent(searchString.toLowerCase())}`)
    setPlatformOpen(false)
    setDropdownOpen(false)
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

  const moviesOn = filter === 2 || filter === 3
  const tvOn = filter === 2 || filter === 4

  const handleToggleMovies = () => {
    setFilter(moviesOn ? (tvOn ? 4 : 2) : (tvOn ? 2 : 3))
  }

  const handleToggleTV = () => {
    setFilter(tvOn ? (moviesOn ? 3 : 2) : (moviesOn ? 2 : 4))
  }

  const handleBack = () => {
    resetChoice()
    router.back()
  }

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
            placeholder={
              filter === 3 ? 'Search movies...' :
                filter === 4 ? 'Search TV...' :
                  'Search movies & TV...'
            }
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
          onClick={() => { setDropdownOpen((p) => !p); setPlatformOpen(false) }}
          className={`${styles.filterBtn} ${isDropdownOpen ? styles.btnOpen : ''}`}
          aria-label="Filter content type"
          aria-expanded={isDropdownOpen}
        >
          <FilterIcon />
        </button>

        <button
          onClick={() => { setPlatformOpen((p) => !p); setDropdownOpen(false) }}
          className={`${styles.filterBtn} ${userPlatforms.length > 0 ? styles.platformBtnActive : ''} ${isPlatformOpen ? styles.btnOpen : ''}`}
          aria-label="My platforms"
          aria-expanded={isPlatformOpen}
        >
          <LayerIcon />
          {userPlatforms.length > 0 && (
            <span className={styles.badge}>{userPlatforms.length}</span>
          )}
        </button>
      </div>

      {isDropdownOpen && (
        <div className={styles.dropdown} role="group" aria-label="Content filter">
          <span className={`panelHeader ${styles.dropdownHeader}`}>Content Filter</span>
          <button
            role="checkbox"
            aria-checked={moviesOn}
            onClick={handleToggleMovies}
            className={`${styles.dropdownItem} ${moviesOn ? styles.dropdownItemSelected : ''}`}
          >
            Movies
          </button>
          <button
            role="checkbox"
            aria-checked={tvOn}
            onClick={handleToggleTV}
            className={`${styles.dropdownItem} ${tvOn ? styles.dropdownItemSelected : ''}`}
          >
            TV Shows
          </button>
        </div>
      )}

      {isPlatformOpen && (
        <div className={styles.platformPanel}>
          <PlatformPicker />
        </div>
      )}
    </div>
  )
}
