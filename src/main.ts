import 'dotenv/config';

import { Database } from './services/database';

import { Account } from './model/Account';
import { Transaction } from './model/Transaction';

import { createAccount } from './controller/createAccount';
import { createTransaction } from './controller/createTransaction';

import { getRandomDate } from './utils/getRandomDate';

const startDate = new Date('2020-01-01');
const endDate = new Date('2024-01-01');

async function main() {
  // Criação da dados ficticios
  for (let i = 0; i < 100; i++) {
    const availableLimit = Math.floor(Math.random() * 9000) + 1000;

    let active: boolean;
    if (availableLimit > 5000) active = true;
    else active = false;

    const amount = Math.floor(Math.random() * 3000) + 1;

    await createAccount(active, availableLimit);
    await createTransaction(
      'Transação' + i,
      amount,
      getRandomDate(startDate, endDate)
    );
  }

  const db = Database.getInstance();

  // Leitura dos dados
  const allAccounts = db.getAllAccounts();
  const allTransactions = db.getAllTransactions();

  console.log('Accounts: ', JSON.stringify(allAccounts, null, 2));
  console.log('Transactions: ', JSON.stringify(allTransactions, null, 2));
}

main();
