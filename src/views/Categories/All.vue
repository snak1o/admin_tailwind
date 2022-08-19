<template>
  <div class="flex h-full flex-col">
    <div class="flex justify-between">
      <h1 class="text-3xl mb-5">Категории</h1>
      <router-link class="text-green-700 text-md" to="/categories/create">+ Добавить новую</router-link>
    </div>
    <div class="flex flex-col items-center h-full justify-center" v-if="categories.length < 1">
      <span class="text-xl">Нет категорий для показа</span>
      <button class="px-8 py-2 mt-7 bg-green-700 rounded-md text-white" @click="$router.push('/categories/create')">Добавить</button>
    </div>
    <div class="grid grid-cols-4 gap-5" v-else>
      <div class="h-28 flex flex-col justify-between border rounded-md border-gray-200 p-2 relative" v-for="item in categories" :key="item.id">
        <span class="text-xl">{{item.name}}</span>
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 pr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
          <span>{{item.id}}</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute top-4 right-4 cursor-pointer" viewBox="0 0 20 20" fill="currentColor" @click="$router.push('/categories/edit/' + item.id)">
          <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Categories",
  data() {
    return {
      categories: []
    }
  },
  async mounted() {
    const res = await axios.get('/api/v1/categories/')
    if (res.data !== null) {
      this.categories = res.data
    }
  }
}
</script>

<style scoped>

</style>