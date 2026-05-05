import { findPlatformImage } from '@/lib/platforms'
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

async function fetchTitleDetail(id: string, region: string): Promise<any | null> {
  try {
    const url = new URL(`https://api.watchmode.com/v1/title/${id}/details/`)
    url.searchParams.set('apiKey', process.env.WATCHMODE_API_KEY ?? '')
    url.searchParams.set('append_to_response', 'sources')
    url.searchParams.set('regions', region)
    const res = await fetch(url.toString())
    return res.ok ? res.json() : null
  } catch {
    return null
  }
}

function isMovieResult(result: any, filter: string): boolean {
  if (filter === '4') return false
  if (filter === '3') return true
  const t = result.type
  return t === 'movie' || t === 'tv_movie' || t === 1
}

function passesFilters(detail: any, platformPaths: string[]): boolean {
  const runtime = detail?.runtime_minutes
  if (runtime != null && runtime < 20) return false

  if (platformPaths.length > 0) {
    return (detail?.sources ?? []).some((s: any) => {
      const path = findPlatformImage(s.name ?? '')
      return path && platformPaths.includes(path) && (s.type === 'sub' || s.type === 'free')
    })
  }

  return true
}

async function applyFilters(results: any[], region: string, filter: string, platformPaths: string[]) {
  const needsDetail = results.map((r) => platformPaths.length > 0 || isMovieResult(r, filter))
  if (!needsDetail.some(Boolean)) return results

  const details = await Promise.all(
    results.map((r, i) => (needsDetail[i] ? fetchTitleDetail(r.id, region) : null))
  )

  return results.filter((_, i) => !needsDetail[i] || passesFilters(details[i], platformPaths))
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const q = searchParams.get('q') ?? ''
  const filter = searchParams.get('filter') ?? '2'
  const region = searchParams.get('region') ?? 'US'
  const platformPaths = searchParams.get('platforms')?.split(',').filter(Boolean) ?? []

  const mainRes = await fetch(buildUrl(q, filter, region))
  const mainData = mainRes.ok ? await mainRes.json() : { results: [] }
  const mainResults: any[] = mainData.results ?? []

  const hasStrongMatch = mainResults.some((r) => relevance(r.name, q) >= 1)
  if (hasStrongMatch) {
    return NextResponse.json({ results: await applyFilters(mainResults, region, filter, platformPaths) })
  }

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

  const seen = new Set<number>()
  const merged: any[] = []
  for (const data of [mainData, ...retries]) {
    for (const item of (data.results ?? [])) {
      if (!seen.has(item.id)) {
        seen.add(item.id)
        merged.push(item)
      }
    }
  }
  merged.sort((a, b) => relevance(b.name, q) - relevance(a.name, q))

  return NextResponse.json({ results: await applyFilters(merged, region, filter, platformPaths) })
}
