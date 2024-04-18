import { authorizeTransaction } from '../controller/Transaction/authorizeTransaction';

import { createAccount } from '../controller/Account/createAccount';
import { createTransactionInAccount } from '../controller/Account/createTransactionInAccount';
import { createTransaction } from '../controller/Transaction/createTransaction';

import { getRandomDate } from './getRandomDate';

const startDate = new Date('2020-01-01');
const endDate = new Date('2024-01-01');

export async function generateFakeData() {
  for (let i = 0; i < 10; i++) {
    const availableLimit = Math.floor(Math.random() * 9000) + 1000;

    let active: boolean;
    if (availableLimit > 5000) active = true;
    else active = false;

    const amount = Math.floor(Math.random() * 3000) + 1;

    const newAccount = await createAccount(active, availableLimit);
    const newTransaction = await createTransaction(
      'Transação' + i,
      amount,
      getRandomDate(startDate, endDate)
    );

    const { violations, account } = await authorizeTransaction(
      newTransaction,
      newAccount
    );
    // Se todas as regras forem atendidas, o valor da transação autorizada deve ser subtraído do saldo da conta e o
    // histórico de transações da conta deve ser atualizado
    if (violations.length === 0) {
      await createTransactionInAccount(account.id, newTransaction);
      console.log('Transaction authorized in account: ', account.id);
    } else {
      console.error(
        `Transaction not authorized in account: ${account.id}`,
        violations
      );
    }
  }
}
