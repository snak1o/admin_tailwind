<template>
  <div v-if="show" class="w-screen h-screen bg-zinc-900/50 z-10 absolute top-0 left-0 flex justify-center items-center" @click="$emit('close')">
    <div @click.stop class="flex bg-white rounded-md border p-5">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    show: {
      type: Boolean,
      required: true,
    }
  }
}
</script>

<style scoped>

</style>