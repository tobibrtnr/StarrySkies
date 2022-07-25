<script setup lang="ts">
/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This component is the dropdown menu for important links in the header.
 */
import Router from '@/router';

const
  router = Router(),
  props = defineProps({
    username: {
        required: true
    }
    });
</script>

<template>
  <va-button-dropdown :label="(props.username as string)" class="mr-2">
    <ul>
      <li class="pa-2">
      <router-link :to="'/' + props.username">
        <span class="black">Profile</span>
      </router-link>
      </li>
      <li class="pa-2">
      <router-link to="/collection/accounts">
        <span class="black">Your Account Collection</span>
      </router-link>
      </li>
      <li class="pa-2">
      <router-link to="/collection/images">
        <span class="black">Your Image Collection</span>
      </router-link>
      </li>
      <li class="pa-2">
      <router-link to="/settings">
        <span class="black">Settings</span>
      </router-link>
      </li>
      <li class="pa-2">
      <router-link to="/upload">
        <span class="black">Upload</span>
      </router-link>
      </li>
    </ul>
  </va-button-dropdown>
</template>
