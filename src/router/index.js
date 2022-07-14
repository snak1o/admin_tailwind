import { createRouter, createWebHistory } from 'vue-router'

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
import Login from "@/views/Login";
import Colors from "@/views/Colors";


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
      {path: '/categories/edit/:id', component: EditCategory }
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
    component: Colors
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

export default router
