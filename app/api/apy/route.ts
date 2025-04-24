import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const asset = searchParams.get('asset')

  if (!asset) {
    return NextResponse.json({ error: 'Asset parameter is required' }, { status: 400 })
  }

  // Mock APY data
  const data = {
    timestamp: Date.now(),
    asset,
    protocols: [
      {
        id: 'marinade',
        name: 'Marinade Finance',
        apy: 5.23,
        tvl: 245000000,
        riskScore: 'low',
        available: true,
        minDeposit: 0.01,
        fee: 0.3,
        lockPeriod: 0,
      },
      {
        id: 'solend',
        name: 'Solend',
        apy: 7.15,
        tvl: 122000000,
        riskScore: 'medium',
        available: true,
        minDeposit: 1,
        fee: 0.1,
        lockPeriod: 0,
      },
    ],
  }

  return NextResponse.json(data)
}