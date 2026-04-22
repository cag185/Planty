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
import { useNotificationsStore } from "~/stores/notifications";

const demo = useDemoNotifications();
const notificationStore = useNotificationsStore();

onMounted(() => {
  // demo.start();
  notificationStore.getNotifications();
});

onUnmounted(() => {
  // demo.stop();
});
</script>
