import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const region = req.nextUrl.searchParams.get('region') ?? 'US'

  const url = new URL(`https://api.watchmode.com/v1/title/${id}/details/`)
  url.searchParams.set('apiKey', process.env.WATCHMODE_API_KEY ?? '')
  url.searchParams.set('append_to_response', 'sources')
  url.searchParams.set('regions', region)

  const res = await fetch(url.toString())
  if (!res.ok) {
    return NextResponse.json(null, { status: res.status })
  }
  const data = await res.json()
  return NextResponse.json(data)
}
