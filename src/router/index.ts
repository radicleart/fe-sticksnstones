import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import MainNavbar from '@/components/layout/MainNavbar.vue'
import Home from '../views/Home.vue'
import UploadItem from '../views/UploadItem.vue'
import MyItems from '../views/MyItems.vue'
import HowItWorks from '../views/HowItWorks.vue'
import EditItem from '../views/EditItem.vue'

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
  },
  {
    path: '/how-it-works',
    name: 'how-it-works',
    components: { default: HowItWorks, header: MainNavbar }
  },
  {
    path: '/edit-item/:hash',
    name: 'edit-item',
    components: { default: EditItem, header: MainNavbar }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
