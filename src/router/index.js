import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Casethai from '../views/Casethai.vue'
import MapVue from '../views/map.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/map',
    name: 'map',
    component: MapVue
  },
  {
    path: '/thai',
    name: 'Casethai',
    component: Casethai
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
