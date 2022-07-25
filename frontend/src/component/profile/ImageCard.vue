<script setup lang="ts">
/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This component preview an image in a card.
 */
import { ref, onBeforeMount } from "vue";

import StoreUser                            from '@/store/StoreUser'
import { getImage }                         from "@/service/profileHelper";
import { postSavedImage, deleteSavedImage } from "@/service/saveHelper";
import defaultImage                         from "@/model/defaultImage";

const
  image         = ref(defaultImage()),

  imageLoaded   = ref(false),
  buttonLoading = ref(false),

  storeUser = StoreUser(),

  props = defineProps({
      id: {
          type: String,
          required: true
      }
  }),

  emit        = defineEmits(['saveClicked']),
  saveClicked = () => emit('saveClicked'),

  // loads the image data
  loadData = async () => {
    image.value = await getImage(props.id);
  },

  // change the "save to collection" button
  changeSaved = async (save: boolean) => {
    buttonLoading.value = true;
    if(save) {
      await postSavedImage(props.id);
    } else {
      await deleteSavedImage(props.id);
    }
    await loadData();
    buttonLoading.value = false;
    saveClicked();
  }
  
// load data before mount
onBeforeMount(async () => {
  await loadData();
  imageLoaded.value = true;
});
</script>

<template>
  <div v-if="imageLoaded" class="imagecardwrapper pa-2 flex md4 sm6 xs12">
    <router-link :to="'/image/' + props.id">
      <div class="imagecard">
        <va-card-title class="white">
          {{ image.title }}
        </va-card-title>

        <va-image 
          :ratio="4/3"
          :src="'data:image/webp;base64,' + image.image_data"
        />

        <va-card-content>
          <div class="row justify--space-between">
            <p class="white align-self--center">Uploaded in {{ image.created_at }}</p>
              <div class="justify--end">

                <router-link to="">
                  <div v-if="(storeUser.user.id !== props.id) && storeUser.isAuthorized">
                    <va-button class="ml-2" v-if="image.savedByUser"
                              @click="changeSaved(false)"
                              outline
                              :disabled="buttonLoading"
                              icon="grade"></va-button>
                    <va-button class="ml-2" v-else
                              @click="changeSaved(true)"
                              :disabled="buttonLoading"
                              icon="grade"></va-button>
                  </div>
              </router-link>

            </div>
          </div>
        </va-card-content>
      </div>
    </router-link>
  </div>
</template>

<style lang="scss">
@import "/css/component/ImageCard.scss";
</style>
