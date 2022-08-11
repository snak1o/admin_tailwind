<template>
  <section>
    <div class="flex flex-col w-1/2">
      <h1 class="text-3xl mb-5">Редактирование цвета #{{color.id}}</h1>
      <label class="text-gray-600 mb-1" for="name">Имя цвета</label>
      <input id="name" v-model="color.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none mb-2" required/>
      <label class="text-gray-600 mb-1" for="hex">Цвет</label>
      <input id="hex" type="color" v-model="color.hex" class="bg-[#ffffff00] block w-16 h-16 outline-none mb-5" required/>
      <label class="text-gray-600 mb-1" for="price">Цена (по умолчанию 0):</label>
      <input id="price" v-model="color.price" type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none mb-2" required/>
      <button class="px-8 py-2 bg-green-700 rounded-md text-white" @click="updateColor">Сохранить</button>
    </div>
  </section>
</template>

<script>
import store from '@/store'

export default {
  name: "_color",
  data() {
    return {
      color: {},
      errors: [],
    }
  },
  async mounted() {
    console.log(this.$route.params.id)
    const {data} = await this.$axios.get('/api/v1/colors/' + this.$route.params.id)
    this.color = data
  },
  methods: {
    async updateColor() {
      if (this.validate()) {
        try{
          const res = await this.$axios.put('/api/v1/colors/' + this.$route.params.id, {
            name: this.color.name,
            hex: this.color.hex,
            price: this.color.price
          })
          if (res.status === 200) {
            await store.dispatch('addNotification', `Цвет #${this.color.id} был обновлен успешно.`)
          }
        } catch (err) {
          await store.dispatch('addNotification', `Ошибка ${err.response.status}.`)
        }
      }
    },
    validate() {
      if (this.color.name.trim() === "") {
        store.dispatch('addNotification', "Название цвета не может быть пустым.")
        return false
      }
      if (typeof(this.color.price) !== "number") {
        this.color.price = 0
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