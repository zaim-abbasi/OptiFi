'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function WithdrawPage() {
  const [amount, setAmount] = useState<string>('')
  const [percentage, setPercentage] = useState<number>(100)

  const handleWithdraw = async () => {
    // Implement withdrawal logic
  }

  return (
    <div className="container py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-8 text-4xl font-bold">Withdraw Funds</h1>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Amount</h2>
            <div className="space-y-4">
              <div>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="text-lg"
                />
                <p className="mt-2 text-sm text-muted-foreground">
                  Available balance: 0 SOL
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium">Percentage to withdraw</p>
                <Slider
                  value={[percentage]}
                  onValueChange={values => setPercentage(values[0])}
                  max={100}
                  step={1}
                />
                <p className="mt-1 text-right text-sm">{percentage}%</p>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Withdrawal Notice</AlertTitle>
                <AlertDescription>
                  Withdrawals may take up to 24 hours to process depending on the protocols
                  involved.
                </AlertDescription>
              </Alert>

              <Button className="w-full" size="lg" onClick={handleWithdraw}>
                Withdraw
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Withdrawal Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-muted-foreground">Amount</p>
                <p className="font-medium">0 SOL</p>
              </div>
              <div className="flex justify-between">
                <p className="text-muted-foreground">Network Fee</p>
                <p className="font-medium">~0.000005 SOL</p>
              </div>
              <div className="flex justify-between">
                <p className="text-muted-foreground">Protocol Fees</p>
                <p className="font-medium">~0.001 SOL</p>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <p className="font-medium">You will receive</p>
                  <p className="font-bold">0 SOL</p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-muted p-4">
              <h3 className="mb-2 font-medium">Withdrawal Sources</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Marinade Finance</span>
                  <span>0 SOL</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Solend</span>
                  <span>0 SOL</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}