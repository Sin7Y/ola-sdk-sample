<template>
  <div class="h-[calc(100vh-5rem)] max-w-[80rem] flex items-center space-x-12 mx-auto px-12">
    <div class="w-1/2 flex flex-col gap-12">
      <h1 class="text-5xl font-bold">{{ title }}</h1>
      <p class="text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, dolore eveniet, iste voluptatibus vitae sunt
        placeat totam perferendis, aliquid repellat facilis obcaecati iure temporibus sed. Delectus, et impedit.
        Dolorum, eius!
      </p>
    </div>

    <img src="~~/assets/images/logo.png" class="w-1/2 drop-shadow-2xl" alt="" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>
