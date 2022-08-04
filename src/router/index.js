import { createRouter, createWebHistory } from 'vue-router'

//store
import store from '../store/index'

//Dashboard
import Home from '../views/Home.vue'
//Users
import Users from '@/views/users/index'
import AllUsers from '@/views/users/All'
import EditUser from '@/views/users/_user'
//Products
import Products from "@/views/Products/index";
import AllProducts from "@/views/Products/All";
import EditProduct from "@/views/Products/_product";
import CreateProduct from "@/views/Products/Create"
//Orders
import Orders from "@/views/Orders";
//Categories
import Categories from "@/views/Categories/index";
import AllCategories from "@/views/Categories/All";
import EditCategory from "@/views/Categories/_category";
import CreateCategory from "@/views/Categories/Create";
//login
import Login from "@/views/Login";
//colors
import Colors from "@/views/colors/index";
import AllColors from "@/views/colors/All"
import CreateColor from '@/views/colors/Create';
import EditColor from '@/views/colors/_color';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
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
    children: [
      {path: '/products', component: AllProducts},
      {path: '/products/edit/:id', component: EditProduct },
      {path: '/products/create', component: CreateProduct }
    ]
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    children: [
      {path: '/users', component: AllUsers},
      {path: '/users/edit/:id', component: EditUser }
    ]
  },
  {
    path: '/colors',
    name: 'Colors',
    component: Colors,
    children: [
      {path: '/colors', component: AllColors},
      {path: '/colors/create', component: CreateColor},
      {path: '/colors/edit/:id', component: EditColor},
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.getters['loggedIn']) next({ name: 'Login'})
  else next()
})

export default router
