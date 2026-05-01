import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const q = searchParams.get('q') ?? ''
  const filter = searchParams.get('filter') ?? '2'
  const region = searchParams.get('region') ?? 'US'

  const url = new URL('https://api.watchmode.com/v1/autocomplete-search/')
  url.searchParams.set('apiKey', process.env.WATCHMODE_API_KEY ?? '')
  url.searchParams.set('search_value', q)
  url.searchParams.set('search_type', filter)
  url.searchParams.set('region', region)

  const res = await fetch(url.toString())
  if (!res.ok) {
    return NextResponse.json({ results: [] }, { status: res.status })
  }
  const data = await res.json()
  return NextResponse.json(data)
}
