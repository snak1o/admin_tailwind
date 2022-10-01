<template>
  <div v-if="loading" class="flex justify-center items-center h-screen">
    <div class="border-4 border-gray-400 border-t border-t-indigo-500 w-20 h-20 animate-spin rounded-full border-t-4"></div>
  </div>
  <component v-else v-bind:is="layout"></component>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout";
import EmptyLayout from '@/layouts/EmptyLayout';

export default {
  components: {
    DefaultLayout,
    EmptyLayout
  },
  computed: {
    layout() {
      return this.$store.getters.layout
    },
    loading() {
      return (this.$route.path !== '/login' && !this.$store.getters.loggedIn);
    }
  },
}
</script>

<style>

</style>
