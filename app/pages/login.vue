<template>
  <div class="min-h-screen bg-white px-4 pt-32 pb-16">
    <div class="w-full max-w-md mx-auto">
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

        <!-- Server error -->
        <div
          v-if="serverError"
          class="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-4 border border-red-100"
        >
          {{ serverError }}
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
              placeholder="e.g. Alex"
              @blur="validateField('firstName')"
              @input="clearFieldError('firstName')"
              class="w-full px-4 py-2.5 rounded-xl border bg-surface-50 text-text-primary border-black placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:border-transparent transition"
              :class="
                fieldErrors.firstName
                  ? 'border-red-400 focus:ring-red-400'
                  : 'border-surface-200 focus:ring-primary-500'
              "
            />
            <p v-if="fieldErrors.firstName" class="text-red-500 text-xs mt-1.5">
              {{ fieldErrors.firstName }}
            </p>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-text-primary mb-1.5">
              Email
            </label>
            <input
              v-model="email"
              type="text"
              placeholder="you@example.com"
              @blur="validateField('email')"
              @input="clearFieldError('email')"
              class="w-full px-4 py-2.5 rounded-xl border bg-surface-50 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:border-transparent transition"
              :class="
                fieldErrors.email
                  ? 'border-red-400 focus:ring-red-400'
                  : 'border-surface-200 focus:ring-primary-500'
              "
            />
            <p v-if="fieldErrors.email" class="text-red-500 text-xs mt-1.5">
              {{ fieldErrors.email }}
            </p>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-text-primary mb-1.5">
              Password
            </label>
            <input
              v-model="password"
              type="password"
              placeholder="At least 6 characters"
              @blur="validateField('password')"
              @input="clearFieldError('password')"
              class="w-full px-4 py-2.5 rounded-xl border bg-surface-50 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:border-transparent transition"
              :class="
                fieldErrors.password
                  ? 'border-red-400 focus:ring-red-400'
                  : 'border-surface-200 focus:ring-primary-500'
              "
            />
            <p v-if="fieldErrors.password" class="text-red-500 text-xs mt-1.5">
              {{ fieldErrors.password }}
            </p>
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
import { z } from "zod";
import { Leaf } from "lucide-vue-next";
import { useAuthStore } from "~/stores/auth";
import { validateEmail, validateCommonEmailProvider } from "~/utils/email";

const router = useRouter();
const auth = useAuthStore();
const notificationStore = useNotificationsStore();

const isSignup = ref(false);
const firstName = ref("");
const email = ref("");
const password = ref("");
const serverError = ref("");

// --- Zod schemas ---
const emailField = z
  .string()
  .min(1, "Email is required")
  .refine(validateEmail, "Email address is not valid")
  .refine(
    validateCommonEmailProvider,
    "Email must be from a common provider (e.g. Gmail, Yahoo, Outlook)",
  );

const passwordField = z
  .string()
  .min(1, "Password is required")
  .min(6, "Password must be at least 6 characters");

const loginSchema = z.object({
  email: emailField,
  password: passwordField,
});

const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: emailField,
  password: passwordField,
});

// --- Per-field error state ---
const fieldErrors = ref<Record<string, string>>({});

const clearFieldError = (field: string) => {
  fieldErrors.value = Object.fromEntries(
    Object.entries(fieldErrors.value).filter(([k]) => k !== field),
  );
};

const validateField = (field: string) => {
  const schema =
    field === "firstName"
      ? z.object({ firstName: signupSchema.shape.firstName })
      : field === "email"
        ? z.object({ email: emailField })
        : z.object({ password: passwordField });

  const value =
    field === "firstName"
      ? { firstName: firstName.value }
      : field === "email"
        ? { email: email.value }
        : { password: password.value };

  const result = schema.safeParse(value);
  if (!result.success) {
    const errs = result.error.flatten().fieldErrors;
    fieldErrors.value[field] = errs[field as keyof typeof errs]?.[0] ?? "";
  } else {
    delete fieldErrors.value[field];
  }
};

// ---

function toggleMode() {
  isSignup.value = !isSignup.value;
  serverError.value = "";
  Object.keys(fieldErrors.value).forEach((k) => delete fieldErrors.value[k]);
}

async function handleSubmit() {
  serverError.value = "";

  if (isSignup.value) {
    const result = signupSchema.safeParse({
      firstName: firstName.value,
      email: email.value,
      password: password.value,
    });

    if (!result.success) {
      const errs = result.error.flatten().fieldErrors;
      Object.keys(fieldErrors.value).forEach(
        (k) => delete fieldErrors.value[k],
      );
      if (errs.firstName?.[0]) fieldErrors.value.firstName = errs.firstName[0];
      if (errs.email?.[0]) fieldErrors.value.email = errs.email[0];
      if (errs.password?.[0]) fieldErrors.value.password = errs.password[0];
      return;
    }

    try {
      const success = await auth.signup(
        firstName.value,
        email.value,
        password.value,
      );
      if (success) {
        await notificationStore.getNotifications();
        router.push("/plants");
      }
    } catch (error: any) {
      serverError.value = error?.message ?? "Sign up failed. Please try again.";
    }
  } else {
    const result = loginSchema.safeParse({
      email: email.value,
      password: password.value,
    });

    if (!result.success) {
      const errs = result.error.flatten().fieldErrors;
      Object.keys(fieldErrors.value).forEach(
        (k) => delete fieldErrors.value[k],
      );
      if (errs.email?.[0]) fieldErrors.value.email = errs.email[0];
      if (errs.password?.[0]) fieldErrors.value.password = errs.password[0];
      return;
    }

    const success = await auth.login(email.value, password.value);
    if (success) {
      router.push("/plants");
    } else {
      serverError.value = "Invalid email or password.";
    }
  }
}
</script>
