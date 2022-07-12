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