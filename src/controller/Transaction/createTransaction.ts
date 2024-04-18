import { Transaction } from '../../model/Transaction';

import { Database } from '../../services/database';

export async function createTransaction(
  merchant: string,
  amount: number,
  time: Date
): Promise<Transaction> {
  const transaction = new Transaction(merchant, amount, time);

  const db = Database.getInstance();

  db.createTransaction(transaction);

  return transaction;
}
