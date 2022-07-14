<template>
  <h1 class="text-2xl mb-5">Редактировать продукт {{product.id}}</h1>
  <div class="w-2/5">
    <div class="flex flex-col mb-2">
      <label class="text-gray-600 mb-1" for="title">Название товара</label>
      <input type="text" v-model="product.name" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" required/>
    </div>

    <div class="flex flex-col mb-2">
      <label class="text-gray-600 mb-1" for="desc">Описание товара</label>
      <textarea id="desc" v-model="product.description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" required/>
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
      <label class="text-gray-600 mb-1" for="tags">Теги товара</label>
      <input id="tags" v-model="currentTag" @keydown.enter="addTag" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" required/>
      <ul v-if="product.tags.length > 0" class="flex mt-2">
        <li v-for="(tag, index) in product.tags" :key="tag" class="mr-2 bg-blue-500 rounded px-5 text-white relative group">
          {{tag.name}}
          <svg @click="product.tags.splice(index, 1)" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 absolute right-0.5 top-1.5 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </li>
      </ul>
    </div>

    <div class="flex flex-col mb-2">
      <label class="text-gray-600 mb-1" for="sku">Номер товара (SKU)</label>
      <input type="text" id="sku" v-model="product.sku" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 outline-none" required/>
    </div>

    <div class="flex flex-col mb-2">
      <label class="text-gray-600 mb-1" for="price">Цена товара (€), включая ндс {{(this.product.price * 0.24 + this.product.price).toFixed(2)}}</label>
      <input type="number" min="1" v-model="product.price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 outline-none" required/>
    </div>
    <div class="mt-5 mb-5 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
      <div class="space-y-1 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="flex text-sm text-gray-600">
          <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            <span>Загрузите файл</span>
            <input id="file-upload" name="file-upload" type="file" class="sr-only">
          </label>
          <p class="pl-1">или перенесите</p>
        </div>
        <p class="text-xs text-gray-500">PNG, JPG, WEBP до 10MB</p>
      </div>
    </div>
    <button @click="updateProduct()" class="px-8 py-2 mt-2 bg-green-700 rounded-md text-white">Создать товар</button>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "_product",
  data() {
    return {
      currentTag: "",
      product: {
        "id": 1,
        "name": "новая лодочка",
        "description": "описание для новой лодочки",
        "categoryId": 1,
        "tags": [
          {
            "name": "tag1"
          },
          {
            "name": "tag2"
          }
        ],
        "colors": [
          {
            "id": 1,
            "name": "green",
            "hex": "#2342",
            "price": 756
          },
          {
            "id": 3,
            "name": "blud",
            "hex": "#2233",
            "price": 756
          }
        ],
        "price": 32.25,
        "sku": "F23"
      }
    }
  },
  async mounted() {
    // const res = await axios.get('/api/product/byId/' + this.$route.params.id)
    // this.product = res.data
  },
  methods: {
    addTag(){
      if (this.currentTag.trim() !== '') {
        this.product.tags.push({"name": this.currentTag})
        this.currentTag = ""
      }

    }
  }
}
</script>

<style scoped>


</style>