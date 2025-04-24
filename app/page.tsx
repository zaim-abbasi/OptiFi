import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
        AI-Powered Yield Optimization
      </h1>
      <p className="max-w-[600px] text-muted-foreground sm:text-lg">
        Maximize your returns with OptiFi&apos;s intelligent DeFi portfolio management on Solana.
      </p>
      <div className="flex gap-4">
        <Button asChild size="lg">
          <Link href="/dashboard">Launch App</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/deposit">Get Started</Link>
        </Button>
      </div>
    </div>
  )
}