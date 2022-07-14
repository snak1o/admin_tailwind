<template>
  <Sidebar/>
  <router-view class="w-5/6 flex-1 float-right p-5 h-screen"/>
</template>

<script>
import Sidebar from "@/components/Sidebar";

export default {
  name: "DefaultLayout",
  components: {
    Sidebar,
  }
}
</script>

<style scoped>

</style>