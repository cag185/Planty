<template>
  <ProgressSpinner
    v-bind="$props"
    v-if="props.loading"
    class="w-16 h-16 text-primary-500"
  />
</template>
<script setup lang="ts">
import ProgressSpinner from "primevue/progressspinner";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>
