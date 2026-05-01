import { create } from 'zustand'
import type { ResultData, ChoiceData } from '@/lib/types'

interface SubstreamStore {
  results: ResultData[]
  choice: ChoiceData | null
  searchString: string
  filter: number
  region: string
  isLoaded: boolean
  searchFail: boolean

  setSearchString: (s: string) => void
  setFilter: (f: number) => void
  clearStream: () => void
  resetChoice: () => void
  resetFail: () => void
  autoSearch: (query: string, filter: number, region: string) => Promise<void>
  loadChoice: (id: string, region: string) => Promise<void>
}

const initialState = {
  results: [] as ResultData[],
  choice: null,
  searchString: '',
  filter: 2,
  region: 'US',
  isLoaded: false,
  searchFail: false,
}

export const useStore = create<SubstreamStore>((set) => ({
  ...initialState,

  setSearchString: (searchString) => set({ searchString }),
  setFilter: (filter) => set({ filter }),
  clearStream: () => set(initialState),
  resetChoice: () => set({ choice: null }),
  resetFail: () => set({ searchFail: false }),

  autoSearch: async (query, filter, region) => {
    try {
      const params = new URLSearchParams({
        q: query,
        filter: String(filter),
        region,
      })
      const res = await fetch(`/api/search?${params}`)
      if (!res.ok) throw new Error('Search failed')
      const data = await res.json()
      set({ results: data.results ?? [], isLoaded: true })
    } catch {
      set({ results: [], searchFail: true })
    }
  },

  loadChoice: async (id, region) => {
    try {
      const res = await fetch(`/api/title/${id}?region=${region}`)
      if (!res.ok) throw new Error('Failed to load title')
      const data = await res.json()
      set({ choice: data })
    } catch {
      set({ choice: null })
    }
  },
}))
