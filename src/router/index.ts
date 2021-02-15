import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import MainNavbar from '@/components/layout/MainNavbar.vue'
import Home from '../views/Home.vue'
import UploadItem from '../views/UploadItem.vue'
import MyItems from '../views/MyItems.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    components: { default: Home, header: MainNavbar }
  },
  {
    path: '/upload-item',
    name: 'upload-itm',
    components: { default: UploadItem, header: MainNavbar }
  },
  {
    path: '/my-items',
    name: 'my-items',
    components: { default: MyItems, header: MainNavbar }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
