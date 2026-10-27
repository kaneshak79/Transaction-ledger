
# Transaction Ledger API

A RESTful backend API built with Node.js, Express.js, and PostgreSQL to manage accounts, process credit and debit transactions, transfer funds, and retrieve transaction history.

## Features

- Create accounts with a zero initial balance.
- Retrieve account details and current balance.
- Perform credit and debit transactions.
- Reject debits when the account has insufficient funds.
- Prevent duplicate transactions using account-specific reference IDs.
- Transfer funds between accounts atomically.
- Retrieve transaction history with type filtering and pagination.
- Return transactions in latest-first order.
- Maintain transaction immutability using a PostgreSQL trigger.
- Validate request data and return appropriate HTTP status codes.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- `pg` — PostgreSQL client
- `dotenv` — environment variable configuration
- `cors` — Cross-Origin Resource Sharing
- `nodemon` — development server

## Prerequisites

- Node.js and npm
- A PostgreSQL database

## Installation

1. Clone the repository:

   ```bash
   git clone <YOUR_GITHUB_REPOSITORY_URL>
   ```

2. Navigate to the project directory:

   ```bash
   cd "transaction ledger API"
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root:

   ```env
   DATABASE_URL=your_postgresql_connection_string
   PORT=3000
   ```

   Replace the placeholder with your PostgreSQL connection string. Never commit real credentials.

5. Set up the database using the schema and SQL instructions in the database setup section below.

## Run the Application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The API runs at:

`http://localhost:3000`

Health check:

`GET /api/health`

## Database Setup

Create the `accounts` and `transactions` tables with the required constraints:

- Unique account IDs.
- Non-negative account balances.
- Positive transaction amounts.
- Credit and debit transaction types only.
- Unique reference IDs per account.
- Foreign key from transactions to accounts.
- An index for efficient transaction-history queries.

Add the PostgreSQL trigger that prevents transaction updates and deletions.

The complete SQL schema and trigger definition should be included in the repository's database setup documentation or SQL file.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check API status |
| POST | `/api/accounts` | Create an account |
| GET | `/api/accounts/:id` | Retrieve account details and balance |
| POST | `/api/transactions` | Create a credit or debit transaction |
| POST | `/api/transactions/transfer` | Transfer funds between accounts |
| GET | `/api/transactions/accounts/:accountId/history` | Retrieve transaction history |

### Create Account

`POST /api/accounts`

```json
{
  "name": "Savings Account"
}
```

### Create Transaction

`POST /api/transactions`

```json
{
  "accountId": "YOUR_ACCOUNT_UUID",
  "type": "credit",
  "amount": 100.00,
  "description": "Initial deposit",
  "referenceId": "REF-001"
}
```

Use `debit` for debit transactions.

### Transfer Funds

`POST /api/transactions/transfer`

```json
{
  "fromAccountId": "SOURCE_ACCOUNT_UUID",
  "toAccountId": "DESTINATION_ACCOUNT_UUID",
  "amount": 50.00,
  "referenceId": "TRANSFER-001"
}
```

The API creates a debit entry for the source account and a credit entry for the destination account within one database transaction.

### Transaction History

`GET /api/transactions/accounts/:accountId/history?page=1&limit=10`

Optional type filters:

- `type=credit`
- `type=debit`

Supported pagination parameters:

- `page` — page number, starting at 1.
- `limit` — records per page, between 1 and 100.

The response includes transaction records and pagination metadata.

## Data Integrity

- Account creation always starts with a zero balance.
- Database transactions ensure that balance changes and ledger entries succeed or fail together.
- Account row locks protect concurrent balance updates.
- Duplicate references are rejected for the same account.
- Transactions cannot be updated or deleted because of the PostgreSQL immutability trigger.
- Rejected transactions do not change account balances.

## Error Handling

The API uses standard HTTP status codes, including:

- `200 OK` — successful retrieval or transfer.
- `201 Created` — successful account or transaction creation.
- `400 Bad Request` — invalid input or insufficient balance.
- `404 Not Found` — account does not exist.
- `409 Conflict` — duplicate transaction reference.
- `500 Internal Server Error` — unexpected server failure.

## Assumptions

See `ASSUMPTIONS.md` for implementation decisions and behavior details.

## API Documentation

See `API_DOCUMENTATION.md` for complete endpoint details, request examples, responses, and error cases.
