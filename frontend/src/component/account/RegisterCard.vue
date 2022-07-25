<script setup lang="ts">
/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @author    Tobias Breitenauer   <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2021-2022
 * @license   MIT
 * 
 * This component provides a card for registering as a new user.
 */
import { computed, ref } from 'vue';

import StoreSession  from '@/store/StoreSession';
import StoreUser     from '@/store/StoreUser';
import Router        from '@/router';
import InputField    from '@/component/form/InputField.vue';

const
  router       = Router(),
  storeSession = StoreSession(),
  session      = storeSession.session,  
  storeUser    = StoreUser(),
  user         = storeUser.user,

  loading      = ref(false),
  error        = ref(false),
  
  errorUsername = computed(() => session.errorMessage?.properties.includes('username')),
  errorEmail    = computed(() => session.errorMessage?.properties.includes('email')),
  errorPassword = computed(() => session.errorMessage?.properties.includes('password')),

  errorMessage = computed(() => session.errorMessage ? session.errorMessage.message : "Unknown Error"),
  
  doRegister   = async () => { 
    error.value   = false;
    loading.value = true;
    const success = await storeUser.register();
    error.value   = !success;
    loading.value = false;
    if(success) {
        await router.push('/')
    }
  } 
</script>

<template>
  <section class="card flex md6 mt-4" @keyup.enter="doRegister()">  
    <va-alert color="danger" v-model="error" closeable icon="info" class="mb-4">
      {{ errorMessage }}
    </va-alert>

    <h1>Register here!</h1>

    <InputField title="Username">
        <va-input v-model="user.username" :error="errorUsername" />
    </InputField>

    <InputField title="Email">
        <va-input v-model="user.email" :error="errorEmail" />
    </InputField>

    <InputField title="Password">
        <va-input v-model="user.password" type="password" :error="errorPassword"/>
    </InputField>

    <va-progress-bar v-if="loading" indeterminate />
    <va-button       v-else @click="doRegister"> Register </va-button>
  </section>
</template>

<style lang="scss">
  @import "/css/component/Card.scss";
</style>
