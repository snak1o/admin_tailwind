import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import instance from "@/plugins/axios";
import axios from "axios";

const app = createApp(App)

app.config.globalProperties.$axios = {...instance}

axios.defaults.baseURL = "VUE_API_URL"

app.use(store)

app.use(router)

app.mount('#app')




