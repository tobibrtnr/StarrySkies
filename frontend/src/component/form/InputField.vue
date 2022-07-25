<script setup lang="ts">
/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This component is a often used wrapper for input fields.
 */
const props = defineProps({
title: {
    type: String,
    required: true
}
});
</script>

<template>
  <div class="mb-4">
    <va-divider orientation="left" class="mb-3">
      <span class="px-2">{{ props.title }}</span>
    </va-divider>
    <slot></slot>
  </div>
</template>
