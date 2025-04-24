import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  if (!body.portfolioId) {
    return NextResponse.json({ error: 'Portfolio ID is required' }, { status: 400 })
  }

  // Mock rebalance analysis data
  const data = {
    currentAllocation: [
      {
        protocol: 'marinade',
        amount: 5.2,
        percentage: 35,
        apy: 5.23,
      },
      {
        protocol: 'solend',
        amount: 9.8,
        percentage: 65,
        apy: 6.15,
      },
    ],
    recommendedAllocation: [
      {
        protocol: 'marinade',
        targetAmount: 3.0,
        targetPercentage: 20,
        apy: 5.23,
        change: -2.2,
      },
      {
        protocol: 'solend',
        targetAmount: 7.5,
        targetPercentage: 50,
        apy: 6.15,
        change: -2.3,
      },
    ],
    metrics: {
      currentApy: 5.82,
      projectedApy: 6.63,
      apyImprovement: 0.81,
      estimatedFees: 0.012,
      netBenefit: 'positive',
      breakEvenDays: 12,
      confidence: 0.89,
    },
  }

  return NextResponse.json(data)
}