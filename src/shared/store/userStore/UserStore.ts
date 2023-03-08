import { action, makeObservable, observable } from 'mobx';
import { IUser } from './interfaces.ts/interfaces';

export class User implements IUser {
    user = { email: '' };
    constructor() {
        makeObservable(this, {
            user    : observable,
            setUser : action,
        });
    }

    setUser(email: string): void {
        this.user.email = email;
    }
}

export const UserStore = new User();
