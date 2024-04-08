import { Account } from '../model/Account';
import { Transaction } from '../model/Transaction';

export class Database {
  private static instance: Database;

  public accounts: Array<Account>;
  public transactions: Array<Transaction>;

  constructor() {
    this.accounts = [];
    this.transactions = [];
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  getAllAccounts(): Array<Account> {
    return this.accounts;
  }

  getAllAccountsActive(): Array<Account> {
    return this.accounts.filter((account) => account.active);
  }

  getAccountById(id: string): Account | undefined {
    return this.accounts.find((account) => account.id === id);
  }

  createAccount(account: Account): void {
    this.accounts.push(account);
  }

  getAllTransactions(): Array<Transaction> {
    return this.transactions;
  }

  getTransactionById(id: string): Transaction | undefined {
    return this.transactions.find((transaction) => transaction.id === id);
  }

  createTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
  }
}
