<script setup lang="ts">
/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2021-2022
 * @license   MIT
 * 
 * This component provides a modal for displaying saved accounts.
 */
import { ref, watch } from 'vue';

const
  props = defineProps({
    data: {
      type: Array,
      required: true
    },
    model: {
      type: Boolean,
      required: true
    }
  }),

  emit        = defineEmits(['modalClosed']),
  modalClosed = () => emit('modalClosed'),
  modalShown  = ref(false)

// watch the modalShown value
watch(() => props.model, (newVal) => {
  modalShown.value = newVal;
});
</script>

<template>
  <va-modal
    v-model="modalShown"
    @before-close="modalClosed()"
    hide-default-actions
  >
    <h2>
      <slot></slot>
    </h2>
  <va-list>
    <va-list-item
      v-for="user in props.data" 
      :key="user.username"
    >
      <router-link :to="'/' + user.username">
        <va-list-item-section>
          <va-list-item-label>
            {{ user.username }}
          </va-list-item-label>
          <va-list-item-label caption>
            since {{ user.saved_at }}
          </va-list-item-label>
        </va-list-item-section>
      </router-link>
    </va-list-item>
  </va-list>
  </va-modal>
</template>
