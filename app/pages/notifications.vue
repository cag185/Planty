<template>
  <div class="min-h-screen bg-white">
    <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-heading font-bold text-text-primary">
            Notifications
          </h1>
          <p class="text-text-secondary mt-1">
            {{ notificationStore.unreadCount }} unread
          </p>
        </div>
        <div
          class="flex gap-2"
          v-if="notificationStore.notifications.length > 0"
        >
          <button
            @click="notificationStore.markAllAcknowledged()"
            class="text-sm font-medium text-text-secondary hover:text-primary-600 bg-surface-50 border border-surface-200 rounded-xl px-4 py-2 transition-colors"
          >
            Mark all read
          </button>
          <button
            @click="notificationStore.markAllCompleted()"
            class="text-sm font-medium text-text-secondary hover:text-red-600 bg-surface-50 border border-surface-200 rounded-xl px-4 py-2 transition-colors"
          >
            Clear all
          </button>
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-if="notificationStore.notifications.length === 0"
        class="text-center py-20 bg-surface-50 rounded-2xl border border-surface-200"
      >
        <BellOff class="w-12 h-12 text-surface-300 mx-auto mb-4" />
        <h2 class="text-xl font-heading font-bold text-text-primary mb-2">
          No notifications
        </h2>
        <p class="text-text-secondary">
          You're all caught up. We'll notify you when something needs attention.
        </p>
      </div>

      <template v-else>
        <!-- Requirement Notifications -->
        <div
          v-if="notificationStore.requirementNotifications.length > 0"
          class="mb-10"
        >
          <h2
            class="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4"
          >
            Action Required
          </h2>
          <div class="space-y-3">
            <div
              v-for="n in notificationStore.requirementNotifications"
              :key="n.id"
              class="rounded-2xl p-5 border transition-all"
              :class="
                n.completed
                  ? 'bg-surface-50 border-surface-100 opacity-60'
                  : n.acknowledged
                    ? 'bg-white border-surface-200'
                    : 'bg-amber-50/50 border-amber-200'
              "
            >
              <div class="flex items-start gap-4">
                <div
                  class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  :class="
                    n.completed
                      ? 'bg-surface-100 text-surface-400'
                      : 'bg-amber-100 text-amber-600'
                  "
                >
                  <AlertTriangle v-if="!n.completed" class="w-5 h-5" />
                  <CheckCircle v-else class="w-5 h-5" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-2">
                    <div>
                      <h3
                        class="text-sm font-bold text-text-primary"
                        :class="{ 'line-through': n.completed }"
                      >
                        {{ n.title }}
                      </h3>
                      <!-- <p
                        v-if="n.plantName"
                        class="text-xs text-text-tertiary mt-0.5"
                      >
                        {{ n.plantName }}
                      </p> -->
                    </div>
                    <span class="text-xs text-text-tertiary flex-shrink-0">
                      {{ n.dateCreated }}
                    </span>
                  </div>
                  <p class="text-sm text-text-secondary mt-1.5">
                    {{ n.message }}
                  </p>
                  <div class="flex gap-2 mt-3">
                    <button
                      v-if="!n.completed"
                      @click="notificationStore.markAsCompleted(n.id)"
                      class="text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Mark as done
                    </button>
                    <button
                      @click="notificationStore.markAsAcknowledged(n.id)"
                      class="text-xs font-medium text-text-tertiary hover:text-red-500 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Autonomous Notifications -->
        <div v-if="notificationStore.updateNotifications.length > 0">
          <h2
            class="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4"
          >
            Autonomous Updates
          </h2>
          <div class="space-y-3">
            <div
              v-for="n in notificationStore.updateNotifications"
              :key="n.id"
              class="rounded-2xl p-5 border transition-all"
              :class="
                n.acknowledged
                  ? 'bg-white border-surface-200'
                  : 'bg-blue-50/50 border-blue-200'
              "
            >
              <div class="flex items-start gap-4">
                <div
                  class="w-10 h-10 bg-blue-100 text-blue-500 rounded-xl flex items-center justify-center flex-shrink-0"
                >
                  <Info class="w-5 h-5" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-2">
                    <div>
                      <h3 class="text-sm font-bold text-text-primary">
                        {{ n.title }}
                      </h3>
                      <!-- <p
                        v-if="n.plantName"
                        class="text-xs text-text-tertiary mt-0.5"
                      >
                        {{ n.plantName }}
                      </p> -->
                    </div>
                    <span class="text-xs text-text-tertiary flex-shrink-0">
                      {{ n.dateCreated }}
                    </span>
                  </div>
                  <p class="text-sm text-text-secondary mt-1.5">
                    {{ n.message }}
                  </p>
                  <div class="flex gap-2 mt-3">
                    <button
                      v-if="!n.acknowledged"
                      @click="notificationStore.markAsAcknowledged(n.id)"
                      class="text-xs font-medium text-text-secondary bg-surface-50 hover:bg-surface-100 border border-surface-200 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Acknowledge
                    </button>
                    <button
                      @click="notificationStore.markAsCompleted(n.id)"
                      class="text-xs font-medium text-text-tertiary hover:text-red-500 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { BellOff, AlertTriangle, CheckCircle, Info } from "lucide-vue-next";
import { useNotificationsStore } from "~/stores/notifications";

const notificationStore = useNotificationsStore();

function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  return `${diffDays}d ago`;
}
</script>
