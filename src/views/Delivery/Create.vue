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
export default {
  name: "Create",
  data() {
    return {
      companyName: '4444334',
      deliveryName: '4324242344',
      price: 100,
    }
  },
  methods: {
    async createDelivery() {
      const res = await this.$axios.post('/api/v1/delivery/create', {
        companyName: this.companyName,
        name: this.deliveryName,
        price: this.price
      })
      console.log(res)
    }
  }
}
</script>

<style scoped>

</style>