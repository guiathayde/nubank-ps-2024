import { randomUUID } from 'node:crypto';

import { Transaction } from './Transaction';

export class Account {
  public id: string;
  public active: boolean;
  public availableLimit: number;
  public history: Array<Transaction>;

  constructor(active: boolean, availableLimit: number) {
    this.id = randomUUID();
    this.active = active;
    this.availableLimit = availableLimit;
    this.history = [];
  }
}
