<template>
  <section>
  <div class="flex justify-between items-center">
    <h1 class="text-3xl">Цвета</h1>
    <button v-if="colors.length > 0" class="text-green-700 text-md">+ Добавить новый</button>
  </div>
    <div class="grid grid-cols-4 mt-10 gap-10">
      <div v-for="color in colors"  :key="color.id" class="px-3 pt-3 pb-2 rounded-md border border-gray-400 relative" :class="color.hex === '#ffffff' ? 'text-black' : 'text-white'" :style="{backgroundColor: color.hex}">
        <p class="pb-10 text-xl">{{color.name}}</p>
        <div class="flex justify-between items-center">
          <span class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 pr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
            {{color.id}}</span>
          <span class="text-sm">
            {{ color.hex.toUpperCase()}}
          </span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute top-5 right-5 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
        </svg>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Colors",
  data() {
    return {
      colors: [{name: "Dark Gray", hex: "#4a4848", id: 1},{name: "Black", hex: "#000000", id: 2},{name: "Red", hex: "#ff0000", id: 3},{name: "White", hex: "#ffffff", id: 4},{name: "White", hex: "#ffffff", id: 4},]
    }
  }
}
</script>

<style scoped>

</style>