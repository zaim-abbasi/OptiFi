# OptiFi Specification

## Project Overview

OptiFi is a Solana-based AI yield-optimization decentralized application designed to maximize returns on users' crypto assets. By leveraging machine learning algorithms to analyze on-chain data and market conditions, OptiFi automatically allocates users' funds across various DeFi protocols to achieve optimal yields while maintaining user-defined risk parameters. The platform offers a seamless experience for depositing, rebalancing, and withdrawing funds, all secured by Solana's high-performance blockchain.

## User Flows

### Connect Wallet

<details>
<summary>Connect to Solana Wallet</summary>

1. User lands on OptiFi homepage
2. User clicks "Connect Wallet" button in the navigation bar
3. Modal appears with supported wallet options (Phantom, Solflare, Backpack, etc.)
4. User selects their preferred wallet
5. Browser extension or mobile app prompts for connection approval
6. User approves the connection
7. UI updates to show connected wallet address and SOL balance
8. Session is established and persisted until disconnection or session timeout

**Requirements:**
- Support multiple Solana wallets using Wallet Adapter
- Display truncated wallet address with copy option
- Show current SOL balance with USD equivalent
- Provide disconnect option in dropdown menu
</details>

### Deposit SOL/Stablecoin

<details>
<summary>Deposit Funds</summary>

1. User navigates to "Deposit" section from dashboard
2. System displays available asset options (SOL, USDC, USDT, etc.)
3. User selects asset type to deposit
4. User enters amount or selects percentage of wallet balance
5. System displays estimated APY based on current market conditions
6. User confirms deposit intention
7. Wallet prompts for transaction approval
8. User approves transaction
9. System displays transaction status (pending, confirmed, or failed)
10. Upon confirmation, funds appear in user's OptiFi portfolio
11. User receives success notification

**Requirements:**
- Real-time wallet balance check
- Minimum deposit thresholds
- Transaction fee estimation
- Clear error handling for insufficient funds
</details>

### View AI-Driven Allocation

<details>
<summary>Portfolio and Allocation View</summary>

1. User navigates to "Portfolio" or "Dashboard" section
2. System displays current portfolio value with percentage change
3. Visual breakdown shows allocation across different protocols
4. For each allocation:
   - Protocol name and icon
   - Current APY
   - Allocated amount and percentage
   - Performance metrics
5. AI recommendation section shows:
   - Current allocation strategy
   - Potential optimizations
   - Risk assessment
6. Historical performance chart displays returns over time
7. User can toggle between different time periods (24h, 7d, 30d, etc.)

**Requirements:**
- Real-time data updates
- Interactive charts and visualizations
- Risk level indicators
- Comparative performance metrics
</details>

### Rebalance (on-chain tx)

<details>
<summary>Portfolio Rebalancing</summary>

1. System periodically analyzes market conditions and yield opportunities
2. When beneficial rebalancing is identified, notification appears
3. User navigates to "Rebalance" section
4. System displays:
   - Current allocation
   - Proposed allocation
   - Estimated yield improvement
   - Cost of rebalancing (gas fees)
   - Net benefit calculation
5. User can modify allocation percentages or accept AI recommendation
6. User confirms rebalance intention
7. Wallet prompts for transaction approval
8. User approves transaction
9. System executes necessary on-chain swaps and deposits
10. Progress indicator shows completion stages
11. Upon completion, updated portfolio view appears
12. Transaction history updates with rebalance details

**Requirements:**
- Gas optimization for complex transactions
- Slippage tolerance settings
- Batched transactions where possible
- Timeout and retry mechanisms
</details>

### Withdraw Funds

<details>
<summary>Withdraw Process</summary>

1. User navigates to "Withdraw" section
2. System displays available balance for withdrawal
3. User selects asset type for withdrawal
4. User enters amount or percentage of portfolio
5. System calculates and displays:
   - Withdrawal amount
   - Transaction fees
   - Estimated time to process
6. User confirms withdrawal intention
7. Wallet prompts for transaction approval
8. User approves transaction
9. System unwraps positions from various protocols
10. Funds are transferred to user's wallet
11. Success confirmation appears with transaction details

**Requirements:**
- Partial or complete withdrawal options
- Emergency withdrawal mode (higher fees but faster execution)
- Withdrawal fee calculator
- Clear communication of processing time
</details>

## Edge Cases

### Transaction Failures
- **Failed Deposit**: If a deposit transaction fails, the system should detect the failure through transaction status polling and display an appropriate error message with retry options.
- **Failed Withdrawal**: If a withdrawal transaction fails, funds remain in the protocol, and users should be notified with detailed error information and recovery steps.
- **Failed Rebalance**: If a rebalance transaction fails midway, the system should attempt to complete or revert to the original state, with clear communication to the user about partial completion.

### Account Issues
- **Low Wallet Balance**: System should prevent deposit attempts if wallet balance is insufficient to cover both the deposit amount and transaction fees.
- **Minimum Deposit Not Met**: Clear error message when user attempts to deposit below minimum threshold for economical yield farming.
- **Maximum Exposure Limits**: Warning when user attempts to allocate more than recommended percentage to high-risk protocols.

### Network Conditions
- **Network Congestion**: During high network congestion, provide estimated time for transaction processing and option to increase gas fees.
- **RPC Node Failures**: Implement redundant RPC connections to prevent service disruption if primary node fails.
- **Price Feed Delays**: Use time-weighted averages to prevent erratic allocation decisions during price feed delays.

