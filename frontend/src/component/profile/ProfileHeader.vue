<script setup lang="ts">
/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2021-2022
 * @license   MIT
 */          
import { ref, onBeforeMount }                   from 'vue';
        
import { postSavedAccount, deleteSavedAccount } from '@/service/saveHelper';
import { getProfile, getSaved, getSavedBy }     from '@/service/profileHelper';

import StoreUser      from '@/store/StoreUser'

import defaultProfile from '@/model/defaultProfile';
import defaultSaved   from '@/model/defaultSaved';
import SavedModal     from './SavedModal.vue';

const
  storeUser = StoreUser(),
  
  props = defineProps({
    username: {
      type: String,
      required: true
    },
    withLink: {
      type: Boolean,
    }
  }),

  profile = ref(defaultProfile()),
  saved   = ref(defaultSaved()),
  savedBy = ref(defaultSaved()),

  showSavedModal   = ref(false),
  showSavedByModal = ref(false),

  buttonLoading = ref(false),
  loaded        = ref(false),

  emit        = defineEmits(['saveClicked']),
  saveClicked = () => emit('saveClicked'),

  // loads the user and save / savedby data
  loadData = async (accName: string) => {
    profile.value = await getProfile(accName);
    loaded.value  = true;
    saved.value   = await getSaved(profile.value.username as string);
    savedBy.value = await getSavedBy(profile.value.username as string);
  },

  // handles click on the "save to collection" button
  changeSaved = async (save: boolean) => {
    buttonLoading.value = true;
    if(save) {
      await postSavedAccount(profile.value.id as string);
    } else {
      await deleteSavedAccount(profile.value.id as string);
    }
    await loadData(props.username as string);
    buttonLoading.value = false;
    saveClicked();
  }

// load the data before mounting
onBeforeMount(async () => {
  await loadData(props.username as string)
});
</script>

<template>
  <!-- Modals to show the saved profiles -->
  <SavedModal :model="showSavedModal"   @modal-closed="showSavedModal = false"   :data="saved">
    Profiles that {{ profile.username }} saved
  </SavedModal>
  <SavedModal :model="showSavedByModal" @modal-closed="showSavedByModal = false" :data="savedBy">
    Users that added {{ profile.username }} to their collection
  </SavedModal>
  
  <section v-if="loaded" class="flex md12 card ma-2 mt-3">
    <!-- If in the collection overview -->
    <router-link class="white" v-if="props.withLink === true" :to="'/' + profile.username">
      <h1>{{ profile.username }}</h1>
    </router-link>
    <!-- Else if part of the profile -->
    <h1 v-else>{{ profile.username }}'s profile</h1>

    <div class="row mb-4">
      <!-- Buttons to view the saved / savedBy -->
      <va-button
        @click="if(savedBy.length !== 0) showSavedByModal = true;"> 
          saved by {{ profile.saved_by }} users
      </va-button>
      <va-button
        @click="if(saved.length !== 0)   showSavedModal = true;" class="ml-2">
          saved {{ profile.saved }} users
      </va-button>

      <!-- Buttons to save / unsave the profile -->
      <div v-if="(storeUser.user.id !== profile.id) && storeUser.isAuthorized">
        <va-button class="ml-2" v-if="profile.savedByUser"
                  @click="changeSaved(!profile.savedByUser)"
                  outline
                  :disabled="buttonLoading"
                  icon="grade">remove this user from your collection</va-button>
        <va-button class="ml-2" v-else
                  @click="changeSaved(!profile.savedByUser)"
                  :disabled="buttonLoading"
                  icon="grade">save this user to your collection</va-button>
      </div>
    </div>
    <div class="row mb-4">
      <p>{{ profile.desc }}</p>
    </div>
    <div class="row">
      <p>Account created in {{ profile.created_at }}</p>
    </div>
  </section>
</template>

<style lang="scss">
  @import "/css/component/Card.scss";
</style>
