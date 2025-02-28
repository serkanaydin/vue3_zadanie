<template>
  <Toolbar class="m-6">
    <template #start>
      <h5>Учетные записи</h5>
      <Button @click="onClickAdd()" icon="bi bi-plus" class="ms-2"/>
    </template>
  </Toolbar>

  <div class="m-5">
    <div class="container" style="width: 800px">
      <div class="row">
        <div class="col-3 text-start fw-bold">МЕТКА</div>
        <div class="col-3 text-start fw-bold">Тип Записи</div>
        <div class="col-3 text-start fw-bold" >Логин</div>
        <div class="col-3 text-start fw-bold">Пароль</div>
      </div>
      <div class="row mt-1" v-for="(account,index) in accountStore.accounts" :key="index">
            <Account :account="account" :index="index" ></Account>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">

//region Imports

import {IAccount, useAccountsStore} from '@/store/accounts';
import Account from "@/components/Accounts/components/Account.vue";

//endregion

//region Declations

const accountStore = useAccountsStore();
const {add} = accountStore;

//endregion

//region Account Adding and Deletion
  function onClickAdd (){
    let newAccount: IAccount = {
      label:null ,
      accountType:null,
      login:null,
      password:null} as IAccount;
    accountStore.add(newAccount);
  }
</script>

<style scoped>
</style>