### Protocol Risks
- **Protocol Exploitation**: Emergency withdrawal function if security issue is detected in underlying protocol.
- **APY Volatility**: Smoothing algorithm to prevent unnecessary rebalancing during short-term APY fluctuations.
- **Liquidity Constraints**: Dynamic allocation limits based on protocol TVL to prevent impaired withdrawals.

### User Experience
- **Session Timeout**: Graceful handling of wallet disconnection with session recovery options.
- **Concurrent Transactions**: Prevent multiple simultaneous transactions that could conflict.
- **Mobile Disconnection**: Resilient state management for users on unstable mobile connections.

## API Endpoints

### `/api/apy`

<details>
<summary>APY Data Endpoint</summary>

**Purpose**: Retrieves current APY rates across supported protocols for informed allocation decisions.

**Method**: GET

**Parameters**:
- `asset`: String (e.g., "SOL", "USDC") - The asset type to get APY data for
- `amount`: Number (optional) - Amount to consider for tier-based APYs
- `riskLevel`: String (optional) - "low", "medium", "high" for risk-filtered results

**Response**:
```json
{
  "timestamp": 1678234567890,
  "asset": "USDC",
  "protocols": [
    {
      "id": "marinade",
      "name": "Marinade Finance",
      "apy": 5.23,
      "tvl": 245000000,
      "riskScore": "low",
      "available": true,
      "minDeposit": 0.01,
      "fee": 0.3,
      "lockPeriod": 0
    },
    {
      "id": "solend",
      "name": "Solend",
      "apy": 7.15,
      "tvl": 122000000,
      "riskScore": "medium",
      "available": true,
      "minDeposit": 1,
      "fee": 0.1,
      "lockPeriod": 0
    }
    // Additional protocols...
  ],
  "aiRecommendation": {
    "optimal": [
      {
        "protocol": "marinade",
        "percentage": 40
      },
      {
        "protocol": "solend",
        "percentage": 35
      },
      {
        "protocol": "francium",
        "percentage": 25
      }
    ],
    "estimatedApy": 6.82,
    "riskLevel": "medium",
    "confidence": 0.87
  }
}
```

**Error Responses**:
- 400: Invalid parameters
- 404: Asset not supported
- 500: Server error with processing data
- 503: Temporary service unavailability

**Rate Limits**: 10 requests per minute per IP
</details>

### `/api/rebalance`

<details>
<summary>Rebalance Analysis and Execution</summary>

**Purpose**: Analyzes current allocation, proposes optimized distribution, and handles rebalancing transactions.

**Method**: POST

**Headers**:
- `Authorization`: Bearer token or wallet signature for authentication

**Request Body (Analysis)**:
```json
{
  "portfolioId": "user_portfolio_12345",
  "action": "analyze"
}
```

**Response (Analysis)**:
```json
{
  "currentAllocation": [
    {
      "protocol": "marinade",
      "amount": 5.2,
      "percentage": 35,
      "apy": 5.23
    },
    {
      "protocol": "solend",
      "amount": 9.8,
      "percentage": 65,
      "apy": 6.15
    }
  ],
  "recommendedAllocation": [
    {
      "protocol": "marinade",
      "targetAmount": 3.0,
      "targetPercentage": 20,
      "apy": 5.23,
      "change": -2.2
    },
    {
      "protocol": "solend",
      "targetAmount": 7.5,
      "targetPercentage": 50,
      "apy": 6.15,
      "change": -2.3
    },
    {
      "protocol": "francium",
      "targetAmount": 4.5,
      "targetPercentage": 30,
      "apy": 8.42,
      "change": 4.5
    }
  ],
  "metrics": {
    "currentApy": 5.82,
    "projectedApy": 6.63,
    "apyImprovement": 0.81,
    "estimatedFees": 0.012,
    "netBenefit": "positive",
    "breakEvenDays": 12,
    "confidence": 0.89
  },
  "rebalanceId": "rb_12345678"
}
```

**Request Body (Execute)**:
```json
{
  "rebalanceId": "rb_12345678",
  "action": "execute",
  "customAllocation": [
    {
      "protocol": "marinade",
      "targetPercentage": 25
    },
    {
      "protocol": "solend",
      "targetPercentage": 45
    },
    {
      "protocol": "francium",
      "targetPercentage": 30
    }
  ]
}
```

**Response (Execute - Initial)**:
```json
{
  "status": "processing",
  "transactionIds": [
    "5UYkBu1oUNVjcC7ek5JymWP9JUQzaP9NBWRfP6fvJLA6zYk1LPrwYLMR25r9...",
    "8JqKkFZV5AZJhg1Az1Kcnci5Y2vsGnGCtRCQK7QJ7XnkbGzGNjNyKQ3cFrsV..."
  ],
  "progress": {
    "status": "withdrawing",
    "completedSteps": 1,
    "totalSteps": 5,
    "currentProtocol": "marinade",
    "estimatedTimeRemaining": "2 minutes"
  },
  "pollingEndpoint": "/api/rebalance/status/rb_12345678"
}
```

**Error Responses**:
- 400: Invalid allocation parameters
- 401: Unauthorized access
- 422: Cannot execute rebalance (insufficient funds, etc.)
- 500: Server processing error
- 503: Service temporarily unavailable

**Rate Limits**:
- Analysis: 5 requests per minute per user
- Execution: 1 request per 5 minutes per user
</details>