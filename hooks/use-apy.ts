'use client'

import { useQuery } from '@tanstack/react-query'

export function useAPY(asset: string) {
  return useQuery({
    queryKey: ['apy', asset],
    queryFn: async () => {
      const response = await fetch(`/api/apy?asset=${asset}`)
      if (!response.ok) {
        throw new Error('Failed to fetch APY data')
      }
      return response.json()
    },
  })
}