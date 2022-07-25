<script setup lang="ts">
/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This view shows the image collection of a user.
 */
import { onBeforeMount, ref } from 'vue';

import StoreUser          from '@/store/StoreUser';
import ImageCard          from '@/component/profile/ImageCard.vue';
import { getSavedImages } from '@/service/profileHelper';
import defaultSaved       from '@/model/defaultSaved';

const 
  storeUser = StoreUser(),
  images = ref(defaultSaved()),
  
  // gett all saved images
  loadData = async() => {
    images.value = await getSavedImages(storeUser.user.username as string);
  }

// load the data before mounting
onBeforeMount(async () => {
  await loadData();
});
</script>

<template>
  <div class="card mt-4 ml-2 mr-2 mb-2">
    <h1>Your saved images ({{ images.length }})</h1>
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
