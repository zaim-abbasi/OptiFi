'use client'

import { useAPY } from '@/hooks/use-apy'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { usePoolStore } from '@/store/pool-store'

const mockData = [
  { date: '2024-01', value: 5.2 },
  { date: '2024-02', value: 5.8 },
  { date: '2024-03', value: 6.1 },
  { date: '2024-04', value: 5.9 },
]

export default function DashboardPage() {
  const { data: apyData, isLoading } = useAPY('SOL')
  const pools = usePoolStore(state => state.pools)

  return (
    <div className="container py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-8 text-4xl font-bold">Portfolio Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <h3 className="text-lg font-medium">Total Value Locked</h3>
            <p className="mt-2 text-3xl font-bold">$12,345.67</p>
            <p className="text-sm text-muted-foreground">+2.5% from last week</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium">Current APY</h3>
            <p className="mt-2 text-3xl font-bold">6.2%</p>
            <p className="text-sm text-muted-foreground">Weighted average</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium">Total Earnings</h3>
            <p className="mt-2 text-3xl font-bold">$523.45</p>
            <p className="text-sm text-muted-foreground">Since deposit</p>
          </Card>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="allocation">Allocation</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-medium">Performance</h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="allocation" className="mt-6">
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-medium">Current Allocation</h3>
                <div className="space-y-4">
                  {pools.map(pool => (
                    <div key={pool.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{pool.name}</p>
                        <p className="text-sm text-muted-foreground">APY: {pool.apy}%</p>
                      </div>
                      <p className="text-lg font-medium">{pool.allocation}%</p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-medium">Transaction History</h3>
                <p className="text-muted-foreground">No transactions yet.</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  )
}