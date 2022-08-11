<template>
  <section>
    {{delivery}}
    <button @click="updateDelivery">1</button>
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