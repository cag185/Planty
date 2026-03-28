<template>
  <div class="min-h-screen bg-white">
    <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <!-- Back link -->
      <NuxtLink
        to="/plants"
        class="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-primary-600 transition-colors mb-8"
      >
        <ArrowLeft class="w-4 h-4" />
        Back to My Plants
      </NuxtLink>

      <!-- Not found -->
      <div
        v-if="!plant"
        class="text-center py-20 bg-surface-50 rounded-2xl border border-surface-200"
      >
        <Leaf class="w-12 h-12 text-primary-300 mx-auto mb-4" />
        <h2 class="text-xl font-heading font-bold text-text-primary mb-2">
          Plant not found
        </h2>
        <p class="text-text-secondary mb-6">
          This plant doesn't exist or has been removed.
        </p>
        <NuxtLink
          to="/plants"
          class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full text-sm font-medium transition-colors shadow-material"
        >
          View My Plants
        </NuxtLink>
      </div>

      <!-- Plant Detail -->
      <template v-else>
        <!-- Header -->
        <div class="flex items-start justify-between mb-10">
          <div class="flex items-center gap-4">
            <div
              class="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center"
            >
              <Leaf class="w-8 h-8 text-primary-500" />
            </div>
            <div>
              <h1 class="text-3xl font-heading font-bold text-text-primary">
                {{ plant.name }}
              </h1>
              <p class="text-text-secondary">{{ plant.species }}</p>
            </div>
          </div>
          <button
            @click="handleRemove"
            class="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-red-600 bg-surface-50 hover:bg-red-50 border border-surface-200 rounded-xl py-2 px-4 transition-colors"
          >
            <Trash2 class="w-4 h-4" />
            Remove
          </button>
        </div>

        <!-- Info Cards -->
        <div class="grid sm:grid-cols-2 gap-4 mb-8">
          <div class="bg-surface-50 rounded-2xl p-5 border border-surface-100">
            <div class="flex items-center gap-2 mb-1">
              <Droplets class="w-4 h-4 text-blue-400" />
              <span class="text-sm font-medium text-text-secondary"
                >Watering Frequency</span
              >
            </div>
            <p class="text-lg font-heading font-bold text-text-primary">
              {{ plant.wateringFrequency || "Not set" }}
            </p>
          </div>

          <div class="bg-surface-50 rounded-2xl p-5 border border-surface-100">
            <div class="flex items-center gap-2 mb-1">
              <Calendar class="w-4 h-4 text-primary-400" />
              <span class="text-sm font-medium text-text-secondary"
                >Tracking Since</span
              >
            </div>
            <p class="text-lg font-heading font-bold text-text-primary">
              {{ formattedDate }}
            </p>
            <p class="text-xs text-text-tertiary mt-0.5">{{ plantAge }}</p>
          </div>

          <div class="bg-surface-50 rounded-2xl p-5 border border-surface-100">
            <div class="flex items-center gap-2 mb-1">
              <Droplets class="w-4 h-4 text-blue-400" />
              <span class="text-sm font-medium text-text-secondary"
                >Last Watered</span
              >
            </div>
            <p class="text-lg font-heading font-bold text-text-primary">
              {{ plant.stats?.lastWatered || "No data" }}
            </p>
          </div>

          <div class="bg-surface-50 rounded-2xl p-5 border border-surface-100">
            <div class="flex items-center gap-2 mb-1">
              <Activity class="w-4 h-4 text-primary-400" />
              <span class="text-sm font-medium text-text-secondary"
                >Health Score</span
              >
            </div>
            <p class="text-lg font-heading font-bold text-text-primary">
              {{
                plant.stats?.healthScore != null
                  ? `${plant.stats.healthScore}%`
                  : "No data"
              }}
            </p>
          </div>
        </div>

        <!-- Stats Section -->
        <h2 class="text-lg font-heading font-bold text-text-primary mb-4">
          Environment Stats
        </h2>
        <div class="grid sm:grid-cols-2 gap-4 mb-8">
          <div class="bg-surface-50 rounded-2xl p-5 border border-surface-100">
            <div class="flex items-center gap-2 mb-1">
              <Thermometer class="w-4 h-4 text-amber-500" />
              <span class="text-sm font-medium text-text-secondary"
                >Temperature</span
              >
            </div>
            <p class="text-lg font-heading font-bold text-text-primary">
              {{
                plant.stats?.temperature != null
                  ? `${plant.stats.temperature}°F`
                  : "No data"
              }}
            </p>
          </div>

          <div class="bg-surface-50 rounded-2xl p-5 border border-surface-100">
            <div class="flex items-center gap-2 mb-1">
              <Droplets class="w-4 h-4 text-blue-400" />
              <span class="text-sm font-medium text-text-secondary"
                >Humidity</span
              >
            </div>
            <p class="text-lg font-heading font-bold text-text-primary">
              {{
                plant.stats?.humidity != null
                  ? `${plant.stats.humidity}%`
                  : "No data"
              }}
            </p>
          </div>

          <div class="bg-surface-50 rounded-2xl p-5 border border-surface-100">
            <div class="flex items-center gap-2 mb-1">
              <Droplets class="w-4 h-4 text-teal-400" />
              <span class="text-sm font-medium text-text-secondary"
                >Soil Moisture</span
              >
            </div>
            <p class="text-lg font-heading font-bold text-text-primary">
              {{
                plant.stats?.soilMoisture != null
                  ? `${plant.stats.soilMoisture}%`
                  : "No data"
              }}
            </p>
          </div>

          <div class="bg-surface-50 rounded-2xl p-5 border border-surface-100">
            <div class="flex items-center gap-2 mb-1">
              <Sun class="w-4 h-4 text-amber-400" />
              <span class="text-sm font-medium text-text-secondary"
                >Light Level</span
              >
            </div>
            <p class="text-lg font-heading font-bold text-text-primary">
              {{
                plant.stats?.lightLevel != null
                  ? `${plant.stats.lightLevel}%`
                  : "No data"
              }}
            </p>
          </div>
        </div>

        <!-- Notifications -->
        <h2 class="text-lg font-heading font-bold text-text-primary mb-4">
          Notifications
        </h2>
        <div
          class="bg-surface-50 rounded-2xl p-5 border border-surface-100 flex items-center justify-between"
        >
          <div class="flex items-center gap-3">
            <Bell class="w-5 h-5 text-primary-500" />
            <div>
              <p class="text-sm font-medium text-text-primary">
                Push Notifications
              </p>
              <p class="text-xs text-text-secondary">
                Get alerts when this plant needs attention
              </p>
            </div>
          </div>
          <button
            @click="store.toggleNotifications(plant.id)"
            class="relative w-11 h-6 rounded-full transition-colors duration-200"
            :class="
              plant.notificationsEnabled ? 'bg-primary-500' : 'bg-surface-300'
            "
          >
            <span
              class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200"
              :class="
                plant.notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
              "
            ></span>
          </button>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  Leaf,
  ArrowLeft,
  Trash2,
  Droplets,
  Calendar,
  Thermometer,
  Sun,
  Activity,
  Bell,
} from "lucide-vue-next";
import { usePlantsStore } from "~/stores/plants";

const route = useRoute();
const router = useRouter();
const store = usePlantsStore();

const plant = computed(() => store.getPlantById(route.params.id as string));

const formattedDate = computed(() => {
  if (!plant.value) return "";
  const date = new Date(plant.value.addedAt);
  return isNaN(date.getTime())
    ? plant.value.addedAt
    : date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
});

const plantAge = computed(() => {
  if (!plant.value) return "";
  const added = new Date(plant.value.addedAt);
  if (isNaN(added.getTime())) return "";
  const now = new Date();
  const diffMs = now.getTime() - added.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days === 0) return "Added today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months === 1) return "1 month ago";
  return `${months} months ago`;
});

function handleRemove() {
  if (plant.value) {
    store.removePlant(plant.value.id);
    router.push("/plants");
  }
}
</script>
