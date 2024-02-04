<template>
  <div class="shadow-lg shadow-slate-200 transition-all dark:shadow-stone-800">
    <div class="mx-auto flex h-20 max-w-[80rem] items-center px-12">
      <h1 class="flex items-center gap-2 text-sm font-semibold">
        <img src="~~/assets/images/logo.png" class="w-10" alt="" />
        <span>Nuxt3 Starter</span>
      </h1>
      <button
        type="button"
        class="ml-auto rounded-lg border border-gray-300 bg-white p-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        @click="switchThemeMode"
      >
        <IconsSun class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { switchThemeMode } = useThemeMode()
</script>

<style></style>
