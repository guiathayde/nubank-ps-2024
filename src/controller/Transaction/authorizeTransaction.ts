import { Account } from '../../model/Account';
import { Transaction } from '../../model/Transaction';

type Violations =
  | 'account-not-active'
  | 'first-transaction-above-threshold'
  | 'insufficient-limit'
  | 'highfrequency-small-interval'
  | 'doubled-transaction';

interface AuthorizeTransactionReponse {
  account: Account;
  violations: Violations[];
}

export function authorizeTransaction(
  transaction: Transaction,
  account: Account
): AuthorizeTransactionReponse {
  const violations: Violations[] = [];

  // Nenhuma transação deve ser aceita para uma conta inativa: account-not-active
  if (!account.active) {
    violations.push('account-not-active');
  }

  // O valor da primeira transação não deve exceder 90% do limite: first-transaction-above-threshold
  if (
    account.history.length === 0 &&
    transaction.amount > account.availableLimit * 0.9
  ) {
    violations.push('first-transaction-above-threshold');
  }

  // O valor da transação não deve exceder o limite disponível: insufficient-limit
  if (transaction.amount > account.availableLimit) {
    violations.push('insufficient-limit');
  }

  // Verificação de transações duplicadas e de alta frequência
  const twoMinutesAgo = new Date(transaction.time.getTime() - 120000); // 120000ms = 2 minutes
  const recentTransactions = account.history.filter(
    (t) => t.time >= twoMinutesAgo
  );

  // Não deve haver mais que 3 transações de qualquer comerciante em um intervalo de 2 minutos: highfrequency-small-interval
  const transactionsWithSameMerchant = recentTransactions.filter(
    (t) => t.merchant === transaction.merchant
  );
  if (transactionsWithSameMerchant.length >= 3) {
    violations.push('highfrequency-small-interval');
  }

  // Não deve haver mais que 1 transação similar (mesmo valor e comerciante) no intervalo de 2 minutos: doubled-transaction
  const similarTransactions = recentTransactions.filter(
    (t) =>
      t.merchant === transaction.merchant && t.amount === transaction.amount
  );
  if (similarTransactions.length >= 1) {
    violations.push('doubled-transaction');
  }

  return {
    account,
    violations,
  };
}
