<template>
  <h1>{{product}}</h1>
</template>

<script>
// import axios from "axios";

export default {
  name: "_product",
  data() {
    return {
      product: ""
    }
  },
  async mounted() {
    // const res = await axios.get('/api/product/byId/' + this.$route.params.id)
    // this.product = res.data
  }
}
</script>

<style scoped>


</style>