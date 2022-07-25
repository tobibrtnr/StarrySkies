<script setup lang="ts">
/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This component is the card that displays when viewing an image.
 */
import { ref, onBeforeMount } from "vue";

import StoreUser from '@/store/StoreUser'

import { getImage }                         from '@/service/profileHelper';
import { postSavedImage, deleteSavedImage } from '@/service/saveHelper';
import defaultImage                         from '@/model/defaultImage';
import { deleteUpload }                     from "@/service/uploadHelper";
import Router                               from "@/router";

const
  storeUser = StoreUser(),
  router    = Router(),

  image         = ref(defaultImage()),
  imageLoaded   = ref(false),
  buttonLoading = ref(false),
  deleteConfirm = ref(false),

  emit        = defineEmits(['saveClicked']),
  saveClicked = () => emit('saveClicked'),

  props = defineProps({
      id: {
          type: String,
          required: true
      }
  }),

  // load image data from the database
  loadData = async () => {
    image.value = await getImage(props.id as string);
  },

  // handles click on "save to collection" button
  changeSaved = async (save: boolean) => {
    buttonLoading.value = true;
    if (save) {
      await postSavedImage(props.id as string);
    } else {
      await deleteSavedImage(props.id as string);
    }
    await loadData();
    buttonLoading.value = false;
    saveClicked();
  },

  // delete image as owner
  deleteImage = async () => {
    await deleteUpload(image.value.id as string);
    router.push('/' + storeUser.user.username);
  }

// load the data before mounting
onBeforeMount(async () => {
  await loadData();
  imageLoaded.value = true;
});
</script>

<template>
  <!-- modal for confirming image deletion -->
  <va-modal v-model="deleteConfirm" message="Do you really want to delete your image?" 
            title="Please confirm" @ok="deleteImage()" />
  <!-- if the image is loaded -->
  <div v-if="imageLoaded" class="imageviewwrapper mt-2">
    <!-- left card for image -->
    <div class="imagecardwrapper pa-2 flex md7 sm6">
      <div class="imageviewpart">
        <va-card-title>
          {{ image.title }}
        </va-card-title>
        <va-image style="height: 100%; width: auto"
          :ratio ="4/3"
          contain
          :src="'data:image/webp;base64,' + image.image_data"
        />
      </div>
    </div>
    <!-- right card for image details -->
    <div class="imagecardwrapper imageinfo flex md5 sm6 pa-2">
      <div class="imageviewpart">
        <va-card-title>
          Image Data
        </va-card-title>
        <va-card-content>
          <div class="row justify--space-between">
              <p>
                Image created by 
                  <router-link :to="'/' + image.username">
                    <va-button>{{ image.username }}</va-button>
                  </router-link>
              </p>
          </div>
          <div v-if="image.desc !== null">
            <div class="mb-2 mt-4">
              <p>Description</p>
            </div>
            <va-divider />
            <div class="row mt-1">
              <p class="imagedesc">
                <i>{{ image.desc }}</i>
              </p>
            </div>
          </div>
          <div v-if="image.customProps !== null">
            <div class="mb-2 mt-4">
              <p>Image Properties</p>
            </div>
            <va-divider class="mt-1" />
            <div class="propsTable">
              <va-data-table 
                :items="image.customProps"
                hide-default-header
                striped
              />
            </div>
          </div>
        </va-card-content>
      </div>
    </div>
  </div>
  <!-- image view footer -->
  <div v-show="imageLoaded" class="flex imageviewpart saveimagecard ma-2 pa-2">
    <p class="ml-2 align-self--center justify-self--start">
      Uploaded in {{ image.created_at }}
    </p>
    <va-button
      v-if="storeUser.user.id === image.account_id"
      class="mr-2"
      @click="deleteConfirm = true"
    >
      Delete your image
    </va-button>
    <va-button 
      class="justify-self--end" 
      @click="changeSaved(!image.savedByUser)" 
      :outline="image.savedByUser"
      :disabled="buttonLoading"
      :class="storeUser.visibilityAuthorized"
      icon="grade"
    >
      <span v-if="image.savedByUser">
        Remove this image from your collection
      </span>
      <span v-else>
        Add this image to your collection
      </span>
    </va-button>
  </div>
</template>

<style lang="scss">
@import "/css/component/FullImageCard.scss";
</style>
