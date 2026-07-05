<template>
  <Modal :show="show" title="Water Plant" @close="$emit('close')">
    <form @submit.prevent="waterPlant()" class="space-y-4">
      <div class="justify-items-center flex-col">
        <label class="block text-sm font-medium text-text-primary mb-1.5">
          Enter a Date the Plant was Last Watered:
        </label>
        <div>
          <DatePicker
            v-model="dateLastWatered"
            dateFormat="yy-mm-dd"
            :maxDate="maxDateValue"
          />
        </div>
      </div>
      <div v-if="loading" class="my-4 pt-8 flex justify-center">
        <WrappedLoadingIndicator :loading="loading" />
      </div>
      <div
        v-if="!compareDateEq(props.plant?.dateLastWatered ?? null, new Date())"
        class="pb-4 justify-items-center w-full"
      >
        <button
          type="button"
          @click="markPlantAsWateredToday()"
          class="flex items-center gap-1.5 md:w-38 text-sm font-medium text-black hover:text-blue-600 bg-blue-100 hover:bg-blue-200 border border-surface-200 rounded-xl py-2 px-4 transition-colors"
        >
          <Droplets class="w-8 h-8 text-blue-400" />
          <span class="text-center">Mark this plant as watered today.</span>
        </button>
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
import { useToast } from "primevue/usetoast";
import { Droplets } from "lucide-vue-next";
import DatePicker from "primevue/datepicker";

const toast = useToast();

// Control if the form is loading.
const loading = ref(false);

const props = defineProps<{
  show: boolean;
  plant: Plant | null;
}>();

const emit = defineEmits<{
  dateLastWatered: [];
  close: [];
}>();

const dateLastWatered = ref<Date | null>(null);

const store = usePlantsStore();
const maxDateValue = ref(new Date());

watch(
  () => props.plant,
  (plant) => {
    if (plant) {
      dateLastWatered.value = plant.dateLastWatered;
    }
  },
  { immediate: true },
);
const markPlantAsWateredToday = async () => {
  dateLastWatered.value = null;
  await waterPlant();
};

const waterPlant = async () => {
  if (!props.plant) {
    return;
  }
  loading.value = true;
  try {
    await store.updatePlant(props.plant.id, {
      dateLastWatered: dateLastWatered.value
        ? new Date(dateLastWatered.value)
        : new Date(),
    });
  } catch (error) {
    console.error("Error saving changes:", error);
    loading.value = false;
    toast.add({
      group: "generic",
      severity: "error",
      summary: "Error watering plant",
      detail: "There was an error while trying to mark the plant as watered.",
      life: 3000,
    });
    return;
  }
  loading.value = false;
  toast.add({
    group: "generic",
    severity: "success",
    summary: "Plant watered successfully",
    detail: "The plant has been updated as watered successfully.",
    life: 3000,
  });

  // clear the stored value of the date last watered for next use.
  dateLastWatered.value = null;

  // Emit the dateLastWatered event so the parent can react to the change.
  emit("dateLastWatered");
};
</script>
