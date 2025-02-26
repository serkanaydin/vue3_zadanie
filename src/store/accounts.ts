import { defineStore } from 'pinia';

export interface IAccount {
    label: string;
    accountType: string;
    login: string;
    password: string;
}

export const useAccountsStore = defineStore('accounts', {
    state: () => ({
        accounts: [] as IAccount[]
    }),
    actions: {
        add(account: IAccount) {
            this.accounts.push(account);
        },
        remove(account: IAccount) {
            this.accounts = this.accounts.filter(acc => acc !== account);
        },
    }
});
