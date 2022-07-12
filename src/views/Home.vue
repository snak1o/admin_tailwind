<template>
  <div>
    <h1 class="text-3xl">Информация</h1>
    <div class="grid grid-cols-4 gap-10 pt-10">
      <StatsCard :class="classList[item - 1]" v-for="item in 4" :key="item">
        <template #count>1000</template>
        <template #title>Пользователи</template>
      </StatsCard>
    </div>
  </div>

</template>

<script>
import StatsCard from "@/components/StatsCard";

export default {
  name: 'Home',
  data() {
    return {
      classList: ['bg-yellow-500', 'bg-purple-400', 'bg-green-600', 'bg-indigo-400'],
    }
  },
  components: {StatsCard},

}
</script>
