type ServiceEntry = [logoPath: string, names: string[]]

const SERVICES: ServiceEntry[] = [
  ['/logos/maxlogo.png',        ['Max', 'HBO Max', 'MAX', 'HBOMax', 'HBO Max Amazon Channel', 'Max Amazon Channel']],
  ['/logos/netflixlogo.png',    ['Netflix']],
  ['/logos/hululogo.png',       ['Hulu']],
  ['/logos/paramountlogo.png',  ['Paramount+', 'Paramount Plus', 'Paramount+ with Showtime', 'Paramount Plus with Showtime']],
  ['/logos/disneylogo.png',     ['Disney+', 'Disney Plus']],
  ['/logos/starzlogo.png',      ['Starz']],
  ['/logos/tubilogo.png',       ['Tubi', 'Tubi TV']],
  ['/logos/primevideologo.png', ['Prime Video', 'Amazon Prime Video', 'Amazon Prime', 'Prime']],
  ['/logos/peacocklogo.png',    ['Peacock', 'Peacock Premium', 'Peacock Premium Plus']],
  ['/logos/plutologo.png',      ['Pluto TV', 'Pluto']],
  ['/logos/mgmlogo.png',        ['MGM+', 'MGM Plus']],
  ['/logos/shudderlogo.png',    ['Shudder']],
  ['/logos/amclogo.png',        ['AMC+', 'AMC Plus']],
  ['/logos/thecwlogo.png',      ['The CW', 'CW']],
  ['/logos/discoverylogo.png',  ['Discovery+', 'Discovery Plus']],
  ['/logos/cracklelogo.png',    ['Crackle']],
  ['/logos/freeveelogo.png',    ['Amazon Freevee', 'Freevee']],
  ['/logos/appletvlogo.png',    ['Apple TV+', 'Apple TV Plus', 'AppleTV+', 'AppleTV', 'Apple TV']],
  ['/logos/fubo.png',           ['Fubo', 'fuboTV', 'FuboTV']],
  ['/logos/kanopy.png',         ['Kanopy']],
  ['/logos/rokulogo.png',       ['The Roku Channel', 'Roku Channel', 'Roku']],
  ['/logos/TBS.png',            ['TBS']],
  ['/logos/tnt.png',            ['TNT']],
  ['/logos/trutv.png',          ['truTV', 'TruTV']],
  ['/logos/usa.png',            ['USA Network', 'USA']],
]

// Strip everything except letters and digits, lowercase
function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '')
}

// Pre-build normalized alias → logo path map (sorted longest key first for substring safety)
const _map = new Map<string, string>()
for (const [path, names] of SERVICES) {
  for (const name of names) {
    _map.set(norm(name), path)
  }
}
const _keys = [..._map.keys()].sort((a, b) => b.length - a.length)

export function findLogo(name: string): string | undefined {
  const n = norm(name)
  // 1. Exact normalized match
  if (_map.has(n)) return _map.get(n)
  // 2. Known key is a substring of the input (e.g. "hbomax" inside "hbomaxamazonchannel")
  for (const key of _keys) {
    if (n.includes(key)) return _map.get(key)
  }
  return undefined
}
