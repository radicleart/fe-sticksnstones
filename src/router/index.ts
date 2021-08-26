import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store'

// templates
import MainNavbar from '@/components/layout/MainNavbar.vue'
import MainFooter from '@/components/layout/MainFooter.vue'

// public pages
import ApplicationAdmin from '../views/admin/ApplicationAdmin.vue'
import GetInTouch from '../views/GetInTouch.vue'
import FourOFour from '../views/FourOFour.vue'
import HowItWorks from '../views/HowItWorks.vue'
import InformationPage from '../views/InformationPage.vue'
import Model from '../views/Models/Model.vue'
import About from '../views/About.vue'
import Terms from '../views/Terms.vue'
import FAQ from '../views/FAQ.vue'
import AssetDetails from '../views/AssetDetails.vue'
import ItemPreview from '../views/ItemPreview.vue'
import MyNfts from '../views/upload/MyNfts.vue'
import NftGallery from '../views/NftGallery.vue'
import MyItems from '../views/upload/MyItems.vue'
import UploadItem from '../views/upload/UploadItem.vue'
import UpdateItem from '../views/upload/UpdateItem.vue'

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
    name: 'homepage',
    components: { default: NftGallery, header: MainNavbar, footer: MainFooter }
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
    path: '/nft-gallery',
    name: 'nft-gallery',
    components: { default: NftGallery, header: MainNavbar, footer: MainFooter },
    meta: { title: 'This is number one' }
  },
  {
    path: '/item-preview/:assetHash/:edition',
    name: 'item-preview',
    components: { default: ItemPreview, header: MainNavbar, footer: MainFooter },
    meta: {
      requiresAuth: true,
      requiresAdmin: false,
      title: 'Item preview'
    }
  },
  {
    path: '/assets/:assetHash/:edition',
    name: 'asset-by-hash',
    components: { default: AssetDetails, header: MainNavbar, footer: MainFooter },
    meta: { title: 'Asset informations' }
  },
  {
    path: '/nfts/:nftIndex',
    name: 'asset-by-index',
    components: { default: AssetDetails, header: MainNavbar, footer: MainFooter },
    meta: {
      requiresAuth: false,
      requiresAdmin: false,
      title: 'NFT display'
    }
  },
  {
    path: '/my-nfts',
    name: 'my-nfts',
    components: { default: MyNfts, header: MainNavbar, footer: MainFooter },
    meta: {
      requiresAuth: true,
      requiresAdmin: false
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
    path: '/nfts/:nftIndex',
    name: 'asset-by-index',
    components: { default: AssetDetails, header: MainNavbar, footer: MainFooter },
    meta: {
      requiresAuth: false,
      requiresAdmin: false,
      title: 'NFT display'
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
    path: '/about',
    name: 'about',
    components: { default: About, header: MainNavbar, footer: MainFooter }
  },
  {
    path: '/faq',
    name: 'faq',
    components: { default: FAQ, header: MainNavbar, footer: MainFooter }
  },
  {
    path: '/terms',
    name: 'terms',
    components: { default: Terms, header: MainNavbar, footer: MainFooter }
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
    path: '/app-admin',
    name: 'app-admin',
    components: { default: ApplicationAdmin, header: MainNavbar, footer: MainFooter },
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
    path: '/how-it-works',
    name: 'how-it-works',
    components: { default: HowItWorks, header: MainNavbar, footer: MainFooter }
  },
  {
    path: '/information/:pageId',
    name: 'information',
    components: { default: InformationPage, header: MainNavbar, footer: MainFooter }
  },
  {
    path: '/Model',
    name: 'Model',
    components: { default: Model, header: MainNavbar, footer: MainFooter }
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
        return next({ path: '/home' })
      }
    } else {
      setTimeout(function () {
        myProfile = store.getters['rpayAuthStore/getMyProfile']
        if (myProfile && myProfile.loggedIn) {
          if (isPermitted(to, myProfile)) {
            return next()
          } else {
            return next({ path: '/home' })
          }
        } else {
          return next({ path: '/' })
        }
      }, 5000)
    }
  } else {
    return next() // make sure to always call next()!
  }
})

export default router
