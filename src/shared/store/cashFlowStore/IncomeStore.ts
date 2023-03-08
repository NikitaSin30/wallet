import { action, makeObservable, observable } from 'mobx';
import { balanceStore } from './BalanceStore';

interface IIncomeStore {
  income: number;
  setIncome: (sum:number) => void;
}


export class IncomeStore implements IIncomeStore {
    income = 0;

    constructor() {
        makeObservable(this, {
            income    : observable,
            setIncome : action,
        });
    }
    setIncome(sum: number): void {
        this.income = this.income + sum;
        balanceStore.updateCashAccount();
    }
}

export const incomeStore = new IncomeStore();
