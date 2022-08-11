<template>
  <section>
    <button @click="createDelivery">ff</button>
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