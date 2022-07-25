<script setup lang="ts">
/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @author    Tobias Breitenauer   <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2021-2022
 * @license   MIT
 * 
 * This component provides a card for loggin in to the website.
 */

import { ref } from 'vue'

import StoreUser     from '@/store/StoreUser'
import Router        from '@/router'
import InputField    from '@/component/form/InputField.vue';

const
  router    = Router(),
  storeUser = StoreUser(),
  user      = storeUser.user,
  login     = storeUser.login,

  loading      = ref(false),
  error        = ref(false),
  stayLoggedIn = ref(true), 

  // login with credentials
  doLogin = async () => {
      error.value = false;
      loading.value = true;
      error.value = !await login(stayLoggedIn.value);
      loading.value = false;
      if(!error.value) {
          await router.push('/')
      }
  } 
</script>

<template>
  <section class="card flex md6 mt-4" @keyup.enter="doLogin()">  
    <va-alert color="danger" v-model="error" closeable icon="info" class="mb-4">
      Wrong username / email or password.
    </va-alert>

    <h1>Log in here!</h1>
    
    <InputField title="Username / Email">
        <va-input v-model="user.username" :error="error" />
    </InputField>

    <InputField title="Password">
        <va-input v-model="user.password" type="password" :error="error"/>
    </InputField>

    <InputField title="Stay logged in?">
      <va-switch v-model="stayLoggedIn" />
    </InputField>

    <va-progress-bar v-if="loading" indeterminate />
    <va-button       v-else @click="doLogin"> Log in </va-button>
  </section>
</template>

<style lang="scss">
  @import "/css/component/Card.scss";
</style>
