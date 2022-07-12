<template>
  <h1 class="text-2xl mb-5">Создать продукт</h1>
  <div class="w-2/5">
    <div class="flex flex-col mb-2">
      <label class="text-gray-600 mb-1" for="title">Название товара</label>
      <input type="text" v-model="title" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" required/>
    </div>

    <div class="flex flex-col mb-2">
      <label class="text-gray-600 mb-1" for="desc">Описание товара</label>
      <textarea id="desc" v-model="desc" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" required/>
    </div>

    <div class="flex flex-col mb-2">
      <label class="text-gray-600 mb-1" for="colors">Цвета</label>
      <select  id="colors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" required>
        <option disabled selected>Выберите цвета</option>
        <option value="blue">Blue</option>
        <option value="black">Black</option>
        <option value="white">White</option>
      </select>
    </div>

    <div class="flex flex-col mb-2">
      <label class="text-gray-600 mb-1" for="sku">Номер товара (SKU)</label>
      <input type="text" id="sku" v-model="sku" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 outline-none" required/>
    </div>

    <div class="flex flex-col mb-2">
      <label class="text-gray-600 mb-1" for="price">Цена товара (€)</label>
      <input type="number" min="1" v-model="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 outline-none" required/>
    </div>
    <div class="mt-5 mb-5 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
      <div class="space-y-1 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="flex text-sm text-gray-600">
          <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            <span>Upload a file</span>
            <input id="file-upload" name="file-upload" type="file" class="sr-only">
          </label>
          <p class="pl-1">or drag and drop</p>
        </div>
        <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
      </div>
    </div>
  <button @click="createProduct" class="px-8 py-2 mt-2 bg-green-700 rounded-md text-white">Создать товар</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Create",
  data() {
    return {
      title: "",
      desc: "",
      price: null,
      sku: "",
      tags: [],
      colors: [{name: "fff", hex: "fff"}]
    }
  },
  methods: {
    async createProduct() {
      const res = await axios.post('/api/product/create/', {title: this.title, description: this.desc, price: this.price, pictures: ['fff'], colors: this.colors, sku: this.sku})
      await this.$router.push('/products')
      console.log(res)
    }
  }
}
</script>

<style scoped>

</style>