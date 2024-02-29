# Flows

### Creator

1. Navigate to our front-end
2. Connect wallet
3. Input token and amount
4. Enter number of recipients (or specific users)
5. Encrypt amount from front-end
6. Send Transaction to create contract
7. Return link to Frame

### User

1. Click on Frame
2. Get public address from frame
3. Call contract from backend with address (e.g. `distribute(public_address)`)

# Architecture Requirements

## Interface

- Connect wallet (INCO Network)
- Input token & amount
- Determine recipient requirements
- Encrypt amount
- Send contract creation transaction

## Backend

- API endpoint for frame callback
- Send transaction to contract

## Contracts

- Create a factory for deployments
- Deposit tokens
- define recipient restraints (first 10, only followers, etc)
- Allow claim function with public address
