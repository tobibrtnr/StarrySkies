<script setup lang="ts">
/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This view shows an profile page.
 */
import { onBeforeMount, ref } from 'vue';

import StoreUser           from '@/store/StoreUser';
import ImageCard           from '@/component/profile/ImageCard.vue';
import { getNewestImages } from '@/service/profileHelper';
import defaultImages       from '@/model/defaultImages';
import Router              from '@/router';

const 
  router = Router(),
  storeUser = StoreUser(),
  images = ref(defaultImages()),
  
  // get newest images (of everyone if not logged in or of your saved
  // accounts, if logged in)
  loadData = async() => {
    if(storeUser.isNotAuthorized) {
      images.value = await getNewestImages();
    } else {
      images.value = await getNewestImages(storeUser.user.username as string);
    }
  }

// load data before mounting
onBeforeMount(async () => {
  await loadData();
});
</script>

<template>
  <!-- If user is not logged in -->
  <div v-if="storeUser.isNotAuthorized" class="card mt-4 ml-2 mr-2 mb-2">
    <h1>Welcome!</h1>
    <div class="mb-3">Here you can find the newest images uploaded from our users.</div>
    <div class="mb-3">You want to upload your own pictures or save images and profiles?</div>
    <div><b>Please <va-button @click="router.push('/register')">Register</va-button> your new account
            or <va-button @click="router.push('/login')">Log in</va-button> to an existing one.</b>
    </div>
  </div>
  <!-- If user is logged in -->
  <div v-else class="card mt-4 ml-2 mr-2 mb-2">
    <h1>Welcome, {{ storeUser.user.username }}</h1>
    <div>Here you can find the newest images uploaded by your saved users.</div>
  </div>
  <div class="ImageContainer flex md-12">
    <div class="row">
      <ImageCard 
        v-for="img in images"
        :key="img.id"
        :id="(img.id as string)"
        @saveClicked="loadData()"
      />
    </div>
  </div>
</template>

<style lang="scss">
    @import "/css/component/Card.scss";
</style>
