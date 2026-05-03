<template>
  <section class="py-24 bg-white">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="bg-primary-50 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden"
      >
        <!-- Decorative background circles -->
        <div
          class="absolute top-0 left-0 w-64 h-64 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"
        ></div>

        <div class="relative z-10">
          <h2
            class="text-3xl md:text-5xl font-heading font-bold text-text-primary mb-6"
          >
            Ready to grow together?
          </h2>
          <p class="text-lg text-text-secondary mb-10 max-w-2xl mx-auto">
            Join our growing community of happy plant owners who have automated
            their indoor gardens
          </p>
          <button
            @click="signUp()"
            class="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all shadow-material hover:shadow-material-md hover:-translate-y-0.5"
          >
            Sign Up With Planty Now
            <ArrowRight class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from "lucide-vue-next";
const router = useRouter();

const signUp = () => {
  router.push("/login");
};
</script>
