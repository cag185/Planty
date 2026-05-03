<template>
  <div class="min-h-screen bg-white">
    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <h1 class="text-3xl font-bold text-text-primary">User Settings</h1>
      <p class="text-text-secondary mt-2">
        Manage preferences and account settings
      </p>
      <!-- Main display div -->
      <div
        class="text-center flex flex-row text-black min-h-[60vh] mt-10 bg-white rounded-2xl border border-surface-200 shadow-material"
      >
        <!-- Information Display -->
        <div
          class="rounded-lg w-1/2 mx-4 my-4 flex space-y-2 flex-col text-start flex-grow-1"
        >
          <div class="text-center font-bold text-2xl">User Information</div>
          <div>Name:</div>
          <div>Email:</div>
          <div>Account Creation Date:</div>
        </div>
        <!-- Actions -->
        <div
          class="rounded-lg w-1/2 mx-4 my-4 flex space-y-4 flex-col text-center flex-grow-1"
        >
          <div class="text-center font-bold text-2xl">Settings</div>
          <div class="flex flex-row text-center space-x-4 w-fit self-center">
            <div>Toggle Email Notifications</div>
            <div>
              <button
                @click="useEmailAddress = !useEmailAddress"
                class="relative w-11 h-6 rounded-full transition-colors duration-200"
                :class="useEmailAddress ? 'bg-primary-500' : 'bg-red-200'"
              >
                <span
                  class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200"
                  :class="useEmailAddress ? 'translate-x-5' : 'translate-x-0'"
                ></span>
              </button>
            </div>
          </div>
          <div>
            <button
              class="bg-red-500 hover:bg-red-700 rounded-full px-6 py-3 w-1/3 text-sm text-white font-medium transition-colors shadow-material"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const useEmailAddress = ref(false);
</script>
