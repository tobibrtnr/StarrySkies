<script setup lang="ts">
/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This component provides the header for the website.
 */
import { ref }              from 'vue'
import StoreUser            from '@/store/StoreUser'
import Router               from '@/router';
import HeaderDropdownButton from '@/component/header/HeaderDropdownButton.vue';
import SearchBar            from './SearchBar.vue';

const 
  storeUser     = StoreUser(),
  router        = Router(),
  
  logoutConfirm = ref(false)
</script>

<template>
  <va-modal v-model="logoutConfirm" message="Do you really want to log out?" title="Please confirm" @ok="storeUser.logout(); router.go(0)" />
  <va-affix :offset-top="0">
    <header>
      <div class="brand" @click="router.push('/')">
        <h1>Starry<b>Skies</b> ✨</h1>
      </div>
      <div class="row justify--end">
        <SearchBar class="mr-2" />
        <div :class="storeUser.visibilityNotAuthorized">
            <router-link to="/register"><va-button class="mr-2"> Register </va-button></router-link>
            <router-link to="/login">   <va-button>              Login    </va-button></router-link>
        </div>
        <div :class="storeUser.visibilityAuthorized">
          <HeaderDropdownButton :username="storeUser.user.username"/>
          <va-button @click="logoutConfirm = !logoutConfirm"> Log out </va-button>
        </div>
      </div>
    </header>
  </va-affix>
</template>

<style lang="scss">
@import "/css/component/AppHeader.scss";
</style>
