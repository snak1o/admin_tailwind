<template>
  <div class="w-screen h-screen bg-zinc-900/50 z-10 absolute top-0 left-0 flex justify-center items-center">
    <div @click.stop class="flex flex-col bg-white rounded-md border px-10 py-5 relative">
      <h2 class="text-2xl mb-3">{{title}}</h2>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute cursor-pointer top-2 right-2" viewBox="0 0 20 20" fill="currentColor" @click="$emit('close')">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    title: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped>

</style>