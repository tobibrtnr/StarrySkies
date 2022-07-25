<script setup lang="ts">
/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This view shows an profile page.
 */
import { ref, onBeforeMount } from "vue";
import { useRoute }           from "vue-router";

import { getProfileExisting } from '@/service/profileHelper'
import ProfileHeader          from '@/component/profile/ProfileHeader.vue'
import ImageContainer         from '@/component/profile/ImageContainer.vue'

const
  route       = useRoute(),
  profileName = route.params.profile,
  loading     = ref(true),
  accFound    = ref(),

  // get if the profile is existing
  loadData    = async () => {
    accFound.value = await getProfileExisting(profileName as string)
    loading.value  = false;
  };

// load the data before mounting
onBeforeMount(async () => await loadData());
</script>

<template>
  <div v-show="!loading">
    <!-- account was found -->
    <section v-if="accFound">
      <ProfileHeader  :username="(profileName as string)" />

      <ImageContainer :username="(profileName as string)"/>
    </section>

    <!-- account was not found -->
    <section v-else class="card flex md6 mt-4 ml-2">  
      <h1>The user {{ route.params.profile }} was not found</h1>

      <p>Please check the username you entered or go back to the home page.</p>
    </section>
  </div>
</template>

<style lang="scss">
  @import "/css/component/Card.scss";
</style>
