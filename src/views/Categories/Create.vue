<template>
  <section class="pb-5">
    <h1 class="text-2xl mb-5">Создание категории</h1>
    <div class="flex justify-between">
      <div class="flex flex-col w-3/6 mr-5">
        <label class="text-gray-600 mb-1" for="parent">Родитель</label>
        <select id="parent" class="bg-gray-50 border border-gray-300 text-gray-900 mb-2 text-sm rounded-lg cursor-not-allowed focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none" disabled>
          <option>One</option>
          <option>Two</option>
          <option>Three</option>
          <option>Four</option>
          <option>Five</option>
        </select>
        <label class="text-gray-600 mb-1" for="name">Заголовок</label>
        <input type="text" min="1" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none" required/>
      </div>
      <div class="w-3/6 ml-5">
        <label for="photo" class="text-gray-600">Фотографии</label>
        <PhotoPreview id="photo" class="mt-1" :selected="selectedPhotos"/>
      </div>
    </div>
  </section>

</template>

<script>
import PhotoPreview from "@/components/PhotoPreview";
export default {
  name: "Create",
  data() {
    return {
      selectedPhotos: [],
    }
  },
  components: {PhotoPreview}
}
</script>

<style scoped>

</style>