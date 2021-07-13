import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store'

// templates
import MainNavbar from '@/components/layout/MainNavbar.vue'
import MainFooter from '@/components/layout/MainFooter.vue'

// public pages
import Home from '../views/Home.vue'
import UserAdmin from '../views/UserAdmin.vue'
import Post from '../views/Post.vue'
import GetInTouch from '../views/GetInTouch.vue'
import FourOFour from '../views/FourOFour.vue'
import Community from '../views/Community.vue'
import NFT from '../views/NFT.vue'

const MyItems = () => import('../views/MyItems.vue')
const UploadItem = () => import('../views/UploadItem.vue')
const UpdateItem = () => import('../views/UpdateItem.vue')
const ItemDisplay = () => import('../views/ItemDisplay.vue')
const ItemPreview = () => import('../views/ItemPreview.vue')

Vue.use(VueRouter)

const isPermitted = function (to, profile) {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (to.matched.some(record => record.meta.requiresAdmin)) {
      return profile.superAdmin
    }
    return profile.loggedIn
  } else {
    return true
  }
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    components: { default: Home, header: MainNavbar, footer: MainFooter }
  },
  {
    path: '/edit-item/:assetHash',
    name: 'edit-item',
    components: { default: UpdateItem, header: MainNavbar, footer: MainFooter },
    meta: {
      requiresAuth: true,
      requiresAdmin: false
    }
  },
  {
    path: '/item-preview/:assetHash',
    name: 'item-preview',
    components: { default: ItemPreview, header: MainNavbar, footer: MainFooter },
    meta: {
      requiresAuth: true,
      requiresAdmin: false,
      title: 'Item preview'
    }
  },
  {
    path: '/assets/:assetHash',
    name: 'asset-display',
    components: { default: ItemDisplay, header: MainNavbar, footer: MainFooter },
    meta: {
      requiresAuth: false,
      requiresAdmin: false,
      title: 'Item Display'
    }
  },
  {
    path: '/mesh/v2/asset/:nftIndex',
    name: 'asset-display',
    components: { default: ItemDisplay, header: MainNavbar, footer: MainFooter },
    meta: {
      requiresAuth: false,
      requiresAdmin: false,
      title: 'Item Display'
    }
  },
  {
    path: '/my-items',
    name: 'my-items',
    components: { default: MyItems, header: MainNavbar, footer: MainFooter },
    meta: {
      requiresAuth: true,
      requiresAdmin: false
    }
  },
  {
    path: '/my-items/:filter',
    name: 'my-items-filter',
    components: { default: MyItems, header: MainNavbar, footer: MainFooter },
    meta: {
      requiresAuth: true,
      requiresAdmin: false
    }
  },
  {
    path: '/create',
    name: 'create',
    components: { default: UploadItem, header: MainNavbar, footer: MainFooter },
    meta: {
      requiresAuth: true,
      requiresAdmin: false
    }
  },
  {
    path: '/user-admin',
    name: 'user-admin',
    components: { default: UserAdmin, header: MainNavbar, footer: MainFooter },
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/get-in-touch',
    name: 'get-in-touch',
    components: { default: GetInTouch, header: MainNavbar, footer: MainFooter }
  },
  {
    path: '/community/:uid',
    name: 'community',
    components: { default: Community, header: MainNavbar, footer: MainFooter }
  },
  {
    path: '/nft',
    name: 'nft',
    components: { default: NFT, header: MainNavbar, footer: MainFooter }
  },
  {
    path: '/post/:uid',
    name: 'post',
    components: { default: Post, header: MainNavbar, footer: MainFooter }
  },
  {
    path: '/404',
    name: '404',
    components: { default: FourOFour, header: MainNavbar, footer: MainFooter }
  },
  {
    path: '*',
    redirect: { path: '/404' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    let myProfile = store.getters['rpayAuthStore/getMyProfile']
    if (myProfile && myProfile.loggedIn) {
      if (isPermitted(to, myProfile)) {
        return next()
      } else {
        return next({ path: '/home', query: { redirect: to.fullPath } })
      }
    } else {
      setTimeout(function () {
        myProfile = store.getters['rpayAuthStore/getMyProfile']
        if (myProfile && myProfile.loggedIn) {
          if (isPermitted(to, myProfile)) {
            return next()
          } else {
            return next({ path: '/home', query: { redirect: to.fullPath } })
          }
        } else {
          return next({
            path: '/',
            query: { redirect: to.fullPath }
          })
        }
      }, 2000)
    }
  } else {
    return next() // make sure to always call next()!
  }
})

export default router
