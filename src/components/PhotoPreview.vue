<template>
  <div class="h-[794px] select-none grid grid-cols-4 lg:grid-cols-5 overflow-auto auto-rows-min gap-5 p-3 rounded-md border border-gray-200 scrollbar">
    <div class="group flex rounded max-w-32 w-full h-full max-h-32 hover:bg-white/30 cursor-pointer relative transition" v-for="image in images" :key="image.id" @click="!selected.includes(image.id) ? $emit('add', image.id) : $emit('remove', image.id)">
        <svg v-if="selected.includes(image.id)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute top-2 right-2" viewBox="0 0 20 20" fill="#1f1f1f">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
          <svg v-if="selected.includes(image.id)" xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 top-1/3 opacity-0 group-hover:opacity-100 absolute left-1/3" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
      <img class="rounded bg-center -z-30" :src="$store.getters['host'] + image.filename" alt="">
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "PhotoPreview",
  props: ['selected'],
  async mounted() {
    await store.dispatch('updatePhotos')
  },
  computed: {
    images(){
      return store.getters['images']
    }
  }
}
</script>

<style scoped>

</style>