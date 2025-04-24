import { create } from 'zustand'

interface WalletState {
  connected: boolean
  publicKey: string | null
  balance: number
  setConnected: (connected: boolean) => void
  setPublicKey: (publicKey: string | null) => void
  setBalance: (balance: number) => void
}

export const useWalletStore = create<WalletState>((set) => ({
  connected: false,
  publicKey: null,
  balance: 0,
  setConnected: (connected) => set({ connected }),
  setPublicKey: (publicKey) => set({ publicKey }),
  setBalance: (balance) => set({ balance }),
}))