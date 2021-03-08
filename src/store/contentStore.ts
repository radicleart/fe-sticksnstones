const contentStore = {
  namespaced: true,
  state: {
    content: {
      navigation: null,
      homepage: null,
      howItWorks: null
    },
    waitingImage: 'https://images.prismic.io/radsoc/f60d92d0-f733-46e2-9cb7-c59e33a15fc1_download.jpeg?auto=compress,format'
  },
  getters: {
    getWaitingCSS: state => imageUrl => {
      if (!imageUrl) imageUrl = state.waitingImage
      return {
        'min-height': '300px',
        'background-repeat': 'no-repeat',
        'background-position': 'center center',
        '-webkit-background-size': 'contain',
        '-moz-background-size': 'contain',
        '-o-background-size': 'contain',
        'background-size': 'contain',
        'background-image': `url(${imageUrl})`,
        opacity: 1,
        'text-align': 'center',
        border: '1pt solid #ccc'
      }
    },
    getHomepage: state => {
      return state.content.homepage
    },
    getNavbar: state => {
      return state.content.navigation
    },
    getHowItWorks: state => {
      return state.content.howItWorks
    }
  },
  mutations: {
    addHomeContent (state, o) {
      state.content.homepage = o
    },
    addNavigationContent (state, o) {
      state.content.navigation = o
    },
    addHowItWorks (state, o) {
      state.content.howItWorks = o
    }
  },
  actions: {
  }
}
export default contentStore
