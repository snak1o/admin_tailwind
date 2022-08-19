<template>
  <section>
    <div class="flex justify-between items-center">
      <h1 class="text-3xl">Цвета</h1>
      <router-link class="text-green-700 text-md" to="/colors/create">+ Добавить новый</router-link>
    </div>
    <div class="grid grid-cols-4 mt-10 gap-10">
      <div v-for="(color, index) in colors"  :key="color.id" class="px-3 pt-3 pb-2 rounded-md border border-gray-400 relative" :class="color.hex === '#ffffff' ? 'text-black' : 'text-white'" :style="{backgroundColor: color.hex}">
        <p class="pb-10 text-xl">{{color.name}} ({{color.price}})</p>
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
        <OptionsPopUp ref="optionsPopUp" class="top-10 right-12 border border-gray-200">
          <ul>
            <li class="text-black py-1 px-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer transition" @click="addToAllProducts(color.id)">
              Добавить к товарам
            </li>
            <li class="text-black py-1 px-2 border-b border-gray-200 text-red-500 hover:bg-gray-100 cursor-pointer transition" @click="removeFromAllProducts(color.id)">
              Удалить у всех товаров
            </li>
            <li class="text-black py-1 px-2 text-red-500 hover:bg-gray-100 cursor-pointer transition" @click="removeColor(color.id)">
              Удалить цвет
            </li>
          </ul>
        </OptionsPopUp>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute top-5 right-5 cursor-pointer" viewBox="0 0 20 20" fill="currentColor" @click="$router.push('/Colors/edit/' + color.id)">
          <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
        </svg>
      </div>
    </div>
  </section>
</template>

<script>
import OptionsPopUp from "@/components/OptionsPopUp";
import store from "@/store";

export default {
  name: "All",
  components: {OptionsPopUp},
  async mounted() {
    const {data} = await this.$axios.get('/api/v1/colors/')
    if (data !== null){
      this.colors = data
    }
  },
  data() {
    return {
      colors: [],
      currentColor: {},
      showOptions: false,
      selectedColors: [],
    }
  },
  methods: {
    async addToAllProducts(id) {
      const res = await this.$axios.post('/api/v1/colors/all/' + id)
      console.log(res)
    },
    async removeFromAllProducts(id) {
      const res = await this.$axios.delete('/api/v1/colors/all/' + id)
      console.log(res)
    },
    async removeColor(id) {
      this.selectedColors.push(id)
      const res = await this.$axios.delete('/api/v1/colors/', {
        data: {
          colorsId: this.selectedColors
        }
      })
      if (res.status === 200) {
        await store.dispatch('addNotification', `Выбранные цвета удалены успешно.`)
        for (let i in this.colors) {
          if (this.colors[i].id === id) {
            this.colors.splice(parseInt(i), 1)
          }
        }
      }
    },
  }
}
</script>

<style scoped>

</style>