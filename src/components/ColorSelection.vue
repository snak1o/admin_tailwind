<template>
  <div class="grid grid-cols-6 gap-4">
    <div v-for="color in colors" :key="color.id" :style="{backgroundColor: color.hex}" class="rounded border w-28 h-28 cursor-pointer relative" @click="!colorSelected.includes(color.id) ? $emit('selectColor', color) : $emit('removeColor', color)">
      <svg v-if="colorSelected.includes(color.id)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute top-2 right-2" viewBox="0 0 20 20" :fill="color.hex === '#ffffff' ? '#000000' : '#ffffff'">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "ColorSelection",
  props: ['colorSelected'],
  data() {
    return {
      colors: [
        {name: "Dark Gray", hex: "#4a4848", id: 1},
        {name: "Black", hex: "#000000", id: 2},
        {name: "Red", hex: "#ff0000", id: 3},
        {name: "White", hex: "#3a4fe3", id: 4},
        {name: "White", hex: "#170101", id: 5},
        {name: "Dark Gray", hex: "#4a4848", id: 6},
        {name: "Black", hex: "#000000", id: 7},
        {name: "Red", hex: "#ff0000", id: 8},
        {name: "White", hex: "#2bbd65", id: 9},
        {name: "White", hex: "#ffffff", id: 10}
      ],
    }
  }
}
</script>

<style scoped>

</style>