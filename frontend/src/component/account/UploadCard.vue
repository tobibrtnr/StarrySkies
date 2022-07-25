<script setup lang="ts">
/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @author    Tobias Breitenauer   <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2021-2022
 * @license   MIT
 * 
 * This component provides a card for uploading images.
 */

import { ref, computed } from 'vue'
import { VaFileUpload }  from 'vuestic-ui';

import Router            from '@/router';
 
import InputField        from '@/component/form/InputField.vue';
import { uploadImage }   from '@/service/uploadHelper'
import StoreUser         from '@/store/StoreUser';
import StoreSession      from '@/store/StoreSession';
import defaultImage      from '@/model/defaultImage';

const
  router       = Router(),
  storeUser    = StoreUser(),
  storeSession = StoreSession(),
  session      = storeSession.session,

  image           = ref(defaultImage()),
  imagePropsCount = ref(0),

  loading      = ref(false),
  error        = ref(false),

  errorMessage = computed(() => session.errorMessage ? session.errorMessage.message : "Unknown Error"),

  errorTitle   = computed(() => session.errorMessage?.properties.includes('title')),
  errorImage   = computed(() => session.errorMessage?.properties.includes('image')),
  errorDesc    = computed(() => session.errorMessage?.properties.includes('desc')),
  
  // upload a new image
  upload = async () => {
    error.value = false;
    loading.value = true;
    const success = await uploadImage(image.value);
    error.value = !success;
    loading.value = false;
    if(success) {
      await router.push('/' + storeUser.user.username);
    }
  },

  // update the custom props value
  updateVal = (add: boolean) => {
    if(add) {
      image.value.customProps.push({key: undefined, value: undefined});
      imagePropsCount.value++;
    } else {
      image.value.customProps.pop();
      imagePropsCount.value--;
    }
  }
</script>

<template>
  <section class="card flex md6 mt-4">  
    <va-alert color="danger" v-model="error" closeable icon="info" class="mb-4">
      {{ errorMessage }}
    </va-alert>

    <h1>Upload a new image</h1>

    <InputField title="Title">
      <va-input v-model="image.title" :error="errorTitle" />
    </InputField>

    <InputField title="Description (optional)">
      <va-input v-model="image.desc" :error="errorDesc" />
    </InputField>

    <InputField title="Choose your image">      
      <va-file-upload
        v-model="image.file"
        dropzone
        type="single"
        file-types=".jpg,.png,.jpeg"
        :error="errorImage" 
      />
    </InputField>

    <InputField title="Set custom image properties">
      <p class="mb-2">
        Please set each Property Name and Value in order to save your Images Properties correctly.
      </p>
      <div class="row">
        <va-button icon="remove" class="mb-2 mr-2" @click="updateVal(false)" :disabled="imagePropsCount <= 0"/>
        <va-button icon="add"    class="mb-2"      @click="updateVal(true)" />
      </div>  
      <div v-if="imagePropsCount > 0">
        <div v-for="prop in imagePropsCount"
            :key="prop"
            class="row mb-2">
          <va-input v-model="image.customProps[prop-1]['key']"  :placeholder="prop + '. Image Property'" class="mr-2" />
          <va-input v-model="image.customProps[prop-1]['value']" placeholder="Property Value" />
        </div>
      </div>
    </InputField>

    <va-progress-bar v-if="loading" indeterminate />
    <va-button       v-else @click="upload">
      Publish
    </va-button>
  </section>
</template>

<style lang="scss">
  @import "/css/component/Card.scss";
</style>
