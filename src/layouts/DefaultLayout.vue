<template>
  <Sidebar/>
  <router-view class="w-5/6 flex-1 float-right p-5 h-screen"/>
  <Notification />
</template>

<script>
import Sidebar from "@/components/Sidebar";
import Notification from "@/components/Notification";

export default {
  name: "DefaultLayout",
  components: {
    Sidebar,
    Notification
  }
}
</script>

<style scoped>

</style>