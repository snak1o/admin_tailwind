<template>
  <section class="pb-5 space-x-10 flex">
    <div class="w-1/2">
      <h1 class="text-2xl mb-5">Создание категории</h1>
      <div class="flex flex-col pb-2">
        <label class="text-gray-600 mb-1" for="name">Заголовок</label>
        <input type="text" min="1" id="name" v-model="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none" required/>
      </div>
      <UploadFile />
      <button class="px-8 py-2 bg-green-700 rounded-md text-white" @click="createCategory">Создать категорию</button>
    </div>
    <PhotoPreview class="w-1/2" :selected="selectedImage" @add="setSelected" @remove="removeSelected"></PhotoPreview>
  </section>
</template>

<script>
import store from "@/store";
import PhotoPreview from "@/components/PhotoPreview";
import UploadFile from "@/components/UploadFile";

export default {
  name: "Create",
  components: {UploadFile, PhotoPreview},
  data() {
    return {
      name: '',
      selectedImage: [],
    }
  },
  methods: {
    async createCategory() {
      try {
        if (this.validation()) {
          const res = await this.$axios.post('/api/v1/categories/create', {
            name: this.name,
            imageId: this.selectedImage[0]
          })
          console.log(res)
          if (res.status === 200) {
            await store.dispatch('addNotification', `Категория ${this.name} создана успешно.`)
          }
        }
      }catch (e) {
        await store.dispatch('addNotification', `Ошибка ${e.response.status}.`)
      }

    },
    validation() {
      if (this.name.trim() === "") {
        store.dispatch('addNotification', "Название категории не может быть пустым.")
        return false
      }
      else return true
    },
    setSelected(value) {
      if (this.selectedImage.length === 0) {
        this.selectedImage.push(value)
      }
      else {
        this.selectedImage.length = 0
        this.selectedImage.push(value)
      }
    },
    removeSelected() {
      this.selectedImage = []
    }
  }
}
</script>

<style scoped>

</style>