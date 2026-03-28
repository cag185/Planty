<template>
  <section id="features" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2
          class="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4"
        >
          Everything your plants need. <br />
          <span class="text-text-secondary font-medium"
            >Nothing they don't.</span
          >
        </h2>
        <p class="text-lg text-text-secondary">
          <span class="text-primary-600 font-medium">Planty</span> uses a
          combination of advanced sensors and machine learning to create the
          perfect micro-environment for every species.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="bg-surface-50 rounded-2xl p-8 border border-surface-100 hover:shadow-material-md transition-shadow duration-300"
        >
          <div
            class="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
            :class="feature.bgColor"
          >
            <component
              :is="feature.icon"
              class="w-7 h-7"
              :class="feature.color"
            />
          </div>
          <h3 class="text-xl font-heading font-bold text-text-primary mb-3">
            {{ feature.title }}
          </h3>
          <p class="text-text-secondary leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Droplets, Sun, Bell, Smartphone } from "lucide-vue-next";

const features = [
  {
    title: "Smart Watering",
    description:
      "Precision hydration based on soil moisture, plant type, and ambient humidity. Never overwater again.",
    icon: Droplets,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Light Monitoring",
    description:
      "Tracks daily light integrals (DLI) to ensure your plant gets exactly the right amount of sunshine.",
    icon: Sun,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    title: "Plant Notifications",
    description:
      "Get push notifications and inbox alerts when your plants need water, light, or attention, so you never miss a thing.",
    icon: Bell,
    color: "text-primary-500",
    bgColor: "bg-primary-50",
  },
  {
    title: "Remote Control",
    description:
      "Monitor and adjust settings from anywhere in the world using our beautifully designed mobile app.",
    icon: Smartphone,
    color: "text-teal-500",
    bgColor: "bg-teal-50",
  },
];
</script>
