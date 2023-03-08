import { makeObservable, observable } from 'mobx';
import { spendingStore } from './SpendingStore';
import { accumulationStore } from './AccumulationStore';
import { incomeStore } from './IncomeStore';
import { IBalanceStore } from './interfaces/interfaces';


export class BalanceStore implements IBalanceStore {
    spending = 0;
    income = 0;
    accumulation = 0;
    moneyAccount = this.income - this.spending - this.accumulation;

    constructor() {
        makeObservable(this, {
            moneyAccount : observable,
        });
    }

    updateCashAccount(): void {
        this.moneyAccount = incomeStore.income - spendingStore.spending - accumulationStore.accumulation;
    }
}

export const balanceStore = new BalanceStore();
