<template>
  <div v-if="show" class="absolute bg-white rounded text-black z-10" @click="handleOptions" @mouseleave="show = false">
    <slot/>
  </div>
</template>

<script>
export default {
  name: "OptionsPopUp",
  data() {
    return {
      show: false,
    }
  },
  methods: {
    handleOptions() {
      this.show = !this.show
    }
  }
}
</script>

<style scoped>

</style>