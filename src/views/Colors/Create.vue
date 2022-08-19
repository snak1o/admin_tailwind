<template>
  <section>
    <div class="flex flex-col w-1/2">
      <h1 class="text-3xl mb-5">Создание цвета</h1>
      <label class="text-gray-600 mb-1" for="name">Имя цвета</label>
      <input id="name" v-model="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none mb-2" required/>
      <label class="text-gray-600 mb-1" for="hex">Цвет</label>
      <input id="hex" type="color" v-model="hex" class="focus:ring-blue-500 bg-[#ffffff00] focus:border-blue-500 block w-16 h-16 outline-none mb-5" required/>
      <label class="text-gray-600 mb-1" for="price">Цена (по умолчанию 0):</label>
      <input id="price" v-model="price" type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none mb-2" required/>
      <button class="px-8 py-2 bg-green-700 rounded-md text-white" @click="createColor">Создать</button>
    </div>
  </section>
</template>

<script>
import store from '@/store'

export default {
  name: "create",
  data() {
    return {
      name: '',
      hex: '#000000',
      price: 0,
      errors: [],
    }
  },
  methods: {
    async createColor() {
      if (this.validate()) {
        try {
          const res = await this.$axios.post('/api/v1/colors/create', {
            name: this.name,
            hex: this.hex,
            price: this.price
          })
          if (res.status === 200) {
            await store.dispatch('addNotification', `Цвет ${this.name} был создан успешно.`)
            await this.$router.push('/colors')
          }
        } catch (err) {
          await store.dispatch('addNotification', `Ошибка ${err.response.status}.`)
        }
      }
      this.name = ""
      this.price = 0
      this.hex = "#000000"
    },
    validate() {
      if (this.name.trim() === "") {
        store.dispatch('addNotification', "Название цвета не может быть пустым.")
        return false
      }
      if (typeof(this.price) !== "number") {
        this.price = 0
        return true
      }
      else {
        return true
      }
    }
  }
}
</script>

<style scoped>

</style>