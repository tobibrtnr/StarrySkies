<script setup lang="ts">
/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This component is the search bar for the header.
 */
import { ref }              from 'vue'
import Router               from '@/router';
import { getProfileSearch } from '@/service/profileHelper';
import defaultProfiles      from '@/model/defaultProfiles';

const 
  router        = Router(),
  searchQuery   = ref(''),
  searchResult  = ref(defaultProfiles()),
  loading       = ref(false),

  typed  = async () => {
    if(searchQuery.value.trim().length !== 0) {
      loading.value = true;
      searchResult.value = await getProfileSearch(searchQuery.value.trim());
      loading.value = false;
    }
  };
</script>

<template>
<div class="searchBar">
  <va-popover
    color="white"
    trigger="click"
  >
    <va-input
      v-model="searchQuery"
      @update:model-value="typed"
      placeholder="search a profile"
    >
      <template #prependInner>
      <va-icon
          name="search"
      />
      </template>
    </va-input>
    <template #body>
        <!-- if status is loading -->
        <div v-if="loading">
           <va-progress-bar class="progressbar" indeterminate />
        </div>
        <div v-else>
          <!-- if no input text -->
          <div v-if="searchQuery.trim().length === 0">
            try searching for a profile...
          </div>
          <!-- else if input text given -->
          <div v-else>
            <!-- if et least one result -->
            <div v-if="searchResult.length > 0">
              <div
                v-for="user in searchResult" 
                :key="user.username"
              >
                <router-link :to="'/' + user.username" class="black">
                  {{ user.username }}
                </router-link>
                <va-divider />
              </div>
            </div>
            <!-- else if no result -->
            <div v-else>
              no profile named <i>{{ searchQuery }}...</i> was found
            </div>
        </div>
      </div>
    </template>
  </va-popover>
  </div>
</template>
