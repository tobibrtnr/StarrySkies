<script setup lang="ts">
/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This view shows an image page.
 */
import { ref, onBeforeMount } from "vue";
import { useRoute }           from "vue-router";

import { getImageExisting }   from '@/service/profileHelper'
import FullImageCard          from '@/component/profile/FullImageCard.vue'

const
  route       = useRoute(),
  imageid     = route.params.image_id,
  loading     = ref(true),
  imgFound    = ref(),

  // get if the profile is existing
  loadData    = async () => {
    imgFound.value = await getImageExisting(imageid as string)
    loading.value  = false;
  }

// load before mounting
onBeforeMount(async () => loadData());
</script>

<template>
  <div v-show="!loading">
    <!-- image was found -->
    <section v-if="imgFound">
      <FullImageCard :id="(imageid as string)" />
    </section>

    <!-- image was not found -->
    <section v-else class="card flex md6 mt-4 ml-2">  
      <h1>The image was not found</h1>

      <p>Please check the image url you entered or go back to the home page.</p>
    </section>
  </div>
</template>

<style lang="scss">
  @import "/css/component/Card.scss";
</style>
