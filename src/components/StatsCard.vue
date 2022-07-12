<template>
  <div class="p-4 rounded-2xl">
    <h2 class="title-font font-medium sm:text-4xl text-3xl text-white"><slot name="count"/></h2>
    <p class="leading-relaxed text-white"><slot name="title"/></p>
  </div>
</template>

<script>
export default {
  name: "StatsCard"
}
</script>

<style scoped>

</style>