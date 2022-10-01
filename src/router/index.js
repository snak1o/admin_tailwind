import {createRouter, createWebHashHistory} from 'vue-router'

//Dashboard
import Home from '../views/Home.vue'
//Users
import Users from '@/views/Users/index'
import AllUsers from '@/views/Users/All'
import EditUser from '@/views/Users/_user'
//Products
import Products from "@/views/Products/index";
import AllProducts from "@/views/Products/All";
import EditProduct from "@/views/Products/_product";
import CreateProduct from "@/views/Products/Create"
//Orders
import Orders from "@/views/Orders/index";
import AllOrders from "@/views/Orders/All";
import ViewOrder from "@/views/Orders/_order";
//Categories
import Categories from "@/views/Categories/index";
import AllCategories from "@/views/Categories/All";
import EditCategory from "@/views/Categories/_category";
import CreateCategory from "@/views/Categories/Create";
//login
import Login from "@/views/Login";
//Colors
import Colors from "@/views/Colors/index";
import AllColors from "@/views/Colors/All"
import CreateColor from '@/views/Colors/Create';
import EditColor from '@/views/Colors/_color';
//Images
import Images from "@/views/Images";
//Delivery
import Delivery from "@/views/Delivery/index"
import AllDelivery from '@/views/Delivery/All'
import CreateDelivery from '@/views/Delivery/Create'
import EditDelivery from '@/views/Delivery/_delivery'
//500 code
import Maintenance from "@/views/Maintenance";
//store
import store from "@/store";
import $axios from '@/plugins/axios'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: [checkAuth],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
    beforeEnter: [checkAuth],
    children: [
      {path: '/categories', component: AllCategories},
      {path: '/categories/edit/:id', component: EditCategory },
      {path: '/categories/create', component: CreateCategory }
    ]
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    beforeEnter: [checkAuth],
    children: [
      {path: '/products', component: AllProducts},
      {path: '/products/edit/:id', component: EditProduct },
      {path: '/products/create', component: CreateProduct }
    ]
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    beforeEnter: [checkAuth],
    children: [
      {path: '/orders', component: AllOrders},
      {path: '/orders/:id', component: ViewOrder },
    ]
  },
  {
    path: '/Users',
    name: 'Users',
    component: Users,
    beforeEnter: [checkAuth],
    children: [
      {path: '/Users', component: AllUsers},
      {path: '/Users/edit/:id', component: EditUser }
    ]
  },
  {
    path: '/Colors',
    name: 'Colors',
    component: Colors,
    beforeEnter: [checkAuth],
    children: [
      {path: '/Colors', component: AllColors},
      {path: '/Colors/create', component: CreateColor},
      {path: '/Colors/edit/:id', component: EditColor},
    ]
  },
  {
    path: '/images',
    name: 'Images',
    component: Images,
    beforeEnter: [checkAuth],
  },
  {
    path: '/delivery',
    name: 'Delivery',
    component: Delivery,
    beforeEnter: [checkAuth],
    children: [
      {path: '/delivery', component: AllDelivery},
      {path: '/delivery/create', component: CreateDelivery},
      {path: '/delivery/edit/:id', component: EditDelivery},
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
  {
    path: '/maintenance',
    name: 'Maintenance',
    component: Maintenance,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

async function checkAuth(to, from, next) {
  if (localStorage.getItem('token') && localStorage.getItem('token').length > 0) {
    try {
      const res = await $axios.get('/api/v1/users/me')
      if (res && res.status === 200 && res.data.admin === true) {
        await store.commit('setLoggedIn', true)
        next()
      }
      else {
        return next('/login')
      }
    } catch (e) {
      if (e.code === "ERR_NETWORK") {
        await store.dispatch('addNotification', 'Ошибка подключения к серверу.')
      }
      return next('/login')
    }
  }
  else{
    return next('/login')
  }
}

export default router
