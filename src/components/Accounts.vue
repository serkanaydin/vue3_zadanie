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
        <div class="col-3">
          <InputText v-model="account.label" autofocus fluid style="height: 50px"/>
        </div>
        <div class="col-3">
          <Select v-model="account.accountType" placeholder="Select Account Type" style="height: 50px" :options="accountTypes" autofocus fluid />
        </div>
        <div :class="account.accountType === 'LDAP'? 'col-6' : 'col-3'">
          <InputText v-model="account.login" autofocus fluid style="height: 50px" />
        </div>

        <div class="col-3" v-if="account.accountType !== 'LDAP'">
            <Password v-model="value" toggleMask autofocus fluid style="height:50px"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

  import { useAccountsStore, IAccount } from '@/store/accounts';

  const accountStore = useAccountsStore();
  const {add,remove} = accountStore;
  let accountTypes = ['Локальная','LDAP']

  function onClickAdd (){
    let newAccount: IAccount = {label:"",accountType:"",login:"",password:""} as IAccount;
    accountStore.add(newAccount);
  }

  function onClickRemove(index: number){
    let account = accountStore.accounts.at(index) as IAccount;
    accountStore.remove(account);
  }

</script>


<style scoped>

</style>