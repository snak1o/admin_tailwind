<template>
    <TransitionGroup name="list" tag="div" class="fixed bottom-3 left-3 space-y-2">
      <div class="bg-indigo-500 text-white p-3 rounded-md w-96 break-words" v-for="item in notifications" :key="item">
        {{item}}
      </div>
    </TransitionGroup>

</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Notification",
  computed: {
    ...mapGetters(['notifications'])
  }
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-60px);
}
</style>