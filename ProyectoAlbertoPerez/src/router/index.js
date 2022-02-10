import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register.vue'
import CreateGroups from '../views/CreateGroups.vue'
import Home from '../views/Home.vue'
import Mygroups from '../views/Mygroups.vue'
import Login from '../views/Login'
import Pay from '../views/PaySimulator'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
    
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/mygroups',
    name: 'Mygroups',
    component: Mygroups
  },
 
  {
    path: '/create-group',
    name: 'CreateGroups',
    component: CreateGroups
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  
  {path: '/pay/:id', name: 'PaySimulator', component: Pay},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
