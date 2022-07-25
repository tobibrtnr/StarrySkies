<script setup lang="ts">
/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @author    Tobias Breitenauer   <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2021-2022
 * @license   MIT
 * 
 * This component provides a card for updating account data.
 */

import { ref, computed } from 'vue'

import StoreUser     from '@/store/StoreUser'
import Router        from '@/router'
import InputField    from '@/component/form/InputField.vue';
import StoreSession  from '@/store/StoreSession';

const
  router              = Router(),
  storeUser           = StoreUser(),
  storeSession        = StoreSession(),
  session             = storeSession.session,
  errorMessage        = computed(() => session.errorMessage ? session.errorMessage.message : "Unknown Error"),

  user                = storeUser.user,

  loading             = ref(false),

  message             = ref(''),
  alertSuccessVisible = ref(false),
  alertErrorVisible   = ref(false),

  deleteConfirm       = ref(false),
  
  errorUsername       = computed(() => session.errorMessage?.properties.includes('username')),
  errorEmail          = computed(() => session.errorMessage?.properties.includes('email')),
  errorDesc           = computed(() => session.errorMessage?.properties.includes('desc')),
  errorPassword       = computed(() => session.errorMessage?.properties.includes('password')),

  // save the account changes
  save = async () => { 
      loading.value = true;
      alertSuccessVisible.value = false;
      alertErrorVisible.value = false;
      if (await storeUser.patchUser()) {
        await storeUser.getUser(user.id);
        alertSuccessVisible.value = true;
      } else {
        alertErrorVisible.value = true;
      }
      loading.value = false;
    },

  // remove the account
  remove = async () => { 
      loading.value = true;
      message.value = '';
      const success = await storeUser.deleteUser()
      loading.value = false;
      if (success) {
        storeUser.logout();
        await router.push('/');
      }
    }
</script>

<template>
  <va-modal 
    v-model="deleteConfirm"
    title="Please confirm"
    message="Do you really want to delete you account?"
    @ok="remove" 
  />
  <section class="card flex md6 mt-4">  
    <va-alert color="success" v-model="alertSuccessVisible" closeable icon="info" class="mb-4">
      Your data was saved.
    </va-alert>
    <va-alert color="danger" v-model="alertErrorVisible" closeable icon="info" class="mb-4">
      {{ errorMessage }}
    </va-alert>

    <h1>Change your account data</h1>

    <InputField title="Username" @keyup.enter="save()">
        <va-input v-model="user.username" :error="errorUsername" />
    </InputField>

    <InputField title="Email" @keyup.enter="save()">
        <va-input v-model="user.email" :error="errorEmail" />
    </InputField>

    <InputField title="Profile Description">
        <va-input
          v-model="user.desc"
          type="textarea"
          :min-rows="3"
          :max-rows="5"
          :error="errorDesc" 
        />
    </InputField>

    <InputField title="Password" @keyup.enter="save()">
        <va-input v-model="user.password" type="password" :error="errorPassword" />
    </InputField>

    <va-progress-bar v-if="loading" indeterminate />
    <div v-else>
      <va-button @click="save">
          Save data
      </va-button>
      <va-button @click="deleteConfirm = !deleteConfirm"
        class="flex ml-2">
        Delete your account
      </va-button>
    </div>
  </section>
</template>

<style lang="scss">
  @import "/css/component/Card.scss";
</style>
