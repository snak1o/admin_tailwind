<template>
  <section class="pb-5">
  <h1 class="text-2xl mb-5">Редактировать продукт {{product.id}}</h1>
    <div class="flex justify-between">
      <div class="w-3/6 mr-5">
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
          <ColorSelection id="colors" :color-selected="selectedColors" @selectColor="selectColor" @removeColor="removeColor"/>
        </div>
        <div class="flex flex-col mb-2">
          <label class="text-gray-600 mb-1" for="category">Категория</label>
          <select name="category" id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" v-model="selectedCategory">
            <option v-for="category in categories" :value="category.id" :key="category.id">{{category.name}}</option>
          </select>
        </div>
        <div class="flex flex-col mb-2">
          <label class="text-gray-600 mb-1" for="tags">Теги товара</label>
          <input id="tags" v-model="currentTag" @keydown.enter="addTag" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" required/>
          <ul v-if="tags" class="flex mt-2">
            <li v-for="(tag, index) in tags" :key="tag" class="mr-2 bg-blue-500 rounded px-5 text-white relative group">
              {{tag}}
              <svg @click="tags.splice(index, 1)" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 absolute right-0.5 top-1.5 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100" viewBox="0 0 20 20" fill="currentColor">
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
          <label class="text-gray-600 mb-1" for="pricewithalv">Цена товара включая ндс (€)</label>
          <input type="number" min="1" v-model="priceAlv" id="pricewithalv" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 outline-none" required/>
        </div>
        <UploadFile />
        <button @click="updateProduct()" class="px-8 py-2 mt-2 bg-green-700 rounded-md text-white">Сохранить</button>
      </div>
      <div class="flex flex-col w-3/6 ml-5">
        <label class="text-gray-600 mb-1" for="photo">Фотографии</label>
        <PhotoPreview :selected="selectedPhotos" id="photo" @add="selectPhoto" @remove="removePhoto"/>
      </div>
    </div>
  </section>
</template>

<script>
import UploadFile from "@/components/UploadFile";
import PhotoPreview from "@/components/PhotoPreview";
import ColorSelection from "@/components/ColorSelection";
import axios from "axios";
import store from "@/store";

export default {
  name: "_product",
  components: {ColorSelection, PhotoPreview, UploadFile},
  data() {
    return {
      currentTag: "",
      selectedColors: [],
      selectedPhotos: [],
      product: [],
      priceAlv: 0,
      tags: [],
      categories: [],
      selectedCategory: null,
    }
  },
  async mounted() {
    const product = await axios.get(process.env.VUE_APP_API + '/api/v1/items/' + this.$route.params.id)
    this.product = product.data

    const categories = await axios.get(process.env.VUE_APP_API + '/api/v1/categories/')
    this.categories = categories.data

    for (let i in this.product.colors) {
      this.selectedColors.push(this.product.colors[i].id)
    }
    for (let i in this.product.images) {
      this.selectedPhotos.push(this.product.images[i].id)
    }
    this.priceAlv = this.product.price * 1.24

    if (this.product.tags) {
      for (let i in this.product.tags) {
        this.tags.push(this.product.tags[i].name)
      }
    }
    this.selectedCategory = this.product.category.id
  },
  methods: {
    addTag(){
      if (this.currentTag.trim() !== '') {
        this.tags.push(this.currentTag)
        this.currentTag = ""
      }
    },
    async updateProduct() {
      if (this.validateProduct()) {
        let price = parseFloat((this.priceAlv - (this.priceAlv * 0.1935)).toFixed(2))
        try {
          const res = await axios.put(process.env.VUE_APP_API + '/api/v1/items/' + this.product.id, {
            categoryId: this.selectedCategory,
            colors: this.selectedColors,
            description: this.product.description,
            images: this.selectedPhotos,
            name: this.product.name,
            price: price,
            sku: this.product.sku,
            tags: this.tags
          })
          if (res.status === 200) {
            await store.dispatch('addNotification', `Продукт #${this.product.id} обновлен успешно.`)
          }
        } catch (err) {
          await store.dispatch('addNotification', `Ошибка ${err.response.status}.`)
        }
      }
    },
    selectPhoto(value) {
      this.selectedPhotos.push(value)
    },
    removePhoto(value) {
      let index = this.selectedPhotos.indexOf(value)
      if (index >= 0) {
        this.selectedPhotos.splice(index, 1)
      }
    },
    selectColor(value) {
      console.log(value)
      this.selectedColors.push(value)
    },
    removeColor(value) {
      for (let i in this.selectedColors) {
        if (this.selectedColors[i] === value){
          this.selectedColors.splice(parseInt(i), 1)
        }
      }
    },
    validateProduct() {
      if (this.product.name.trim() === "") {
        store.dispatch('addNotification', "Название продукта не может быть пустым.")
        return false
      }
      if (this.product.description.trim() === "") {
        store.dispatch('addNotification', "Описание продукта не может быть пустым.")
        return false
      }
      if (this.selectedColors.length === 0) {
        store.dispatch('addNotification', "Выберите хотя бы один цвет.")
        return false
      }
      if (this.selectedPhotos.length === 0) {
        store.dispatch('addNotification', "Выберите хотя бы одну фотографию.")
        return false
      }
      if (this.selectedCategory === null) {
        store.dispatch('addNotification', "Выберите категорию продукта.")
        return false
      }
      if (this.product.sku === "") {
        store.dispatch('addNotification', "Уникальный номер товара не может быть пустым.")
        return false
      }
      if (typeof(this.priceAlv) !== 'number' || this.priceAlv <= 0) {
        store.dispatch('addNotification', "Цена должна быть больше нуля.")
        return false
      }
      else {
        return true
      }
    },
  },
}
</script>

<style scoped>


</style>