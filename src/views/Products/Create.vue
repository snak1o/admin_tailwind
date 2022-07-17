<template>
  <section class="pb-5">
    <h1 class="text-2xl mb-5">Создать товар</h1>
    <div class="flex justify-between">
      <div class="w-3/6 mr-5">
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
          <ColorSelection id="colors" :color-selected="colorIds" @selectColor="selectColor" @removeColor="removeColor"/>
        </div>

        <div class="flex flex-col mb-2">
          <label class="text-gray-600 mb-1" for="tags">Теги товара</label>
          <input id="tags" v-model="currentTag" @keydown.enter="addTag" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" required/>
          <ul v-if="tags.length !== 0" class="flex mt-2">
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
          <input type="text" id="sku" v-model="sku" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 outline-none" required/>
        </div>

        <div class="flex flex-col mb-2">
          <label class="text-gray-600 mb-1" for="price">Цена товара (€), включая ндс {{(price + price * 0.24).toFixed(2)}}</label>
          <input type="number" min="1"  v-model="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 outline-none" required/>
        </div>
       <UploadFile />
      <button @click="createProduct" class="px-8 py-2 mt-2 bg-green-700 rounded-md text-white">Создать товар</button>
      </div>
      <div class="flex flex-col w-3/6 ml-5">
        <label class="text-gray-600 mb-1" for="photo">Фотографии</label>
        <PhotoPreview  id="photo" :selected="selectedPhotos" @add="selectPhoto" @remove="removePhoto"/>
      </div>
    </div>
  </section>
</template>

<script>
// import axios from "axios";

import PhotoPreview from "@/components/PhotoPreview";
import UploadFile from "@/components/UploadFile";
import ColorSelection from "@/components/ColorSelection";
export default {
  name: "Create",
  components: {ColorSelection, UploadFile, PhotoPreview},
  data() {
    return {
      title: "",
      desc: "",
      price: 0,
      currentTag: "",
      sku: "",
      tags: [],
      colors: [],
      colorIds: [],
      selectedPhotos: [],
    }
  },
  methods: {
    async createProduct() {
      // const res = await axios.post('/api/product/create/', {title: this.title, description: this.desc, price: this.price, pictures: ['fff'], colors: this.colors, sku: this.sku})
      // await this.$router.push('/products')
      // console.log(res)
    },
    addTag(){
      if (this.currentTag !== "") {
        this.tags.push(this.currentTag)
        this.currentTag = ""
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
      this.colors.push(value)
      this.colorIds.push(value.id)
    },
    removeColor(value) {
      let selectedIndex = this.colorIds.indexOf(value.id)
      let index
      for (let i in this.colors) {
        if (this.colors[i].id === value.id) {
          index = i
        }
      }
      if (selectedIndex >= 0 && index >= 0) {
        this.colorIds.splice(selectedIndex, 1)
        this.colors.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>

</style>