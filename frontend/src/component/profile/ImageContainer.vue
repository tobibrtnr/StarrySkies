<script setup lang="ts">
/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This component loads every image of a user as an image card.
 */
import defaultImages          from '@/model/defaultImages';
import { onBeforeMount, ref } from 'vue';

import ImageCard     from "./ImageCard.vue";
import { getImages } from '@/service/profileHelper';

const 
  images = ref(defaultImages()),

  props = defineProps({
      username: {
          type: String,
          required: true
      }
  });

// get the images to load before mounting
onBeforeMount(async () => {
  images.value = await getImages(props.username);
})
</script>

<!-- Fill the Container dynamically with ImageCards -->
<template>
  <div class="ImageContainer flex md-12">
    <div class="row">
      <ImageCard v-for="img in images" :key="img.id" :id="(img.id as string)" />
    </div>
  </div>
</template>
