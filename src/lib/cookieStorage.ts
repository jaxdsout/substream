import type { StateStorage } from 'zustand/middleware'

const cookieStorage: StateStorage = {
  getItem(name) {
    if (typeof document === 'undefined') return null
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`))
    return match ? decodeURIComponent(match[1]) : null
  },
  setItem(name, value) {
    if (typeof document === 'undefined') return
    document.cookie = `${name}=${encodeURIComponent(value)};max-age=2592000;path=/;SameSite=Lax`
  },
  removeItem(name) {
    if (typeof document === 'undefined') return
    document.cookie = `${name}=;max-age=0;path=/`
  },
}

export default cookieStorage
