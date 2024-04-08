import { randomUUID } from 'node:crypto';

export class Transaction {
  public id: string;
  public merchant: string;
  public amount: number;
  public time: Date;

  constructor(merchant: string, amount: number, time: Date) {
    this.id = randomUUID();
    this.merchant = merchant;
    this.amount = amount;
    this.time = time;
  }
}
