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
        <div class="col-2" >
          <InputText
              :ref="(el:any) => registerRef(index, 'label',el)"
              :value="joinedLabel(account.label)"
              @input="onInput(account,index,'label',$event)"
              autofocus
              fluid
              style="height: 50px"/>
        </div>
        <div class="col-3">
          <Select
              :ref="(el:any) => registerRef(index, 'accountType',el)"
              :value="account.accountType"
              @change="onInput(account,index,'accountType',$event)"
              placeholder="Select Account Type"
              style="height: 50px"
              :options="accountTypes"
              autofocus
              fluid />
        </div>
        <div :class="account.accountType === 'LDAP'? 'col-6' : 'col-3'">
          <InputText
              :ref="(el:any) => registerRef(index, 'login',el)"
              :value="account.login"
              @input="onInput(account,index,'login',$event)"
              autofocus
              fluid
              style="height: 50px"/>
        </div>
        <div class="col-3" v-if="account.accountType !== 'LDAP'">
            <Password
                :ref="(el:any) => registerRef(index, 'password',el)"
                :value="account.password"
                @input="onInput(account,index,'password',$event)"
                :required="account.accountType==='Локальная'"
                toggleMask
                autofocus
                fluid
                style="height:50px"/>
        </div>
        <div class="col-1">
          <Button icon="bi bi-trash" @click="onClickRemove(index)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {IAccount, LabelElement, useAccountsStore} from '@/store/accounts';
import {computed, ref} from "vue";

const accountStore = useAccountsStore();
  const {add,remove} = accountStore;
  let accountTypes = ['Локальная','LDAP']
  const inputRefs = ref({});

  function onClickAdd (){
    let newAccount: IAccount = {label:[] as LabelElement[] ,accountType:"",login:"",password:""} as IAccount;
    accountStore.add(newAccount);
  }

  function onClickRemove(index: number){
    let account = accountStore.accounts.at(index) as IAccount;
    accountStore.remove(account);
  }

  const joinedLabel = ((label:LabelElement[]) =>{
        return label.map(x=> x.text).join(';');
      }
  )
  const registerRef = (index:number,
                       field:string,
                       el:any) => {
    const inputRef = `${index}${field}`;
    inputRefs.value[inputRef] = el;
  };


  function convertLabelToLabelElements(label:string){
    var result = label.split(';');
    return result.map(item=>  ({text : item} as LabelElement));
  }

  function completeValidation(account: IAccount,
                              el:any,
                              field:string,
                              validationResult :boolean,
                              value: string ){
    if(validationResult){
      if(field==='label'){
        accountStore.mutate(account, field, convertLabelToLabelElements(value));
      }
      else{
        accountStore.mutate(account, field,value);
      }
      el.$el.classList.remove('border-danger');
    }
    else{
      el.$el.classList.add('border-danger');
    }
  }

  function onInput(account : IAccount,
                   index:number,
                   field:string,
                   event:any){
        const inputRef = `${index}${field}`;
        const el = inputRefs.value[inputRef];
        let validationResult:boolean=false;
        let value:any;
        switch (field){
          case 'label':
            value= event.target.value;
            validationResult = value.length <= 50;
            break;
          case 'login':
            value= event.target.value;
            validationResult = value.length <= 100;
            break;
          case 'password':
            value= event.target.value;
            validationResult = value.length <= 100; break;
          case 'accountType':
            value = event.value;
            validationResult = true; break;
        }
        completeValidation(account,el,field,validationResult,value);
  }

</script>

<style scoped>
</style>