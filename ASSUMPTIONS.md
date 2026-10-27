
# Assumptions — Transaction Ledger API

1. **Account creation:** Every new account receives a system-generated UUID, a creation timestamp, and an initial balance of zero. Clients cannot choose the initial balance.

2. **Account names:** Account names are required and limited to 100 characters.

3. **Transaction amounts:** Amounts must be positive numbers with at most two decimal places. Zero and negative amounts are rejected.

4. **Transaction types:** Only `credit` and `debit` are supported.

5. **Reference IDs:** A reference ID must be unique within an account. The same reference ID may be used for a different account.

6. **Insufficient funds:** A debit is rejected if the account balance is less than the requested amount. A rejected transaction must not change the balance or create a ledger entry.

7. **Atomic operations:** Balance changes and transaction entries are performed within a database transaction. If an operation fails, its database changes are rolled back.

8. **Concurrent transactions:** Account rows are locked during balance-changing operations to prevent concurrent requests from spending the same available funds.

9. **Transaction immutability:** PostgreSQL triggers prevent existing transaction records from being updated or deleted. Corrections must be represented by new transactions rather than modifying existing records.

10. **Transaction history:** Results are ordered by creation time, newest first, with transaction ID used as a tie-breaker. Pagination starts at page 1, defaults to 10 records per page, and permits a maximum of 100 records per page.

11. **Missing accounts:** Requests for accounts that do not exist return a not-found error.

12. **Fund transfers:** A transfer creates a debit entry for the source account and a credit entry for the destination account in one atomic database transaction. Source and destination accounts must be different.

13. **Transfer references:** The supplied transfer reference is extended with `-DEBIT` and `-CREDIT` to generate the two transaction reference IDs.

14. **Database configuration:** The PostgreSQL connection string is supplied through the `DATABASE_URL` environment variable. Secrets are kept out of source control.

15. **API responses:** Responses use JSON with a `success` indicator and either returned data or an error message.
