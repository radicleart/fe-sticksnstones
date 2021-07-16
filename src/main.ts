import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Notifications from 'vue-notification'
import PrismicVue from '@prismicio/vue'
import linkResolver from './prismic/link-resolver'
import htmlSerializer from './prismic/html-serializer'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/scss/custom.scss'
import './assets/scss/rpay-pay-card.css'
import VueScrollTo from 'vue-scrollto'
import VueSocialSharing from 'vue-social-sharing'
import Vue2TouchEvents from 'vue2-touch-events'
import browserDetect from 'vue-browser-detect-plugin'

const RisidioPay = () => import('risidio-pay')

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(browserDetect)
Vue.use(VueScrollTo)
Vue.use(VueSocialSharing)
Vue.use(IconsPlugin)
Vue.use(Notifications, { closeOnClick: true, duration: 10000 })
Vue.use(PrismicVue, {
  accessToken: '',
  endpoint: 'https://radsoc.cdn.prismic.io/api/v2',
  linkResolver,
  htmlSerializer
})
Vue.use(RisidioPay)
Vue.use(Vue2TouchEvents)

declare global {
  interface Window { eventBus: any }
}
window.eventBus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
