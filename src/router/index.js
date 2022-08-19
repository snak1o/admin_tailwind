import { createRouter, createWebHistory } from 'vue-router'

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
import Orders from "@/views/Orders";
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


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
    path: '/Users',
    name: 'Users',
    component: Users,
    children: [
      {path: '/Users', component: AllUsers},
      {path: '/Users/edit/:id', component: EditUser }
    ]
  },
  {
    path: '/Colors',
    name: 'Colors',
    component: Colors,
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
  },
  {
    path: '/delivery',
    name: 'Delivery',
    component: Delivery,
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
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage.getItem('token')) {
    next({
      name: 'Login'
    })
  } else {
    next()
  }
})

export default router
