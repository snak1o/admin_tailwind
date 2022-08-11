<template>
  <section>
    {{delivery}}
    <button @click="deleteDelivery">11</button>
  </section>
</template>

<script>
export default {
  name: "All",
  async mounted() {
      const res = await this.$axios.get('/api/v1/delivery/all')
      console.log(res)
      this.delivery = res.data
  },
  data() {
    return {
      delivery: [],
    }
  },
  methods: {
    async deleteDelivery() {
      await this.$axios.delete('/api/v1/delivery/1')
    }
  }
}
</script>

<style scoped>

</style>