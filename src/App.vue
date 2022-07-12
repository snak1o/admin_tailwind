<template>
  <Sidebar/>
  <router-view class="w-5/6 flex-1 float-right p-5"/>
</template>

<script>
import Sidebar from "@/components/Sidebar";

export default {
  components: {
    Sidebar,
  },

}
</script>

<style>

</style>
