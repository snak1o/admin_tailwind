<template>
  <section class="pb-5">
    <h1 class="text-2xl mb-5">Создание категории</h1>
    <div class="flex flex-col w-1/3 pb-2">
      <label class="text-gray-600 mb-1" for="name">Заголовок</label>
      <input type="text" min="1" id="name" v-model="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none" required/>
    </div>
    <button class="px-8 py-2 bg-green-700 rounded-md text-white" @click="createCategory">Создать категорию</button>
  </section>
</template>

<script>
import store from "@/store";

export default {
  name: "Create",
  data() {
    return {
      name: ''
    }
  },
  methods: {
    async createCategory() {
      try {
        if (this.validation()) {
          const res = await this.$axios.post('/api/v1/categories/create', {
            name: this.name
          })
          console.log(res)
          if (res.status === 200) {
            await store.dispatch('addNotification', `Категория ${this.name} создана успешно.`)
          }
        }
      }catch (err) {
        await store.dispatch('addNotification', `Ошибка ${err.response.status}.`)
      }

    },
    validation() {
      if (this.name === "") {
        store.dispatch('addNotification', "Название категории не может быть пустым.")
        return false
      }
      else return true
    }
  }
}
</script>

<style scoped>

</style>