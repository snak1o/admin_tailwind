<template>
  <div class="flex justify-between items-center">
    <h1 class="text-3xl">Продукты</h1>
    <router-link to="/products/create" class="text-green-700 text-md">+ Добавить новый</router-link>
  </div>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3 w-10">
          <input type="checkbox"/>
        </th>
        <th scope="col" class="px-6 py-3">
          ID
        </th>
        <th scope="col" class="px-6 py-3">
          Фотография
        </th>
        <th scope="col" class="px-6 py-3">
          Название
        </th>
        <th scope="col" class="px-6 py-3">
          Категория
        </th>
        <th scope="col" class="px-6 py-3">
          Цена
        </th>
        <th scope="col" class="px-6 py-3">
          SKU
        </th>
        <th scope="col" class="px-6 py-3">
          Обновлено
        </th>
        <th scope="col" class="px-6 py-3">
          Теги
        </th>
        <th scope="col" class="px-6 py-3">
          <span class="sr-only">Edit</span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="bg-white border-b" v-for="product in products.slice().reverse()" :key="product._id">
        <td class="px-6 py-4">
          <input type="checkbox"/>
        </td>
        <td class="px-6 py-4">
          {{product._id}}
        </td>
        <td class="px-6 py-4">
          <img src="" alt="Image">
        </td>
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {{product.title}}
        </th>
        <td class="px-6 py-4">
          {{product.category ? product.category : '-'}}
        </td>
        <td class="px-6 py-4">
          {{product.price.toFixed(2)}}€
        </td>
        <td class="px-6 py-4">
          {{product.sku}}
        </td>
        <td class="px-6 py-4">
          {{getDate(product.updatedAt)}}
        </td>
        <td class="px-6 py-4">
          <div  v-if="product.tags.length > 0">
            <span v-for="(tag, index) in product.tags" :key="tag">{{tag}}{{index === product.tags.length - 1 ? '' : ', '}}</span>
          </div>
          <span v-else>-</span>
        </td>
        <td class="px-6 py-4 text-right">
          <router-link :to="'/products/edit/' + product._id" class="font-medium text-blue-600 hover:underline">Edit</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>

import axios from "axios";

export default {
  name: "Products",
  data() {
    return {
      products: [],
    }
  },
  async mounted() {
    const res = await axios.get('/api/product/all/')
    this.products = res.data
  },
  methods: {
    addZero(num) {
      if (num < 10) {
        num = '0' + num
      }
      return num
    },
    getDate(isoDate) {
      let date = new Date(isoDate)
      let newDate = this.addZero(date.getDate()) + '.' + this.addZero(date.getMonth() + 1)  + '.' + date.getFullYear() + ' ' + this.addZero(date.getHours()) + ':' + this.addZero(date.getMinutes()) + ':' + this.addZero(date.getSeconds())
      return newDate
    }
  }
}
</script>

<style scoped>

</style>