type ServiceEntry = [imagePath: string, names: string[]]

const SERVICES: ServiceEntry[] = [
  ['/logos/platforms/amc.png',       ['AMC+', 'AMC Plus']],
  ['/logos/platforms/appletv.png',   ['Apple TV+', 'Apple TV Plus', 'AppleTV+', 'AppleTV', 'Apple TV']],
  ['/logos/platforms/discovery.png', ['Discovery+', 'Discovery Plus']],
  ['/logos/platforms/disney.png',    ['Disney+', 'Disney Plus']],
  ['/logos/platforms/fubo.png',      ['Fubo', 'fuboTV', 'FuboTV']],
  ['/logos/platforms/hulu.png',      ['Hulu']],
  ['/logos/platforms/kanopy.png',    ['Kanopy']],
  ['/logos/platforms/max.png',       ['Max', 'HBO Max', 'MAX', 'HBOMax', 'HBO Max Amazon Channel', 'Max Amazon Channel', 'TBS', 'TNT', 'truTV', 'TruTV']],
  ['/logos/platforms/mgm.png',       ['MGM+', 'MGM Plus']],
  ['/logos/platforms/netflix.png',   ['Netflix']],
  ['/logos/platforms/paramount.png', ['Paramount+', 'Paramount Plus', 'Paramount+ with Showtime', 'Paramount Plus with Showtime']],
  ['/logos/platforms/peacock.png',   ['Peacock', 'Peacock Premium', 'Peacock Premium Plus', 'USA Network', 'USA']],
  ['/logos/platforms/pluto.png',     ['Pluto TV', 'Pluto']],
  ['/logos/platforms/primevideo.png',['Prime Video', 'Amazon Prime Video', 'Amazon Prime', 'Prime', 'Amazon Freevee']],
  ['/logos/platforms/shudder.png',   ['Shudder']],
  ['/logos/platforms/starz.png',     ['Starz']],
  ['/logos/platforms/thecw.png',     ['The CW', 'CW']],
  ['/logos/platforms/roku.png',      ['The Roku Channel', 'Roku Channel', 'Roku']],
  ['/logos/platforms/tubi.png',      ['Tubi', 'Tubi TV']],
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
