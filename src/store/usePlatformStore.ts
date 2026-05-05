import cookieStorage from '@/lib/cookieStorage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface PlatformStore {
  userPlatforms: string[]
  togglePlatform: (imagePath: string) => void
  clearPlatforms: () => void
}

export const usePlatformStore = create<PlatformStore>()(
  persist(
    (set) => ({
      userPlatforms: [],
      togglePlatform: (imagePath) =>
        set((state) => ({
          userPlatforms: state.userPlatforms.includes(imagePath)
            ? state.userPlatforms.filter((p) => p !== imagePath)
            : [...state.userPlatforms, imagePath],
        })),
      clearPlatforms: () => set({ userPlatforms: [] }),
    }),
    {
      name: 'substream-platforms',
      storage: createJSONStorage(() => cookieStorage),
    }
  )
)
