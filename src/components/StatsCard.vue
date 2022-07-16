<template>
  <div class="flex justify-between p-4 rounded-2xl">
    <div>
      <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">{{count}}</h2>
      <p class="leading-relaxed text-white">{{title}}</p>
    </div>
    <div>
      <h2 class="title-font font-medium text-white">24ч. +{{dayCount}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatsCard",
  props: ['title', 'count', 'dayCount']
}
</script>

<style scoped>

</style>