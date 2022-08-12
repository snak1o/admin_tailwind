<template>
  <section>
    <h1 class="text-2xl">Редактирование доставки #{{delivery.id}}</h1>
    <div class="flex flex-col pt-4">
      <div class="flex flex-col w-1/3 pb-2">
        <label class="text-gray-600 mb-1" for="name">Название доставки</label>
        <input type="text" min="1" id="name" v-model="delivery.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none" required/>
      </div>
      <div class="flex flex-col w-1/3 pb-2">
        <label class="text-gray-600 mb-1" for="company">Название компании</label>
        <input type="text" min="1" id="company" v-model="delivery.companyName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none" required/>
      </div>
      <div class="flex flex-col w-1/3 pb-4">
        <label class="text-gray-600 mb-1" for="price">Цена</label>
        <input type="number" min="1" id="price" v-model="delivery.price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none" required/>
      </div>
      <button class="px-8 py-2 bg-green-700 rounded-md text-white w-1/3" @click="updateDelivery">Обновить доставку</button>
    </div>
  </section>
</template>

<script>
import store from "@/store";

export default {
  name: "_delivery",
  data() {
    return {
      delivery: {},
    }
  },
  async mounted() {
    const res = await this.$axios.get('/api/v1/delivery/' + this.$route.params.id)
    if (res.data) {
      this.delivery = res.data
    }
  },
  methods: {
    async updateDelivery() {
      if (this.validation()) {
        const res = await this.$axios.put('/api/v1/delivery/' + this.delivery.id, {
          companyName: this.delivery.companyName,
          name: this.delivery.name,
          price: parseInt(this.delivery.price)
        })
        if (res.status === 200) {
          await store.dispatch('addNotification', `Доставка #${this.delivery.id} обновлена успешно.`)
          await this.$router.push('/delivery')
        }
      }
    },
    validation() {
      if (this.delivery.name.trim() === '' || this.delivery.name.trim().length < 1 || this.delivery.name.trim().length > 30) {
        store.dispatch('addNotification', `Название доставки не может быть меньше 1 символа и больше 30.`)
        return false
      }
      if (this.delivery.companyName.trim() === '' || this.delivery.companyName.trim().length < 1 || this.delivery.companyName.trim().length > 30) {
        store.dispatch('addNotification', `Название компании не может быть меньше 1 символа и больше 30.`)
        return false
      }
      if (parseInt(this.delivery.price) < 0 || !parseInt(this.delivery.price)) {
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