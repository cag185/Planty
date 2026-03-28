<template>
  <div class="min-h-screen bg-white flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="flex items-center justify-center gap-2 mb-8">
        <div class="bg-primary-50 p-2 rounded-lg text-primary-600">
          <Leaf class="w-6 h-6" />
        </div>
        <span class="font-heading font-bold text-2xl text-primary-600">
          Planty
        </span>
      </div>

      <!-- Card -->
      <div
        class="bg-white rounded-2xl shadow-material-lg border border-surface-100 p-8"
      >
        <h1 class="text-2xl font-heading font-bold text-text-primary mb-1">
          {{ isSignup ? "Create an account" : "Welcome back" }}
        </h1>
        <p class="text-text-secondary text-sm mb-6">
          {{
            isSignup
              ? "Sign up to start tracking your plants."
              : "Sign in to your Planty account."
          }}
        </p>

        <!-- Error -->
        <div
          v-if="error"
          class="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-4 border border-red-100"
        >
          {{ error }}
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- First Name (signup only) -->
          <div v-if="isSignup">
            <label class="block text-sm font-medium text-text-primary mb-1.5">
              First Name
            </label>
            <input
              v-model="firstName"
              type="text"
              required
              placeholder="e.g. Alex"
              class="w-full px-4 py-2.5 rounded-xl border border-surface-200 bg-surface-50 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-text-primary mb-1.5">
              Email
            </label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="you@example.com"
              class="w-full px-4 py-2.5 rounded-xl border border-surface-200 bg-surface-50 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-text-primary mb-1.5">
              Password
            </label>
            <input
              v-model="password"
              type="password"
              required
              minlength="6"
              placeholder="At least 6 characters"
              class="w-full px-4 py-2.5 rounded-xl border border-surface-200 bg-surface-50 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            class="w-full py-2.5 rounded-xl text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 shadow-material transition-colors"
          >
            {{ isSignup ? "Sign Up" : "Sign In" }}
          </button>
        </form>

        <p class="text-center text-sm text-text-secondary mt-6">
          {{ isSignup ? "Already have an account?" : "Don't have an account?" }}
          <button
            @click="toggleMode"
            class="text-primary-600 font-medium hover:underline ml-1"
          >
            {{ isSignup ? "Sign in" : "Sign up" }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Leaf } from "lucide-vue-next";
import { useAuthStore } from "~/stores/auth";

const router = useRouter();
const auth = useAuthStore();

const isSignup = ref(false);
const firstName = ref("");
const email = ref("");
const password = ref("");
const error = ref("");

function toggleMode() {
  isSignup.value = !isSignup.value;
  error.value = "";
}

function handleSubmit() {
  error.value = "";

  if (isSignup.value) {
    const success = auth.signup(firstName.value, email.value, password.value);
    if (success) {
      router.push("/plants");
    }
  } else {
    const success = auth.login(email.value, password.value);
    if (success) {
      router.push("/plants");
    } else {
      error.value = "No account found with that email. Please sign up first.";
    }
  }
}
</script>
