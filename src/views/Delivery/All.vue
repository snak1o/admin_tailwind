<template>
  <section class="flex flex-col h-full">
    <div class="flex justify-between">
      <h1 class="text-3xl mb-5">Доставка</h1>
      <router-link class="text-green-700 text-md" to="/delivery/create">+ Добавить новую</router-link>
    </div>
    <div class="flex flex-col items-center h-full justify-center" v-if="delivery.length < 1">
      <span class="text-xl">Нет доставок для показа</span>
      <button class="px-8 py-2 mt-7 bg-green-700 rounded-md text-white" @click="$router.push('/delivery/create')">Добавить</button>
    </div>
    <div class="grid grid-cols-2 gap-8">
      <div v-for="item in delivery" :key="item.id"  @click="$router.push('/delivery/edit/' + item.id)" class="p-3 h-24 rounded-md border border-gray-200 flex justify-between cursor-pointer relative group">
        <div class="flex flex-col h-full justify-between">
          <span class="text-xl">{{item.name}}</span>
          <span>{{item.companyName}}</span>
        </div>
        <div class="h-full text-xl flex items-center">{{item.price}}€</div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute top-2 right-2 opacity-0 group-hover:opacity-100" viewBox="0 0 20 20" fill="currentColor" @click.stop="deleteDelivery(item.id)">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  </section>
</template>

<script>
import store from "@/store";

export default {
  name: "All",
  async mounted() {
      const res = await this.$axios.get('/api/v1/delivery/all')
      console.log(res)
      if (res.data) {
        this.delivery = res.data
      }
  },
  data() {
    return {
      delivery: [],
    }
  },
  methods: {
    async deleteDelivery(id) {
      const res = await this.$axios.delete('/api/v1/delivery/' + id)
      if (res.status && res.status === 200) {
        for (let i in this.delivery) {
          if (this.delivery[i].id === id) {
            await store.dispatch('addNotification', `Доставка #${id} удалена успешно.`)
            this.delivery.splice(parseInt(i), 1)
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>