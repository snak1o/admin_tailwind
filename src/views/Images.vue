<template>
  <section class="pb-5 flex flex-col justify-between">
      <div class="grid grid-cols-6 gap-10 w-full">
        <div v-for="image in images" :key="image.id" class="relative group cursor-pointer" @click="handleSelection(image.id)">
          <svg v-if="selectedImages.includes(image.id)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute top-2 right-2" viewBox="0 0 20 20" fill="#1f1f1f">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <svg v-if="selectedImages.includes(image.id)" xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 top-1/3 opacity-0 group-hover:opacity-100 absolute left-1/3" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          <img class="rounded bg-center -z-30 w-full group-hover:opacity-70" :src="$store.getters['host'] + image.filename" alt="">
        </div>
      </div>
    <button class="w-80 py-2 text-white rounded bg-green-700" @click="deleteImages">Удалить выделенные картинки</button>
  </section>
</template>

<script>
import store from "@/store";

export default {
  name: "Images",
  data() {
    return {
      selectedImages: [],
      images: [],
    }
  },
  async mounted() {
    await store.dispatch('updatePhotos')
    this.images = store.getters['images']
  },
  methods: {
    handleSelection(id) {
      if (this.selectedImages.includes(id)) {
        for (let i in this.selectedImages) {
          if (this.selectedImages[i] === id) {
            this.selectedImages.splice(parseInt(i), 1)
          }
        }
      } else {
        this.selectedImages.push(id)
      }
    },
    async deleteImages() {
      console.log(this.selectedImages)
      if (this.selectedImages.length > 0) {
        const res = await this.$axios.delete('/api/v1/images/', {
          data: {
            imagesId: this.selectedImages
          }
        })
        if (res.status && res.status === 200) {
          await store.dispatch('updatePhotos')
          this.images = store.getters['images']
          this.selectedImages = []
        }
      }
    },
  }
}
</script>

<style scoped>

</style>