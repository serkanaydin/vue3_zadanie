<template>
  <div class="col-2" >
    <InputText
        :value="joinedLabel(state.label)"
        @input = "state.label = convertLabelToLabelElements($event.target.value)"
        @focusout="onLabelChange()"
        autofocus
        fluid
        style="height: 50px"
        :class="v$.label.$error? 'border-danger' :''"/>
  </div>
  <div class="col-3">
    <Select
        v-model="state.accountType"
        @select="onAccountTypeChange()"
        placeholder="Select Account Type"
        style="height: 50px"
        :options="accountTypes"
        autofocus
        fluid />
  </div>
  <div :class="state.accountType === 'LDAP'? 'col-6' : 'col-3'">
    <InputText
        v-model="state.login"
        @focusout="onLoginChange()"
        autofocus
        fluid
        style="height: 50px"
        :class="v$.login.$error? 'border-danger' :''"/>

  </div>
  <div class="col-3" v-if="state.accountType !== 'LDAP'">
    <Password
        v-model="state.password"
        @focusout="onPasswordChange()"
        toggleMask
        autofocus
        fluid
        style="height:50px"
        :input-class="v$.password.$error? 'border-danger' :''"/>
  </div>
  <div class="col-1">
    <Button icon="bi bi-trash" @click="onClickRemove(index)"/>
  </div>
</template>

<script setup lang="ts">
import {defineProps, reactive} from 'vue';
import {IAccount, useAccountsStore} from "@/store/accounts";
import { LabelElement } from '@/store/accounts';
import { useVuelidate } from '@vuelidate/core'
import { required ,maxLength,requiredIf} from '@vuelidate/validators'

const props = defineProps({
  account:IAccount,
  index:Number
})

let models = JSON.parse(JSON.stringify(props.account));
const state = reactive(models)

function checkPasswordRequired(){
  return props.account.accountType === 'Локальная'
}
const labelCustomValidator = (value:LabelElement[]) => joinedLabel(value) !== null && joinedLabel(value).length <=50

const rules ={
  login:{
    maxLength: maxLength(100),
    required},
  label:{
    labelCustomValidator
  },
  password :{
    requiredIfLocal: requiredIf(checkPasswordRequired),
    maxLength:maxLength(50)
  }
}

const v$ = useVuelidate(rules, state)

const accountTypes = [
    'Локальная',
    'LDAP']
const accountStore = useAccountsStore();
const {remove} = accountStore;

//region Label formatting
const joinedLabel = ((label:LabelElement[]) =>{
      if(label !== null){
        return label.map(x=> x.text).join(';');
      }
      else{
        return null;
      }
    }
)

function convertLabelToLabelElements(label:string){
  var result = label.split(';');
  return result.map(item=>  ({text : item} as LabelElement));
}

//endregion

function onLabelChange(){
  v$.value.label.$validate().then(()=> {
    const result = v$.value.label.$invalid
    if (!result) {
      accountStore.mutate(props.account, 'label', state.label);
    }
  })
}

function onLoginChange() {
  v$.value.login.$validate().then(() => {
    const result = v$.value.login.$invalid
    if (!result) {
      accountStore.mutate(props.account, 'login', state.login);
      if(state.login === "LDAP"){
          state.password = null
          accountStore.mutate(props.account, 'password', state.null);
      }
    }
  })
}

  function onPasswordChange() {
    v$.value.password.$validate().then(() => {
      const result = v$.value.password.$invalid
      if (!result) {
        accountStore.mutate(props.account, 'password', state.password);
      }
    })
  }

  function onAccountTypeChange() {
    v$.value.accountType.$validate().then(() => {
      const result = v$.value.accountType.$invalid
      if (!result) {
        accountStore.mutate(props.account, 'accountType', state.accountType);
      }
    });
  }

  function onClickRemove(index: number) {
    let account = accountStore.accounts[index] as IAccount;
    accountStore.remove(account);
  }

</script>
<style scoped>

</style>