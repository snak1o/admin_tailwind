<template>
  <component v-bind:is="layout"></component>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout";
import EmptyLayout from '@/layouts/EmptyLayout';
import store from "@/store";

export default {
  components: {
    DefaultLayout,
    EmptyLayout
  },
  computed: {
    layout() {
      return this.$store.getters.layout
    }
  },
  async mounted() {
    if (localStorage.getItem('token') && localStorage.getItem('token').length > 0) {
        const res = await this.$axios.get('/api/v1/users/me')

        if (res && res.status === 200) {
          await store.commit('setLoggedIn', true)
        }
      console.log(res)
    }
  }
}
</script>

<style>

</style>
