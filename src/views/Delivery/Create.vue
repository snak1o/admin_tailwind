<template>
  <section>
    <h1 class="text-2xl">Создание доставки</h1>
    <div class="flex flex-col pt-4">
      <div class="flex flex-col w-1/3 pb-2">
        <label class="text-gray-600 mb-1" for="name">Название доставки</label>
        <input type="text" min="1" id="name" v-model="deliveryName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none" required/>
      </div>
      <div class="flex flex-col w-1/3 pb-2">
        <label class="text-gray-600 mb-1" for="company">Название компании</label>
        <input type="text" min="1" id="company" v-model="companyName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none" required/>
      </div>
      <div class="flex flex-col w-1/3 pb-4">
        <label class="text-gray-600 mb-1" for="price">Цена</label>
        <input type="number" min="1" id="price" v-model="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none" required/>
      </div>
      <button class="px-8 py-2 bg-green-700 rounded-md text-white w-1/3" @click="createDelivery">Создать доставку</button>
    </div>
  </section>
</template>

<script>
import store from "@/store";

export default {
  name: "Create",
  data() {
    return {
      companyName: '',
      deliveryName: '',
      price: 0,
    }
  },
  methods: {
    async createDelivery() {
     if (this.validation()) {
       const res = await this.$axios.post('/api/v1/delivery/create', {
         companyName: this.companyName,
         name: this.deliveryName,
         price: parseFloat(this.price)
       })
       if (res.status === 200) {
         await this.$router.push('/delivery')
         await store.dispatch('addNotification', `Доставка #${res.data.id} создана успешно.`)
       }
     }
    },
    validation() {
      if (this.deliveryName.trim() === '' || this.deliveryName.trim().length < 1 || this.deliveryName.trim().length > 30) {
        store.dispatch('addNotification', `Название доставки не может быть меньше 1 символа и больше 30.`)
        return false
      }
      if (this.companyName.trim() === '' || this.companyName.trim().length < 1 || this.companyName.trim().length > 30) {
        store.dispatch('addNotification', `Название компании не может быть меньше 1 символа и больше 30.`)
        return false
      }
      if (parseFloat(this.price) < 0 || !parseFloat(this.price)) {
        store.dispatch('addNotification', `Цена доставки не может быть меньше 0.`)
        return false
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