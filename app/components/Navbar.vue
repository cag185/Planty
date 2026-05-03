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

          <!-- Notifications bell -->
          <NuxtLink
            to="/notifications"
            class="relative text-text-secondary hover:text-primary-600 transition-colors p-1"
          >
            <Bell class="w-5 h-5" />
            <span
              v-if="notifStore.unreadCount > 0"
              class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
            >
              {{ notifStore.unreadCount > 9 ? "9+" : notifStore.unreadCount }}
            </span>
          </NuxtLink>

          <!-- Logged in: avatar -->
          <div v-if="auth.isLoggedIn" class="relative">
            <button
              @click="showUserMenu = !showUserMenu"
              class="w-9 h-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-bold hover:bg-primary-200 transition-colors"
            >
              {{ auth.userInitial }}
            </button>
            <Transition
              enter-active-class="transition-all duration-150 ease-out"
              leave-active-class="transition-all duration-100 ease-in"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-if="showUserMenu"
                class="absolute right-0 top-12 bg-white rounded-xl shadow-material-lg border border-surface-100 py-2 w-48 z-50"
              >
                <div class="px-4 py-2 border-b border-surface-100">
                  <p class="text-sm font-medium text-text-primary">
                    {{ auth.user?.name }}
                  </p>
                  <p class="text-xs text-text-secondary truncate">
                    {{ auth.user?.email }}
                  </p>
                </div>
                <button
                  @click="handleLogout"
                  class="w-full text-left px-4 py-2 text-sm text-text-secondary hover:text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <LogOut class="w-4 h-4" />
                  Log out
                </button>
              </div>
            </Transition>
          </div>

          <!-- Not logged in: sign in button -->
          <NuxtLink
            v-else
            to="/login"
            class="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-material hover:shadow-material-md"
          >
            Sign In
          </NuxtLink>
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
          <NuxtLink
            to="/notifications"
            class="flex items-center gap-2 text-base font-medium text-text-secondary hover:text-primary-600 py-2"
            @click="isOpen = false"
          >
            Notifications
            <span
              v-if="notifStore.unreadCount > 0"
              class="w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
            >
              {{ notifStore.unreadCount > 9 ? "9+" : notifStore.unreadCount }}
            </span>
          </NuxtLink>
          <div v-if="auth.isLoggedIn" class="border-t border-surface-200 pt-4">
            <div class="flex items-center gap-3 mb-3">
              <div
                class="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-bold"
              >
                {{ auth.userInitial }}
              </div>
              <div>
                <p class="text-sm font-medium text-text-primary">
                  {{ auth.user?.name }}
                </p>
                <p class="text-xs text-text-secondary">
                  {{ auth.user?.email }}
                </p>
              </div>
            </div>
            <button
              @click="handleLogout"
              class="w-full text-left text-sm text-text-secondary hover:text-red-600 py-2 flex items-center gap-2"
            >
              <LogOut class="w-4 h-4" />
              Log out
            </button>
          </div>
          <NuxtLink
            v-else
            to="/login"
            class="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white px-5 py-3 rounded-xl text-sm font-medium transition-colors shadow-material mt-4"
            @click="isOpen = false"
          >
            Sign In
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Leaf, Menu, X, LogOut, Bell } from "lucide-vue-next";
import { useAuthStore } from "~/stores/auth";
import { useNotificationsStore } from "~/stores/notifications";

const router = useRouter();
const auth = useAuthStore();
const plantStore = usePlantsStore();
const notificationStore = useNotificationsStore();
const notifStore = useNotificationsStore();
const isOpen = ref(false);
const showUserMenu = ref(false);

const navLinks = [
  { name: "Features", to: "/#features" },
  { name: "My Plants", to: "/plants" },
  { name: "Profile", to: "/userSettings" },
];

function handleLogout() {
  auth.logout();
  showUserMenu.value = false;
  isOpen.value = false;
  plantStore.clearPlants();
  notificationStore.clearNotifications();
  router.push("/");
}

function closeUserMenu(e: MouseEvent) {
  if (!(e.target as HTMLElement).closest(".relative")) {
    showUserMenu.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", closeUserMenu);
  auth.restoreSession();
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeUserMenu);
});
</script>
