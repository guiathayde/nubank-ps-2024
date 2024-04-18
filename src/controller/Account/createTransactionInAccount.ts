import { Transaction } from '../../model/Transaction';

import { authorizeTransaction } from '../Transaction/authorizeTransaction';

import { Database } from '../../services/database';

export async function createTransactionInAccount(
  accountId: string,
  transaction: Transaction
) {
  const db = Database.getInstance();

  const accountInDatabase = db.getAccountById(accountId);

  if (!accountInDatabase) {
    console.error(`Conta com ID ${accountId} não encontrado.`);
    return;
  }

  const { account, violations } = authorizeTransaction(
    transaction,
    accountInDatabase
  );

  if (violations.length === 0) {
    console.log('Transaction authorized in account: ', account.id);

    account.availableLimit -= transaction.amount;
    account.history.push(transaction);

    db.createTransaction(transaction);
    db.createTransactionInAccount(accountId, transaction);
    db.updateAccount(account);
  } else {
    console.error(
      `Transaction not authorized in account: ${account.id}`,
      violations
    );
  }
}
