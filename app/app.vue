<template>
  <div
    class="min-h-screen bg-surface-50 font-sans selection:bg-primary-100 selection:text-text-primary"
  >
    <Navbar />
    <NuxtPage />
    <ToastNotifications />
  </div>
</template>

<script setup lang="ts">
import { useDemoNotifications } from "~/composables/useDemoNotifications";

const demo = useDemoNotifications();

onMounted(() => {
  // demo.start();
});

onUnmounted(() => {
  // demo.stop();
});
</script>
