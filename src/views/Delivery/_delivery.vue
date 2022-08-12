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
export default {
  name: "_delivery",
  data() {
    return {
      delivery: {},
    }
  },
  async mounted() {
    const res = await this.$axios.get('/api/v1/delivery/' + this.$route.params.id)
    this.delivery = res.data
  },
  methods: {
    async updateDelivery() {
      this.delivery.price = 10
      await this.$axios.put('/api/v1/delivery/' + this.delivery.id, {
        companyName: this.delivery.companyName,
        name: this.delivery.name,
        price: this.delivery.price
      })
    }
  }
}
</script>

<style scoped>

</style>