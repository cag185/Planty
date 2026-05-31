<template>
  <Button
    unstyled
    v-bind="$attrs"
    :disabled="disabled"
    :label="label"
    class="rounded-full px-6 py-3 text-sm font-medium transition-colors shadow-material disabled:opacity-50 disabled:cursor-not-allowed"
    :class="[variantClasses, $attrs.class]"
  >
    <slot />
  </Button>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    label?: string;
    disabled?: boolean;
    variant?: "primary" | "danger";
  }>(),
  {
    disabled: false,
    variant: "primary",
  },
);

const variantClasses = computed(() => {
  switch (props.variant) {
    case "danger":
      return "bg-red-500 hover:bg-red-700 text-white disabled:hover:bg-red-500";
    case "primary":
    default:
      return "bg-primary-500 hover:bg-primary-700 text-white disabled:hover:bg-primary-500";
  }
});
</script>
