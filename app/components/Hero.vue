<template>
  <section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <!-- Text Content -->
        <div class="max-w-2xl">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6 border border-primary-100"
          >
            <span class="relative flex h-2 w-2">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-2 w-2 bg-primary-500"
              ></span>
            </span>
            Meet <span class="text-primary-600 font-semibold">Planty</span> 1.0
          </div>
          <div
            class="title text-6xl lg:text-7xl font-title font-bold text-primary-500 mb-4"
          >
            Planty.
          </div>
          <h1
            class="text-5xl lg:text-6xl font-heading font-bold text-text-primary mb-6"
          >
            Intelligent Plant Care,
            <span class="text-primary-600">Simplified.</span>
          </h1>
          <p class="text-lg text-text-secondary mb-8 leading-relaxed max-w-lg">
            The autonomous ecosystem that monitors, waters, and nurtures your
            plants. Enjoy thriving greenery without the guesswork.
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <NuxtLink
              to="/login"
              class="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3.5 rounded-full text-base font-medium transition-all shadow-material hover:shadow-material-md hover:-translate-y-0.5"
            >
              Get Started
              <ArrowRight class="w-4 h-4" />
            </NuxtLink>
            <button
              class="flex items-center justify-center gap-2 bg-white hover:bg-surface-50 text-text-primary border border-surface-200 px-8 py-3.5 rounded-full text-base font-medium transition-all shadow-sm hover:shadow-material"
            >
              Watch Demo
            </button>
          </div>
        </div>

        <!-- Illustration Area -->
        <div class="relative lg:h-[600px] flex items-center justify-center">
          <div
            class="absolute inset-0 bg-gradient-to-tr from-primary-50 to-surface-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"
          ></div>
          <div
            class="absolute inset-0 bg-white rounded-[3rem] shadow-material-lg border border-surface-100 overflow-hidden flex items-center justify-center"
          >
            <div
              class="relative w-full h-full p-8 flex flex-col items-center justify-center"
            >
              <!-- Center Hub (floating animation) -->
              <div
                class="w-48 h-48 bg-primary-50 rounded-full flex items-center justify-center relative z-20 shadow-material animate-float"
              >
                <div
                  class="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-sm"
                >
                  <Leaf class="w-12 h-12 text-primary-500" />
                </div>

                <div
                  class="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-xl shadow-material flex items-center justify-center text-blue-500 transform rotate-12"
                >
                  <Droplets class="w-6 h-6" />
                </div>
                <div
                  class="absolute top-1/2 -left-8 w-14 h-14 bg-white rounded-xl shadow-material flex items-center justify-center text-amber-500 transform -rotate-6"
                >
                  <Sun class="w-7 h-7" />
                </div>
                <div
                  class="absolute -bottom-6 right-8 w-12 h-12 bg-white rounded-xl shadow-material flex items-center justify-center text-teal-500 transform rotate-6"
                >
                  <Wifi class="w-6 h-6" />
                </div>
              </div>

              <!-- Decorative UI Elements -->
              <div
                class="absolute top-12 left-12 bg-white p-4 rounded-2xl shadow-material border border-surface-100"
              >
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 rounded-full bg-green-500"></div>
                  <div class="text-sm font-medium text-text-primary">
                    System Online
                  </div>
                </div>
                <div class="mt-2 text-xs text-text-secondary">
                  Moisture: 68%
                </div>
              </div>

              <div
                class="absolute bottom-12 right-12 bg-white p-4 rounded-2xl shadow-material border border-surface-100"
              >
                <div class="flex items-center gap-2 mb-2">
                  <Sun class="w-4 h-4 text-amber-500" />
                  <div class="text-sm font-medium text-text-primary">
                    Optimal Light
                  </div>
                </div>
                <div
                  class="w-24 h-1.5 bg-surface-100 rounded-full overflow-hidden"
                >
                  <div class="w-3/4 h-full bg-amber-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Leaf, Droplets, Sun, Wifi, ArrowRight } from "lucide-vue-next";
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-float {
  animation: float 4s ease-in-out infinite;
}
</style>
