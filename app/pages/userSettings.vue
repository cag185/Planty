<template>
  <div class="min-h-screen bg-white">
    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <div class="w-3/4 mx-auto">
        <h1 class="text-3xl font-bold text-text-primary">User Settings</h1>
        <p class="text-text-secondary mt-2">
          Manage preferences and account settings
        </p>
      </div>
      <!-- Main display div -->
      <div
        class="text-start mx-auto flex flex-col text-black mt-10 bg-slate-50 w-3/4 rounded-2xl border border-surface-200 shadow-material"
      >
        <!-- Information Display -->
        <div
          class="rounded-lg w-1/2 pl-4 mx-4 my-8 flex space-y-2 flex-col text-start flex-grow-1"
        >
          <div class="text-start font-bold text-2xl">User Information</div>
          <div class="pl-4">
            <div>
              Name:
              <span :class="userInfoClasses">{{ user?.name }}</span>
            </div>
            <div>
              Email:
              <span :class="userInfoClasses">{{ user?.email }}</span>
            </div>
            <div v-if="dateCreated">
              Account Creation Date:
              <span :class="userInfoClasses">{{
                shortenDate(dateCreated)
              }}</span>
            </div>
          </div>
        </div>
        <!-- Actions -->
        <div
          class="rounded-lg pl-4 mx-4 my-8 flex space-y-4 flex-col text-start flex-grow-1"
        >
          <div class="text-start font-bold text-2xl">Settings</div>
          <div
            class="flex flex-row pl-4 text-center space-x-4 w-fit self-start"
          >
            <div>Toggle Email Notifications</div>
            <div>
              <button
                @click="toggleEmailNotifications"
                class="relative w-11 h-6 rounded-full transition-colors duration-200"
                :class="
                  formState.emailNotificationsEnabled
                    ? 'bg-primary-500'
                    : 'bg-red-200'
                "
              >
                <span
                  class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200"
                  :class="
                    formState.emailNotificationsEnabled
                      ? 'translate-x-5'
                      : 'translate-x-0'
                  "
                ></span>
              </button>
            </div>
          </div>
          <div
            class="pl-4 pt-8 lg:pt-16 justify-center flex items-end space-x-32"
          >
            <button
              class="bg-primary-500 hover:bg-primary-700 rounded-full px-6 py-3 w-1/4 text-sm text-white font-medium transition-colors shadow-material"
              @click="saveChanges"
              :disabled="!canSaveChanges"
            >
              Save Changes
            </button>
            <button
              class="bg-red-500 hover:bg-red-700 rounded-full px-6 py-3 w-1/4 text-sm text-white font-medium transition-colors shadow-material"
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
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const dateCreated = computed(() => user.value?.dateCreated);
const userInfoClasses = "pl-2 font-semibold text-primary-700";

const shortenDate = (date: Date) => {
  return date.toLocaleString(undefined, {
    dateStyle: "short",
  });
};

// As we develop more user settings, add them to the form and update from there.
// Seeded from the auth store so the toggle reflects the current saved state on load.
const formState = ref({
  emailNotificationsEnabled: user.value?.emailNotificationsEnabled || false,
  name: user.value?.name,
  email: user.value?.email,
});

const canSaveChanges = computed(() => {
  return (
    formState.value.emailNotificationsEnabled !==
    (user.value?.emailNotificationsEnabled ?? false)
  );
});

const toggleEmailNotifications = () => {
  formState.value.emailNotificationsEnabled =
    !formState.value.emailNotificationsEnabled;
};

const saveChanges = async () => {
  if (!canSaveChanges.value) return;
  try {
    await authStore.updateSettings(formState.value.emailNotificationsEnabled);
  } catch (error) {
    console.error("Error saving changes:", error);
  }
};
onMounted(() => {
  console.log(user.value);
});

watch(
  user,
  () => {
    // When the user data is loaded, we need to reseed the form state to reflect the current settings.
    formState.value.emailNotificationsEnabled =
      user.value?.emailNotificationsEnabled || false;
  },
  { immediate: true },
);
</script>
