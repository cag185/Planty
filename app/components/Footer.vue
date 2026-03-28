<template>
  <footer class="bg-white border-t border-surface-200 pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
        <!-- Brand Column -->
        <div class="col-span-2 lg:col-span-2">
          <div class="flex items-center gap-2 mb-6">
            <div class="bg-primary-50 p-2 rounded-lg text-primary-600">
              <Leaf class="w-5 h-5" />
            </div>
            <span
              class="font-heading font-bold text-xl text-text-primary tracking-tight"
            >
              <span class="text-primary-600">Planty</span>
            </span>
          </div>
          <p class="text-text-secondary mb-6 max-w-sm">
            Making plant care effortless through intelligent automation and
            beautiful design.
          </p>
          <div class="flex gap-4">
            <a
              href="#"
              class="text-text-tertiary hover:text-primary-600 transition-colors"
            >
              <Twitter class="w-5 h-5" />
            </a>
            <a
              href="#"
              class="text-text-tertiary hover:text-primary-600 transition-colors"
            >
              <Instagram class="w-5 h-5" />
            </a>
            <a
              href="#"
              class="text-text-tertiary hover:text-primary-600 transition-colors"
            >
              <Github class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Product -->
        <div>
          <h4 class="font-heading font-bold text-text-primary mb-4">Product</h4>
          <ul class="space-y-3">
            <li>
              <a
                href="#"
                class="text-text-secondary hover:text-primary-600 transition-colors"
                >Features</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-text-secondary hover:text-primary-600 transition-colors"
                >How it Works</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-text-secondary hover:text-primary-600 transition-colors"
                >Pricing</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-text-secondary hover:text-primary-600 transition-colors"
                >FAQ</a
              >
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h4 class="font-heading font-bold text-text-primary mb-4">Company</h4>
          <ul class="space-y-3">
            <li>
              <a
                href="#"
                class="text-text-secondary hover:text-primary-600 transition-colors"
                >About Us</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-text-secondary hover:text-primary-600 transition-colors"
                >Careers</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-text-secondary hover:text-primary-600 transition-colors"
                >Blog</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-text-secondary hover:text-primary-600 transition-colors"
                >Contact</a
              >
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="font-heading font-bold text-text-primary mb-4">Legal</h4>
          <ul class="space-y-3">
            <li>
              <a
                href="#"
                class="text-text-secondary hover:text-primary-600 transition-colors"
                >Privacy Policy</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-text-secondary hover:text-primary-600 transition-colors"
                >Terms of Service</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-text-secondary hover:text-primary-600 transition-colors"
                >Return Policy</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div
        class="pt-8 border-t border-surface-200 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <p class="text-text-tertiary text-sm">
          &copy; {{ currentYear }} Planty Inc. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Leaf, Twitter, Instagram, Github } from "lucide-vue-next";

const currentYear = new Date().getFullYear();
</script>
