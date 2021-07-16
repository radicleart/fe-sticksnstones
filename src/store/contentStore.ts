
const contentStore = {
  namespaced: true,
  state: {
    content: {
      artists: [],
      applications: [],
      mainFooter: null,
      navigation: null,
      homepage: null,
      howItWorks: null,
      nft: null,
      community: null
    },
    defaultArtist: 'chemicalx',
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
    getBreakLine: state => {
      if (!state.content.homepage) return
      return state.content.homepage.breakline.url
    },
    getApplications: state => {
      return state.content.applications
    },
    getApplicationsById: state => id => {
      return state.content.applications.find((o) => o.uid === id)
    },
    getArtists: state => {
      return state.content.artists
    },
    getArtistById: state => id => {
      return state.content.artists.find((o) => o.uid === id)
    },
    getInformationById: state => id => {
      return state.content.information.find((o) => o.uid === id)
    },
    getArtistId: state => artist => {
      try {
        return artist.toLowerCase().replace(/ /g, '')
      } catch (e) {
        return state.defaultArtist
      }
    },
    getHomepage: state => {
      return state.content.homepage
    },
    getMainFooter: state => {
      return state.content.mainFooter
    },
    getNavbar: state => {
      return state.content.navigation
    },
    getHowItWorks: state => {
      return state.content.howItWorks
    },
    getNft: state => {
      return state.content.nft
    },
    getCommunity: state => {
      return state.content.community
    }
  },
  mutations: {
    addHomeContent (state, o) {
      state.content.homepage = o
    },
    addNftContent (state, o) {
      state.content.nft = o
    },
    addCommunityContent (state, o) {
      state.content.community = o
    },
    addInformation (state, o) {
      state.content.information = o
    }
  },
  actions: {
  }
}
export default contentStore
