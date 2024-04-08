import { Account } from '../model/Account';

import { Database } from '../services/database';

export async function createAccount(
  active: boolean,
  availableLimit: number
): Promise<Account> {
  console.log('Creating account');
  console.log('Se necessario fazer alguma validacao, fazer aqui');

  const account = new Account(active, availableLimit);

  const db = Database.getInstance();

  db.createAccount(account);

  return account;
}
