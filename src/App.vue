<template>
  <component v-bind:is="layout"></component>
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
    }
  },
}
</script>

<style>

</style>
