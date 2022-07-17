<template>
  <div class="h-[794px] select-none grid grid-cols-4 lg:grid-cols-5 overflow-auto auto-rows-min gap-5 p-3 rounded-md border scrollbar">
    <div class="group flex rounded max-w-32 w-full h-full max-h-32 hover:bg-white/30 cursor-pointer relative transition" v-for="image in images" :key="image" @click="!selected.includes(image) ? $emit('add', image) : $emit('remove', image)">
        <svg v-if="selected.includes(image)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute top-2 right-2" viewBox="0 0 20 20" fill="#1f1f1f">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
          <svg v-if="selected.includes(image)" xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 top-1/3 opacity-0 group-hover:opacity-100 absolute left-1/3" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
      <img class="rounded bg-center -z-30" :src="image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "PhotoPreview",
  props: ['selected'],
  data() {
    return {
      images: ["https://sun9-87.userapi.com/impg/c855724/v855724637/250c75/9HcuEIaG8kI.jpg?size=783x744&quality=96&sign=93a5e5bed4fba2b03e2ea4f1bc4276d8&type=album",
        "https://sun9-87.userapi.com/impg/njbUTyspmS4uw6tYZ2_8apIq4q5UpRe1orW5tQ/grVbY0xoK8E.jpg?size=640x640&quality=95&sign=8742a78348a45f2117e938c8261924fd&type=album",
      ]
    }
  }
}
</script>

<style scoped>

</style>