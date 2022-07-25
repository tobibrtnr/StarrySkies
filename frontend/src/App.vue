<script setup lang="ts">
/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This is the main view for the website with header and router view.
 */
import AppHeader from "@/component/header/AppHeader.vue";
</script>

<template>
  <AppHeader />

  <main>
    <div class="mainContainer">
      <router-view :key="$route.fullPath"/>
    </div>
  </main>
</template>

<style lang="scss">
@import "/css/App.scss";
</style>
