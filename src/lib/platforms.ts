type ServiceEntry = [imagePath: string, names: string[], type: 'sub' | 'free']

export type PlatformEntry = {
  imagePath: string
  displayName: string
  type: 'sub' | 'free'
}

const SERVICES: ServiceEntry[] = [
  ['/logos/platforms/netflix.png', ['Netflix'], 'sub'],
  ['/logos/platforms/max.png', ['Max', 'HBO Max', 'MAX', 'HBOMax', 'HBO Max Amazon Channel', 'Max Amazon Channel', 'TBS', 'TNT', 'truTV', 'TruTV'], 'sub'],
  ['/logos/platforms/hulu.png', ['Hulu'], 'sub'],
  ['/logos/platforms/paramount.png', ['Paramount+', 'Paramount Plus', 'Paramount+ with Showtime', 'Paramount Plus with Showtime'], 'sub'],
  ['/logos/platforms/peacock.png', ['Peacock', 'Peacock Premium', 'Peacock Premium Plus', 'USA Network', 'USA'], 'sub'],
  ['/logos/platforms/appletv.png', ['Apple TV+', 'Apple TV Plus', 'AppleTV+', 'AppleTV', 'Apple TV'], 'sub'],
  ['/logos/platforms/disney.png', ['Disney+', 'Disney Plus'], 'sub'],
  ['/logos/platforms/primevideo.png', ['Prime Video', 'Amazon Prime Video', 'Amazon Prime', 'Prime', 'Amazon Freevee'], 'sub'],
  ['/logos/platforms/tubi.png', ['Tubi', 'Tubi TV'], 'free'],
  ['/logos/platforms/pluto.png', ['Pluto TV', 'Pluto'], 'free'],
  ['/logos/platforms/amc.png', ['AMC+', 'AMC Plus'], 'sub'],
  ['/logos/platforms/discovery.png', ['Discovery+', 'Discovery Plus'], 'sub'],
  ['/logos/platforms/fubo.png', ['Fubo', 'fuboTV', 'FuboTV'], 'sub'],
  ['/logos/platforms/mgm.png', ['MGM+', 'MGM Plus'], 'sub'],
  ['/logos/platforms/shudder.png', ['Shudder'], 'sub'],
  ['/logos/platforms/starz.png', ['Starz'], 'sub'],
  ['/logos/platforms/thecw.png', ['The CW', 'CW'], 'free'],
  ['/logos/platforms/roku.png', ['The Roku Channel', 'Roku Channel', 'Roku'], 'free'],
]

export const PLATFORM_LIST: PlatformEntry[] = [
  ...SERVICES.filter(([, , t]) => t === 'sub').map(([imagePath, names, type]) => ({ imagePath, displayName: names[0], type })),
  ...SERVICES.filter(([, , t]) => t === 'free').map(([imagePath, names, type]) => ({ imagePath, displayName: names[0], type })),
]

function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '')
}

const _map = new Map<string, string>()
for (const [path, names] of SERVICES) {
  for (const name of names) {
    _map.set(norm(name), path)
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
