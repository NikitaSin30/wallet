import { action, makeObservable, observable } from 'mobx';
import { balanceStore } from './BalanceStore';

interface ISpendingStore{
    spending: number,
    setSpending:(sum:number) => void
}


class SpendingStore implements ISpendingStore {
    spending = 0;
    constructor() {
        makeObservable(this, {
            spending    : observable,
            setSpending : action,
        });
    }
    setSpending(sum: number): void {
        this.spending = this.spending + sum;
        balanceStore.updateCashAccount();
    }
}

export const spendingStore = new SpendingStore();
