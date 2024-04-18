import { Database } from './services/database';

import { authorizeTransaction } from './controller/Transaction/authorizeTransaction';

import { createAccount } from './controller/Account/createAccount';
import { createTransaction } from './controller/Transaction/createTransaction';
import { createTransactionInAccount } from './controller/Account/createTransactionInAccount';

import { getRandomDate } from './utils/getRandomDate';
import { generateFakeData } from './utils/generateFakeData';

const startDate = new Date('2020-01-01');
const endDate = new Date('2024-01-01');

async function main() {
  // Criação da dados ficticios
  // generateFakeData();

  const newAccount1 = await createAccount(true, 1000); // Caso bem sucedido
  const newAccount2 = await createAccount(false, 1000);
  const newAccount3 = await createAccount(true, 1000);
  const newAccount4 = await createAccount(true, 1000);
  const newAccount5 = await createAccount(true, 1000);
  const newAccount6 = await createAccount(true, 1000);

  console.log('Transação bem sucedida');
  const newTransaction0 = await createTransaction(
    'Transação de erro',
    500,
    getRandomDate(startDate, endDate)
  );
  await createTransactionInAccount(newAccount1.id, newTransaction0);

  console.log(
    'Nenhuma transação deve ser aceita para uma conta inativa: account-not-active'
  );
  const newTransaction1 = await createTransaction(
    'Transação de erro',
    500,
    getRandomDate(startDate, endDate)
  );
  await createTransactionInAccount(newAccount2.id, newTransaction1);

  console.log(
    'O valor da primeira transação não deve exceder 90% do limite: first-transaction-above-threshold'
  );
  const newTransaction2 = await createTransaction(
    'Transação de erro',
    900,
    getRandomDate(startDate, endDate)
  );
  await createTransactionInAccount(newAccount3.id, newTransaction2);

  console.log(
    'O valor da transação não deve exceder o limite disponível: insufficient-limit'
  );
  const newTransaction3 = await createTransaction(
    'Transação de erro',
    1010,
    getRandomDate(startDate, endDate)
  );
  await createTransactionInAccount(newAccount4.id, newTransaction3);

  console.log(
    'Não deve haver mais que 3 transações de qualquer comerciante em um intervalo de 2 minutos: highfrequency-small-interval'
  );
  const newTransaction4 = await createTransaction(
    'Transação de erro',
    10,
    new Date()
  );
  const newTransaction5 = await createTransaction(
    'Transação de erro',
    15,
    new Date()
  );
  const newTransaction6 = await createTransaction(
    'Transação de erro',
    20,
    new Date()
  );
  await createTransactionInAccount(newAccount5.id, newTransaction4);
  await createTransactionInAccount(newAccount5.id, newTransaction5);
  await createTransactionInAccount(newAccount5.id, newTransaction6);


  console.log(
    'Não deve haver mais que 1 transação similar (mesmo valor e comerciante) no intervalo de 2 minutos: doubled-transaction'
  );
  const newTransaction7 = await createTransaction(
    'Transação de erro',
    25,
    new Date()
  );
  const newTransaction8 = await createTransaction(
    'Transação de erro',
    25,
    new Date()
  );
  await createTransactionInAccount(newAccount6.id, newTransaction7);
  await createTransactionInAccount(newAccount6.id, newTransaction8);

  // ------------------------------------------------------------------------------------------------ //
  // Leitura dos dados
  // const db = Database.getInstance();

  // // Leitura dos dados
  // const allAccounts = db.getAllAccounts();
  // const allTransactions = db.getAllTransactions();

  // console.log('Accounts: ', JSON.stringify(allAccounts, null, 2));
  // console.log('Transactions: ', JSON.stringify(allTransactions, null, 2));
}

main();
