<template>
  <Toast
    :group="group"
    position="top-right"
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
        :class="borderClass(message.severity)"
      >
        <div class="flex items-start gap-2 p-4">
          <!-- Icon -->
          <div
            class="w-4 h-4 flex items-center justify-center mt-0.5"
            :class="iconClass(message.severity)"
          >
            <CheckCircle
              v-if="message.severity === 'success'"
              class="w-4 h-4"
            />
            <AlertTriangle
              v-else-if="message.severity === 'warn'"
              class="w-4 h-4"
            />
            <XCircle v-else-if="message.severity === 'error'" class="w-4 h-4" />
            <Info v-else class="w-4 h-4" />
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2">
              <h4 class="text-sm font-bold text-text-primary truncate">
                {{ message.summary }}
              </h4>
              <Button
                unstyled
                @click="closeCallback()"
                class="flex-shrink-0 text-text-tertiary hover:text-text-secondary transition-colors"
              >
                <X class="w-4 h-4" />
              </Button>
            </div>
            <p
              v-if="message.detail"
              class="text-sm text-text-secondary mt-1 line-clamp-2"
            >
              {{ message.detail }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </Toast>
</template>

<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-vue-next";

type Severity = "success" | "info" | "warn" | "error";

const props = withDefaults(
  defineProps<{
    group?: string;
    timeout?: number;
  }>(),
  {
    group: "generic",
    timeout: 3000,
  },
);

const toast = useToast();

const borderClass = (severity: Severity) => ({
  "border-green-200": severity === "success",
  "border-amber-200": severity === "warn",
  "border-red-200": severity === "error",
  "border-primary-200": severity === "info" || !severity,
});

const iconClass = (severity: Severity) => ({
  "text-green-600": severity === "success",
  "text-amber-600": severity === "warn",
  "text-red-600": severity === "error",
  "text-primary-600": severity === "info" || !severity,
});

const show = (
  summary: string,
  detail?: string,
  severity: Severity = "info",
) => {
  toast.add({
    group: props.group,
    severity,
    summary,
    detail,
    life: props.timeout,
  });
};

defineExpose({ show });
</script>
