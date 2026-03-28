<template>
  <Modal :show="show" title="Edit Plant" @close="$emit('close')">
    <form @submit.prevent="onSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-text-primary mb-1.5">
          Name
        </label>
        <input
          v-model="name"
          type="text"
          required
          placeholder="e.g. Office Fern"
          class="w-full px-4 py-2.5 rounded-xl border border-surface-200 bg-surface-50 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-text-primary mb-1.5">
          Species
        </label>
        <input
          v-model="species"
          type="text"
          required
          placeholder="e.g. Nephrolepis exaltata"
          class="w-full px-4 py-2.5 rounded-xl border border-surface-200 bg-surface-50 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-text-primary mb-1.5">
          Watering Frequency
        </label>
        <select
          v-model="wateringFrequency"
          class="w-full px-4 py-2.5 rounded-xl border border-surface-200 bg-surface-50 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
        >
          <option>Daily</option>
          <option>Every 2-3 days</option>
          <option>Weekly</option>
          <option>Bi-weekly</option>
          <option>Monthly</option>
        </select>
      </div>

      <div class="flex gap-3 pt-2">
        <button
          type="button"
          @click="$emit('close')"
          class="flex-1 py-2.5 rounded-xl text-sm font-medium text-text-secondary bg-surface-50 border border-surface-200 hover:bg-surface-100 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 shadow-material transition-colors"
        >
          Save Changes
        </button>
      </div>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { Plant } from "~/stores/plants";

const props = defineProps<{
  show: boolean;
  plant: Plant | null;
}>();

const emit = defineEmits<{
  close: [];
  submit: [data: { name: string; species: string; wateringFrequency: string }];
}>();

const name = ref("");
const species = ref("");
const wateringFrequency = ref("Weekly");

watch(
  () => props.plant,
  (plant) => {
    if (plant) {
      name.value = plant.name;
      species.value = plant.species;
      wateringFrequency.value = plant.wateringFrequency || "Weekly";
    }
  },
  { immediate: true },
);

function onSubmit() {
  emit("submit", {
    name: name.value,
    species: species.value,
    wateringFrequency: wateringFrequency.value,
  });
}
</script>
