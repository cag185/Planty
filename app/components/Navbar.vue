<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-surface-200"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 cursor-pointer">
          <div class="bg-primary-50 p-2 rounded-lg text-primary-600">
            <Leaf class="w-5 h-5" />
          </div>
          <span
            class="font-heading font-bold text-xl text-text-primary tracking-tight"
          >
            <span class="text-primary-600">Planty</span>
          </span>
        </NuxtLink>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-8">
          <div class="flex gap-6">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.name"
              :to="link.to"
              class="text-sm font-medium text-text-secondary hover:text-primary-600 transition-colors"
            >
              {{ link.name }}
            </NuxtLink>
          </div>
          <button
            class="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-material hover:shadow-material-md"
            @click="router.push('/plants')"
          >
            Get Started
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
          <button
            @click="isOpen = !isOpen"
            class="text-text-secondary hover:text-text-primary p-2"
          >
            <X v-if="isOpen" class="w-6 h-6" />
            <Menu v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Nav -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out overflow-hidden"
      leave-active-class="transition-all duration-200 ease-in overflow-hidden"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-96"
      leave-from-class="opacity-100 max-h-96"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-if="isOpen" class="md:hidden bg-white border-b border-surface-200">
        <div class="px-4 pt-2 pb-6 space-y-4 shadow-material-lg">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.to"
            class="block text-base font-medium text-text-secondary hover:text-primary-600 py-2"
            @click="isOpen = false"
          >
            {{ link.name }}
          </NuxtLink>
          <button
            class="w-full bg-primary-600 hover:bg-primary-700 text-white px-5 py-3 rounded-xl text-sm font-medium transition-colors shadow-material mt-4"
            @click="
              router.push('/plants');
              isOpen = false;
            "
          >
            Get Started
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Leaf, Menu, X } from "lucide-vue-next";

const router = useRouter();
const isOpen = ref(false);

const navLinks = [
  { name: "Features", to: "/#features" },
  { name: "Testimonials", to: "/#testimonials" },
  { name: "My Plants", to: "/plants" },
];
</script>
