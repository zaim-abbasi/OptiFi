import { create } from 'zustand'

interface Pool {
  id: string
  name: string
  apy: number
  tvl: number
  allocation: number
}

interface PoolState {
  pools: Pool[]
  setPools: (pools: Pool[]) => void
  updatePool: (id: string, data: Partial<Pool>) => void
}

export const usePoolStore = create<PoolState>((set) => ({
  pools: [],
  setPools: (pools) => set({ pools }),
  updatePool: (id, data) =>
    set((state) => ({
      pools: state.pools.map((pool) =>
        pool.id === id ? { ...pool, ...data } : pool
      ),
    })),
}))