<template>
  <router-view/>
  <Notification />
</template>

<script>
import Notification from "@/components/Notification";

export default {
  name: "EmptyLayout",
  components: {
    Notification
  }
}
</script>