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
        try {
          const res = await this.$axios.get('/api/v1/users/me')
          if (res && res.status === 200 && res.data.admin === true) {
            await store.commit('setLoggedIn', true)
            if (this.$route.fullPath === '/login') {
              await this.$router.push('/')
            }
          }
        } catch (e) {
          if (e.response && e.response.status === 500) {
            await store.dispatch('addNotification', "Ошибка 500.")
          }
        }
    }
  }
}
</script>

<style>

</style>
