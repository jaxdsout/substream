import { NextRequest, NextResponse } from 'next/server'

const ARTICLE_PREFIXES = ['the ', 'a ', 'an ']

function buildUrl(q: string, filter: string, region: string): string {
  const url = new URL('https://api.watchmode.com/v1/autocomplete-search/')
  url.searchParams.set('apiKey', process.env.WATCHMODE_API_KEY ?? '')
  url.searchParams.set('search_value', q)
  url.searchParams.set('search_type', filter)
  url.searchParams.set('region', region)
  return url.toString()
}

// Score how well a result name matches the query — used to surface article-variant matches
function relevance(name: string, query: string): number {
  const n = name.toLowerCase()
  const q = query.toLowerCase()
  if (n === q) return 3
  if (n.startsWith(q)) return 2
  const queryWords = q.split(/\s+/)
  const nameWords = n.split(/\s+/)
  const hits = queryWords.filter((w) => nameWords.includes(w)).length
  return hits / queryWords.length
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const q = searchParams.get('q') ?? ''
  const filter = searchParams.get('filter') ?? '2'
  const region = searchParams.get('region') ?? 'US'

  // Fire the main query first (1 call)
  const mainRes = await fetch(buildUrl(q, filter, region))
  const mainData = mainRes.ok ? await mainRes.json() : { results: [] }
  const mainResults: any[] = mainData.results ?? []

  // If any result contains all the query words, we have a strong match — return early.
  // This keeps the common case at 1 API call.
  const hasStrongMatch = mainResults.some((r) => relevance(r.name, q) >= 1)
  if (hasStrongMatch) {
    return NextResponse.json({ results: mainResults })
  }

  // Weak or no results — fire article-prefix variants to catch titles like
  // "An American Tail" when the user searched "american tail".
  const stripped = q.replace(/^(the|a|an)\s+/i, '')
  const variants = ARTICLE_PREFIXES
    .filter((p) => !q.toLowerCase().startsWith(p))
    .map((p) => p + stripped)

  const retries = await Promise.all(
    variants.map((v) =>
      fetch(buildUrl(v, filter, region))
        .then((r) => (r.ok ? r.json() : { results: [] }))
        .catch(() => ({ results: [] }))
    )
  )

  // Merge main + variant results, deduplicate by ID, sort by relevance
  const seen = new Set<number>()
  const merged: object[] = []
  for (const data of [mainData, ...retries]) {
    for (const item of (data.results ?? [])) {
      if (!seen.has(item.id)) {
        seen.add(item.id)
        merged.push(item)
      }
    }
  }
  merged.sort((a: any, b: any) => relevance(b.name, q) - relevance(a.name, q))

  return NextResponse.json({ results: merged })
}
