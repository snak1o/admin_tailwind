<template>
  <div class="flex h-full flex-col">
  <h1 class="text-3xl">Категории</h1>
  <div class="flex flex-col items-center h-full justify-center">
    <span class="text-xl">Нет категорий для показа</span>
    <button class="px-8 py-2 mt-7 bg-green-700 rounded-md text-white" @click="$router.push('/categories/create')">Добавить</button>
  </div>
  </div>
</template>

<script>
export default {
  name: "Categories"
}
</script>

<style scoped>

</style>