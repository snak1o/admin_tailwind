<template>
  <div class="flex h-full flex-col">
  <div class="flex justify-between items-center">
    <h1 class="text-3xl">Товары</h1>
    <router-link v-if="products.length > 0" to="/products/create" class="text-green-700 text-md">+ Добавить новый</router-link>
  </div>
    <div class="flex w-full mt-5">
      <input type="text" class="w-full border border-gray-200 rounded p-2 mr-3 outline-none" placeholder="Поиск" v-model="searchValue" />
      <select class="border border-gray-200 rounded p-2 mr-3 outline-none" v-model="searchOption">
        <option value="id">ID</option>
        <option value="sku">SKU</option>
        <option value="category">Категория</option>
      </select>
      <button class="px-8 py-2 bg-green-600 rounded-md text-white">Найти</button>
    </div>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5" v-if="products.length > 0">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3 w-10">
        </th>
        <th scope="col" class="px-6 py-3">
          <div class="flex items-center">
            <span>ID</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 rotate-90 ml-1 cursor-pointer" :class="sortBy === 'id' ? 'opacity-100' : 'opacity-60'" viewBox="0 0 20 20" fill="currentColor" @click="sortByValue('id')">
              <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
            </svg>
          </div>
        </th>
        <th scope="col" class="px-6 py-3">
          Фотография
        </th>
        <th scope="col" class="px-6 py-3">
          <div class="flex items-center">
            <span>Название</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 rotate-90 ml-1 cursor-pointer" :class="sortBy === 'name' ? 'opacity-100' : 'opacity-60'" viewBox="0 0 20 20" fill="currentColor" @click="sortByValue('name')">
              <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
            </svg>
          </div>
        </th>
        <th scope="col" class="px-6 py-3">
          <div class="flex items-center">
            <span>Категория</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 rotate-90 ml-1 cursor-pointer" :class="sortBy === 'category_id' ? 'opacity-100' : 'opacity-60'" viewBox="0 0 20 20" fill="currentColor" @click="sortByValue('category_id')">
              <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
            </svg>
          </div>
        </th>
        <th scope="col" class="px-6 py-3">
          <div class="flex items-center">
            <span>Цена</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 rotate-90 ml-1 opacity-60 cursor-pointer" :class="sortBy === 'price' ? 'opacity-100' : 'opacity-60'" viewBox="0 0 20 20" fill="currentColor" @click="sortByValue('price')">
              <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
            </svg>
          </div>
        </th>
        <th scope="col" class="px-6 py-3">
          <div class="flex items-center">
            <span>SKU</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 rotate-90 ml-1 cursor-pointer" :class="sortBy === 'sku' ? 'opacity-100' : 'opacity-60'" viewBox="0 0 20 20" fill="currentColor"  @click="sortByValue('sku')">
              <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
            </svg>
          </div>
        </th>
        <th scope="col" class="px-6 py-3">
          <div class="flex items-center">
            <span>Создано</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 rotate-90 ml-1 cursor-pointer" viewBox="0 0 20 20" fill="currentColor"  :class="sortBy === 'created_at' ? 'opacity-100' : 'opacity-60'"  @click="sortByValue('created_at')">
              <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
            </svg>
          </div>
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
      <tr class="bg-white border-b border-gray-200" v-for="product in products" :key="product.id">
        <td class="px-6 py-4">
          <input type="checkbox" :value="product.id" v-model="isSelected" @click="handleSelection"/>
        </td>
        <td class="px-6 py-4">
          {{product.id}}
        </td>
        <td class="px-6 py-1 h-20">
          <img class="max-h-24 h-full" :src="$store.getters['host'] + product.images[0].filename" alt="Image" v-if="product.images">
          <span v-else>no images</span>
        </td>
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {{product.name}}
        </th>
        <td class="px-6 py-4">
          {{product.category.name}}
        </td>
        <td class="px-6 py-4">
          {{product.price}}€
        </td>
        <td class="px-6 py-4">
          {{product.sku}}
        </td>
        <td class="px-6 py-4">
          {{product.createdAt}}
        </td>
        <td class="px-6 py-4">
          <div v-if="product.tags">
            <span v-for="(tag, index) in product.tags" :key="tag">{{tag.name}}{{index === product.tags.length - 1 ? '' : ', '}}</span>
          </div>
          <span v-else>-</span>
        </td>
        <td class="px-6 py-4 text-right">
          <router-link :to="'/products/edit/' + product.id" class="font-medium text-blue-600 hover:underline">Edit</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="flex flex-col items-center h-full justify-center">
   <span class="text-xl">Нет товаров для показа</span>
    <button class="px-8 py-2 mt-7 bg-green-700 rounded-md text-white" @click="$router.push('/products/create')">Добавить</button>
  </div>
  </div>
</template>

<script>

import store from "@/store";

export default {
  name: "Products",
  async mounted() {
    try {
      const res = await this.$axios.get(`/api/v1/items/all?sort_by=${this.sortBy}&sort_order=${this.sortOrder}`)
      console.log(res)
      if (res.data && res.status === 200) {
        this.products = res.data
      }
    }
    catch (e) {
      if (e.response.status === 403) {
        localStorage.removeItem('token')
        await this.$router.push('/login')
      }
    }
  },
  data() {
    return {
      products: [],
      searchOption: "id",
      searchValue: "",
      selectedProducts: [],
      sortBy: 'id',
      sortOrder: 'desc',
      isDesk: true,
      debounce: null,
    }
  },
  computed: {
    isSelected(id) {
      return this.products.includes(id)
    },
  },
  methods: {
    handleSelection() {
      let value = parseInt(event.target.value)
      if (!this.selectedProducts.includes(value)) {
        this.selectedProducts.push(value)
      } else {
        for (let i in this.selectedProducts) {
          if (this.selectedProducts[i] === value) {
            this.selectedProducts.splice(parseInt(i), 1)
          }
        }
      }
    },
    // async removeProducts() {
    //   const res = await this.$axios.delete('/api/v1/items/', {
    //     data: {
    //       itemsId: this.selectedProducts
    //     }
    //   })
    //   if (res && res.status === 200) {
    //     await store.dispatch('addNotification', `Выбранные продукты были удалены`)
    //   }
    // },
    async updateProducts() {
      try {
        const res = await this.$axios.get(`/api/v1/items/all?sort_by=${this.sortBy}&sort_order=${this.sortOrder}`)
        console.log(res)
        if (res.data && res.status === 200) {
          this.products = res.data
        }
      } catch (e) {
        await store.dispatch('addNotification', `Ошибка ${e.response.status}`)
      }
    },
    sortByValue(value) {
      this.sortBy = value
      if (this.isDesk) {
        this.sortOrder = 'asc'
        this.isDesk = false
      }
      else {
        this.sortOrder = 'desc'
        this.isDesk = true
      }
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.updateProducts()
      }, 1000)
    },
  }
}
</script>

<style scoped>

</style>