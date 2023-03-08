import { action, makeObservable, observable } from 'mobx';
import { balanceStore } from './BalanceStore';
import { IAccumulationStore } from './interfaces/interfaces';


export class AccumulationStore implements IAccumulationStore {
    accumulation = 0;

    constructor() {
        makeObservable(this, {
            accumulation    : observable,
            setAccumulation : action,
        });
    }
    
    setAccumulation(sum: number): void {
        this.accumulation = this.accumulation + sum;
        balanceStore.updateCashAccount();
    }
}

export const accumulationStore = new AccumulationStore();
