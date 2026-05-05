import { PlatformEntry } from "./types"

const PLATFORMS: PlatformEntry[] = [
  { imagePath: '/logos/platforms/netflix.png', displayName: 'Netflix', globNames: ['Netflix'], type: 'sub' },
  { imagePath: '/logos/platforms/max.png', displayName: 'Max', globNames: ['Max', 'HBO Max', 'MAX', 'HBOMax', 'HBO Max Amazon Channel', 'Max Amazon Channel', 'TBS', 'TNT', 'truTV', 'TruTV'], type: 'sub' },
  { imagePath: '/logos/platforms/hulu.png', displayName: 'Hulu', globNames: ['Hulu'], type: 'sub' },
  { imagePath: '/logos/platforms/paramount.png', displayName: 'Paramount+', globNames: ['Paramount+', 'Paramount Plus', 'Paramount+ with Showtime', 'Paramount Plus with Showtime'], type: 'sub' },
  { imagePath: '/logos/platforms/peacock.png', displayName: 'Peacock', globNames: ['Peacock', 'Peacock Premium', 'Peacock Premium Plus', 'USA Network', 'USA'], type: 'sub' },
  { imagePath: '/logos/platforms/appletv.png', displayName: 'Apple TV+', globNames: ['Apple TV+', 'Apple TV Plus', 'AppleTV+', 'AppleTV', 'Apple TV'], type: 'sub' },
  { imagePath: '/logos/platforms/disney.png', displayName: 'Disney+', globNames: ['Disney+', 'Disney Plus'], type: 'sub' },
  { imagePath: '/logos/platforms/primevideo.png', displayName: 'Prime Video', globNames: ['Prime Video', 'Amazon Prime Video', 'Amazon Prime', 'Prime', 'Amazon Freevee'], type: 'sub' },
  { imagePath: '/logos/platforms/tubi.png', displayName: 'Tubi', globNames: ['Tubi', 'Tubi TV'], type: 'free' },
  { imagePath: '/logos/platforms/pluto.png', displayName: 'Pluto TV', globNames: ['Pluto TV', 'Pluto'], type: 'free' },
  { imagePath: '/logos/platforms/amc.png', displayName: 'AMC+', globNames: ['AMC+', 'AMC Plus'], type: 'sub' },
  { imagePath: '/logos/platforms/discovery.png', displayName: 'Discovery+', globNames: ['Discovery+', 'Discovery Plus'], type: 'sub' },
  { imagePath: '/logos/platforms/fubo.png', displayName: 'Fubo', globNames: ['Fubo', 'fuboTV', 'FuboTV'], type: 'sub' },
  { imagePath: '/logos/platforms/mgm.png', displayName: 'MGM+', globNames: ['MGM+', 'MGM Plus'], type: 'sub' },
  { imagePath: '/logos/platforms/shudder.png', displayName: 'Shudder', globNames: ['Shudder'], type: 'sub' },
  { imagePath: '/logos/platforms/starz.png', displayName: 'Starz', globNames: ['Starz'], type: 'sub' },
  { imagePath: '/logos/platforms/thecw.png', displayName: 'The CW', globNames: ['The CW', 'CW'], type: 'free' },
  { imagePath: '/logos/platforms/roku.png', displayName: 'The Roku Channel', globNames: ['The Roku Channel', 'Roku Channel', 'Roku'], type: 'free' },
]

export const PLATFORM_LIST: PlatformEntry[] = [
  ...PLATFORMS.filter((p) => p.type === 'sub'),
  ...PLATFORMS.filter((p) => p.type === 'free'),
]

function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '')
}

const _map = new Map<string, string>()
for (const { imagePath, globNames } of PLATFORMS) {
  for (const name of globNames) {
    _map.set(norm(name), imagePath)
  }
}
const _keys = [..._map.keys()].sort((a, b) => b.length - a.length)

export function findPlatformImage(name: string): string | undefined {
  const n = norm(name)
  if (_map.has(n)) return _map.get(n)
  for (const key of _keys) {
    if (n.includes(key)) return _map.get(key)
  }
  return undefined
}
