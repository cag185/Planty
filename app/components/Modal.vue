<template>
  <Transition
    enter-active-class="transition-opacity duration-200 ease-out"
    leave-active-class="transition-opacity duration-150 ease-in"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        class="absolute inset-0 bg-black/30 backdrop-blur-sm"
        @click="$emit('close')"
      ></div>
      <div
        class="relative bg-white rounded-2xl shadow-material-lg border border-surface-100 w-full max-w-md p-8"
      >
        <button
          @click="$emit('close')"
          class="absolute top-4 right-4 text-text-tertiary hover:text-text-primary transition-colors"
        >
          <X class="w-5 h-5" />
        </button>
        <h2 class="text-xl font-heading font-bold text-text-primary mb-6">
          {{ title }}
        </h2>
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { X } from "lucide-vue-next";

defineProps<{
  show: boolean;
  title: string;
}>();

defineEmits<{
  close: [];
}>();
</script>
