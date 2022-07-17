<template>
  <div>
    <h1 class="text-3xl">Информация</h1>
    <div class="grid grid-cols-4 gap-10 pt-10">
      <StatsCard class="bg-yellow-500" title="Пользователи" count="1000" day-count="100"/>
      <StatsCard class="bg-purple-400" title="Пользователи" count="1000" day-count="100"/>
      <StatsCard class="bg-green-600" title="Пользователи" count="1000" day-count="100"/>
      <StatsCard class="bg-indigo-400" title="Пользователи" count="1000" day-count="100"/>

    </div>
  </div>

</template>

<script>
import StatsCard from "@/components/StatsCard";

export default {
  name: 'Home',
  components: {StatsCard},

}
</script>
