import type { ChoiceData, ResultData } from '@/lib/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AppStore {
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
  autoSearch: (query: string, filter: number, region: string, platforms?: string[]) => Promise<void>
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

export const useStore = create<AppStore>()(
  persist(
    (set) => ({
      ...initialState,

      setSearchString: (searchString) => set({ searchString }),
      setFilter: (filter) => set({ filter }),
      clearStream: () => set(initialState),
      resetChoice: () => set({ choice: null }),
      resetFail: () => set({ searchFail: false }),

      autoSearch: async (query, filter, region, platforms = []) => {
        set({ searchFail: false })
        try {
          const params = new URLSearchParams({
            q: query,
            filter: String(filter),
            region,
          })
          if (platforms.length > 0) params.set('platforms', platforms.join(','))
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
    }),
    {
      name: 'substream-session',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        searchString: state.searchString,
        filter: state.filter,
        region: state.region,
        isLoaded: state.isLoaded,
      }),
    }
  )
)
