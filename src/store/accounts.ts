import { defineStore } from 'pinia';

export type LabelElement={
    text:string;
}

export interface IAccount extends Record<string, any>{
    label: LabelElement[] | null;
    accountType: string | null;
    login: string | null;
    password: string | null;
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
        mutate(account : IAccount,
               field:string,
               value : LabelElement[] | string | null) {
                 this.accounts[this.accounts.indexOf(account)][`${field}`] = value;
        }
    },
    persist:true
});
