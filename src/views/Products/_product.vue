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
          <ColorSelection id="colors" :color-selected="selectedColor" @selectColor="selectColor" @removeColor="removeColor"/>
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
          <label class="text-gray-600 mb-1" for="price">Цена товара без ндс (€)</label>
          <input type="number" min="1" v-model="product.price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 outline-none" required/>
        </div>
        <div class="flex flex-col mb-2">
          <label class="text-gray-600 mb-1" for="pricewithalv">Цена товара включая ндс (€)</label>
          <input type="number" min="1" :value="product.pricealv = (product.price + product.price * 0.24).toFixed(2)" id="pricewithalv" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg cursor-not-allowed focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 outline-none" disabled/>
        </div>
        <UploadFile />
        <button @click="updateProduct()" class="px-8 py-2 mt-2 bg-green-700 rounded-md text-white">Сохранить</button>
      </div>
      <div class="flex flex-col w-3/6 ml-5">
        <label class="text-gray-600 mb-1" for="photo">Фотографии</label>
        <PhotoPreview :selected="product.photos" id="photo" @add="selectPhoto" @remove="removePhoto"/>
      </div>
    </div>
  </section>
</template>

<script>
// import axios from "axios";

import UploadFile from "@/components/UploadFile";
import PhotoPreview from "@/components/PhotoPreview";
import ColorSelection from "@/components/ColorSelection";
export default {
  name: "_product",
  components: {ColorSelection, PhotoPreview, UploadFile},
  data() {
    return {
      currentTag: "",
      selectedColor: [],
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
        "photos": ["https://sun9-87.userapi.com/impg/c855724/v855724637/250c75/9HcuEIaG8kI.jpg?size=783x744&quality=96&sign=93a5e5bed4fba2b03e2ea4f1bc4276d8&type=album",
          "https://sun9-87.userapi.com/impg/njbUTyspmS4uw6tYZ2_8apIq4q5UpRe1orW5tQ/grVbY0xoK8E.jpg?size=640x640&quality=95&sign=8742a78348a45f2117e938c8261924fd&type=album",],
        "colors": [
          {
            "name": "Dark Gray",
            "hex": "#4a4848",
            "id": 1
          },
          {
            "name": "Red",
            "hex": "#ff0000",
            "id": 3
          }
        ],
        "price": 32.26,
        "pricealv": 40,
        "sku": "F23"
      }
    }
  },
  async mounted() {
    // const res = await axios.get('/api/product/byId/' + this.$route.params.id)
    // this.product = res.data
    for (let i in this.product.colors) {
      this.selectedColor.push(this.product.colors[i].id)
    }
  },
  methods: {
    addTag(){
      if (this.currentTag.trim() !== '') {
        this.product.tags.push({"name": this.currentTag})
        this.currentTag = ""
      }
    },
    updateProduct() {
      console.log('updated')
    },
    selectPhoto(value) {
      this.product.photos.push(value)
    },
    removePhoto(value) {
      let index = this.product.photos.indexOf(value)
      if (index >= 0) {
        this.product.photos.splice(index, 1)
      }
    },
    selectColor(value) {
      this.selectedColor.push(value.id)
      this.product.colors.push(value)
    },
    removeColor(value) {
      let selectedIndex = this.selectedColor.indexOf(value.id)
      let index
      for (let i in this.product.colors) {
        if (this.product.colors[i].id === value.id) {
          index = i
        }
      }
      if (selectedIndex >= 0 && index >= 0) {
        this.selectedColor.splice(selectedIndex, 1)
        this.product.colors.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>


</style>