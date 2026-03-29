<template>
  <Toast
    position="top-right"
    group="notifications"
    class="opacity-95"
    :pt="{
      message: {
        class: '!bg-transparent !border-0 !shadow-none !p-1.5 !m-0 !w-80 !pr-0',
      },
      messageContent: { class: '!p-0' },
    }"
  >
    <template #container="{ message, closeCallback }">
      <div
        class="bg-white border-2 rounded-2xl shadow-material-2 w-full"
        :class="
          message.data?.type === 'requirement'
            ? 'border-amber-200'
            : 'border-primary-200'
        "
      >
        <div class="flex items-start gap-2 p-4">
          <!-- Icon -->
          <div
            class="w-4 h-4 rounded-full flex items-center justify-center mt-0.5"
            :class="
              message.data?.type === 'requirement'
                ? 'bg-amber-50 text-amber-600'
                : 'bg-primary-50 text-primary-600'
            "
          >
            <AlertTriangle
              v-if="message.data?.type === 'requirement'"
              class="w-4 h-4"
            />
            <Info v-else class="w-4 h-4" />
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2">
              <h4 class="text-sm font-bold text-text-primary truncate">
                {{ message.summary }}
              </h4>
              <button
                @click="closeCallback()"
                class="flex-shrink-0 text-text-tertiary hover:text-text-secondary transition-colors"
              >
                <X class="w-4 h-4" />
              </button>
            </div>
            <p
              v-if="message.data?.plantName"
              class="text-xs text-text-tertiary mt-0.5"
            >
              {{ message.data.plantName }}
            </p>
            <p class="text-sm text-text-secondary mt-1 line-clamp-2">
              {{ message.detail }}
            </p>

            <!-- Actions -->
            <div class="flex items-center gap-2 mt-3">
              <NuxtLink
                to="/notifications"
                @click="(closeCallback(), closeAll())"
                class="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                View
              </NuxtLink>
              <span class="text-surface-300">·</span>
              <button
                @click="
                  onAcknowledge(message.data?.notificationId, closeCallback)
                "
                class="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                Acknowledge
              </button>
              <span class="text-surface-300">·</span>
              <button
                @click="onDismiss(message.data?.notificationId, closeCallback)"
                class="text-xs font-medium text-text-tertiary hover:text-red-500 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Toast>
</template>

<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { AlertTriangle, Info, X } from "lucide-vue-next";
import { useNotificationsStore } from "~/stores/notifications";

const toast = useToast();
const store = useNotificationsStore();
const route = useRoute();

const onAcknowledge = (
  notificationId: string | undefined,
  closeCallback: () => void,
) => {
  if (notificationId) store.acknowledge(notificationId);
  closeCallback();
};

const onDismiss = (
  notificationId: string | undefined,
  closeCallback: () => void,
) => {
  if (notificationId) store.dismiss(notificationId);
  closeCallback();
};

const closeAll = () => {
  toast.removeGroup("notifications");
};

// When navigating to notifications page, clear all toasts
watch(
  () => route.path,
  (path) => {
    if (path === "/notifications") {
      toast.removeGroup("notifications");
    }
  },
);

watch(
  () => store.notifications.length,
  (newLen, oldLen) => {
    if (newLen > oldLen && route.path !== "/notifications") {
      const newest = store.notifications[store.notifications.length - 1];
      if (newest && !newest.read) {
        toast.add({
          group: "notifications",
          severity: newest.type === "requirement" ? "warn" : "info",
          summary: newest.title,
          detail: newest.message,
          data: {
            type: newest.type,
            plantName: newest.plantName,
            notificationId: newest.id,
          },
        });
      }
    }
  },
);
</script>
