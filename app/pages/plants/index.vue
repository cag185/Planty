<template>
  <div class="min-h-screen bg-white">
    <!-- Main Content -->
    <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <div class="mb-8">
        <h1 class="text-3xl font-heading font-bold text-text-primary">
          My Plants
        </h1>
        <p class="text-text-secondary mt-1">
          {{ store.plantCount }} plant{{ store.plantCount !== 1 ? "s" : "" }} in
          your collection
        </p>
      </div>

      <!-- Empty State -->
      <div
        v-if="store.plants.length === 0"
        class="text-center py-20 bg-surface-50 rounded-2xl border border-surface-200 shadow-material"
      >
        <Leaf class="w-12 h-12 text-primary-300 mx-auto mb-4" />
        <h2 class="text-xl font-heading font-bold text-text-primary mb-2">
          No plants yet
        </h2>
        <p class="text-text-secondary mb-6">
          Add your first plant to get started.
        </p>
        <button
          @click="openAddForm"
          class="inline-flex items-center gap-2 bg-primary-400 hover:bg-primary-500 text-white px-6 py-3 rounded-full text-sm font-medium transition-colors shadow-material"
        >
          <Sprout class="w-6 h-6 mx-auto" stroke-width="1.5" />
          Add Plant
        </button>
      </div>

      <!-- Plant Cards -->
      <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="plant in store.plants"
          :key="plant.id"
          class="bg-white rounded-2xl p-6 border border-surface-100 shadow-material hover:shadow-material-md transition-shadow duration-300 cursor-pointer"
          @click="router.push(`/plants/${plant.id}`)"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center"
              >
                <Leaf class="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <h3 class="font-heading font-bold text-text-primary">
                  {{ plant.name }}
                </h3>
                <p class="text-sm text-text-secondary">{{ plant.species }}</p>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 text-sm text-text-secondary mb-5">
            <Droplets class="w-4 h-4 text-blue-400" />
            <span>{{ plant.wateringFrequency || "Not set" }}</span>
          </div>

          <div class="flex gap-2">
            <button
              @click.stop="openEditForm(plant)"
              class="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium text-text-secondary hover:text-primary-600 bg-surface-50 hover:bg-primary-50 border border-surface-200 rounded-xl py-2 transition-colors"
            >
              <Pencil class="w-3.5 h-3.5" />
              Edit
            </button>
            <button
              @click.stop="deletePlant(plant.id)"
              class="flex items-center justify-center gap-1.5 text-sm font-medium text-text-secondary hover:text-red-600 bg-surface-50 hover:bg-red-50 border border-surface-200 rounded-xl py-2 px-4 transition-colors"
            >
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <!-- Add Plant Card -->
        <button
          @click="openAddForm"
          class="flex flex-col items-center justify-center gap-3 rounded-2xl p-6 border-2 border-dashed border-surface-300 hover:border-primary-400 hover:bg-primary-50/50 transition-colors cursor-pointer min-h-[180px]"
        >
          <Plus class="w-8 h-8 text-text-tertiary" />
          <span class="text-sm font-medium text-text-secondary">Add Plant</span>
        </button>
      </div>
    </main>

    <!-- Modals -->
    <AddPlantModal
      :show="showAddForm"
      @close="showAddForm = false"
      @submit="onAddPlant"
    />
    <EditPlantModal
      :show="showEditForm"
      :plant="editingPlant"
      @close="closeEditForm"
      @submit="onEditPlant"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Leaf, Plus, Pencil, Trash2, Droplets, Sprout } from "lucide-vue-next";
import { usePlantsStore } from "~/stores/plants";
import { useAuthStore } from "~/stores/auth";
import type { Plant } from "~/stores/plants";

const auth = useAuthStore();

const store = usePlantsStore();
const router = useRouter();

const showAddForm = ref(false);
const showEditForm = ref(false);
const editingPlant = ref<Plant | null>(null);

onMounted(() => {
  store.fetchPlants();
});

function openAddForm() {
  showAddForm.value = true;
}

function openEditForm(plant: Plant) {
  editingPlant.value = plant;
  showEditForm.value = true;
}

function closeEditForm() {
  showEditForm.value = false;
  editingPlant.value = null;
}

async function onAddPlant(data: {
  name: string;
  species: string;
  wateringFrequency: string;
}) {
  await store.addPlant(
    data.name,
    data.species,
    data.wateringFrequency,
    auth.user?.id,
  );
  showAddForm.value = false;
}

async function onEditPlant(data: {
  name: string;
  species: string;
  wateringFrequency: string;
}) {
  if (editingPlant.value) {
    await store.updatePlant(editingPlant.value.id, data);
  }
  closeEditForm();
}

async function deletePlant(id: string) {
  await store.removePlant(id);
}
</script>
