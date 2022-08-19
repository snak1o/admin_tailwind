<template>
  <section class="pb-5 space-y-2">
    <h1 class="text-2xl mb-5">Создание категории</h1>
    <div class="flex flex-col w-1/3">
      <label class="text-gray-600 mb-1" for="name">Заголовок</label>
      <input type="text" min="1" id="name" v-model="category.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none" required/>
    </div>
    <div class="flex flex-col space-y-2 w-1/3">
      <button class="px-8 py-2 bg-green-700 rounded-md text-white" @click="updateCategory">Обновить категорию</button>
      <button class="px-8 py-2 bg-red-700 rounded-md text-white" @click="deleteCategory">Удалить категорию</button>
    </div>
  </section>
</template>

<script>
import store from "@/store";

export default {
  name: "_category",
  async mounted() {
    const {data} = await this.$axios.get('/api/v1/categories/' + this.$route.params.id)
    this.category = data
  },
  data() {
    return {
      category: {}
    }
  },
  methods: {
    async updateCategory() {
      try {
        if (this.category.name.trim().length > 1) {
          const res = await this.$axios.put('/api/v1/categories/' + this.category.id, {
            name: this.category.name
          })
          if (res && res.status === 200) {
            await store.dispatch('addNotification', `Категория #${this.category.id} обновлена успешно.`)
          }
        }else {
          await store.dispatch('addNotification', `Название категории не может быть пустым.`)
        }
      } catch (e) {
        await store.dispatch('addNotification', `Ошибка ${e.response.status}.`)
      }
    },
    async deleteCategory() {
       try {
         const res = await this.$axios.delete('/api/v1/categories/' + this.category.id)
         if (res && res.status === 200) {
           await this.$router.push('/categories')
           await store.dispatch('addNotification', `Категория #${this.category.id} удалена успешно.`)
         }
       }catch (e) {
         if (e.response.status === 409) {
           await store.dispatch('addNotification', `Категория где-то используется.`)
         }
         else {
           await store.dispatch('addNotification', `Ошибка ${e.response.status}.`)
         }
       }
    }
  }
}
</script>

<style scoped>

</style>