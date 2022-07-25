<script setup lang="ts">
/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This view shows the account collection of a user.
 */
import { onBeforeMount, ref } from "vue";

import { getSaved }           from "@/service/profileHelper";
import defaultSaved           from "@/model/defaultSaved";
        
import ProfileHeader          from '@/component/profile/ProfileHeader.vue'

import StoreUser              from "@/store/StoreUser";

const
  storeUser = StoreUser(),
  saved     = ref(defaultSaved()),

  // get all saved accounts
  loadData  = async () => {
    saved.value = await getSaved(storeUser.user.username as string);
  }

// load the data before mounting
onBeforeMount(async () => {
  await loadData();
});
</script>

<template>
  <div class="card mt-4 ml-2 mr-2">
    <h1>Your saved profiles ({{ saved.length }})</h1>
  </div>
  <ProfileHeader 
    v-for="user in saved"
    :key="user.username"
    :username="(user.username as string)"
    :withLink="true"
    @save-clicked="loadData()" 
  />
</template>

<style lang="scss">
  @import "/css/component/Card.scss";
</style>
