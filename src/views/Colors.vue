<template>
  <section>
  <div class="flex justify-between items-center">
    <h1 class="text-3xl">Цвета</h1>
    <button v-if="colors.length > 0" class="text-green-700 text-md" @click="createColor()">+ Добавить новый</button>
  </div>
    <div class="grid grid-cols-4 mt-10 gap-10">
      <div v-for="(color, index) in colors"  :key="color.id" class="px-3 pt-3 pb-2 rounded-md border border-gray-400 relative" :class="color.hex === '#ffffff' ? 'text-black' : 'text-white'" :style="{backgroundColor: color.hex}">
        <p class="pb-10 text-xl">{{color.name}}</p>
        <div class="flex justify-between items-center">
          <span class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 pr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
            {{color.id}}</span>
          <span class="text-sm">
            {{ color.hex.toUpperCase()}}
          </span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute top-5 right-12 cursor-pointer" viewBox="0 0 20 20" fill="currentColor" @click="$refs.optionsPopUp[index].handleOptions()">
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
        <OptionsPopUp ref="optionsPopUp" class="top-10 right-12 border">
          <ul>
            <li class="text-black py-1 px-2 border-b hover:bg-gray-100 cursor-pointer transition" @click="addToAllProducts()">
              Добавить к товарам
            </li>
            <li class="text-black py-1 px-2 border-b text-red-500 hover:bg-gray-100 cursor-pointer transition">
              Удалить у всех товаров
            </li>
            <li class="text-black py-1 px-2 text-red-500 hover:bg-gray-100 cursor-pointer transition">
              Удалить цвет
            </li>
          </ul>
        </OptionsPopUp>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute top-5 right-5 cursor-pointer" viewBox="0 0 20 20" fill="currentColor" @click="editColor(color.id)">
          <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
        </svg>
      </div>
    </div>
    <Modal :show="showModal" @close="showModal = false" :title="modalTitle">
      <div class="flex flex-col w-72">
        <label class="text-gray-600 mb-1" for="name">Имя цвета</label>
        <input id="name" v-model="currentColor.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none mb-2" required/>
        <label class="text-gray-600 mb-1" for="hex">Цвет</label>
        <input id="hex" type="color" v-model="currentColor.hex" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5 block w-full h-12 outline-none mb-5" required/>
        <button class="px-8 py-2 bg-green-700 rounded-md text-white">Сохранить</button>
      </div>
    </Modal>
  </section>
</template>

<script>
import Modal from "@/components/Modal";
import OptionsPopUp from "@/components/OptionsPopUp";
export default {
  name: "Colors",
  components: {OptionsPopUp, Modal},
  data() {
    return {
      colors: [{name: "Dark Gray", hex: "#4a4848", id: 1},{name: "Black", hex: "#000000", id: 2},{name: "Red", hex: "#ff0000", id: 3},{name: "White", hex: "#ffffff", id: 4},{name: "White", hex: "#ffffff", id: 5}],
      currentColor: {name: "", hex: "#ffffff"},
      showModal: false,
      modalTitle: "",
      showOptions: false,
    }
  },
  methods: {
    editColor() {
      //axios.get('api/color/1')
      const res = {name: "Dark Gray", hex: "#4a4848", id: 1}
      this.currentColor = res
      this.showModal = true
      this.modalTitle = 'Редактирование цвета ' + res.id
    },
    createColor() {
      this.showModal = true
      this.modalTitle = "Создание цвета"
    },
    addToAllProducts() {
      console.log("Added to all products")
    }
  }
}
</script>

<style scoped>

</style>