const contentStore = {
  namespaced: true,
  state: {
    content: {
      artists: [],
      applications: null,
      mainFooter: null,
      information: null,
      navigation: null,
      homepage: null,
      about: null,
      tooltips: null,
      howItWorks: null,
      nft: null,
      security: null,
      qanda: null,
      all: null,
      minted: null,
      onsale: null,
      sold: null,
      uploaded: null
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
    getTooltip: state => tooltipId => {
      if (!state.content.tooltips || !state.content.tooltips[tooltipId]) return
      return state.content.tooltips[tooltipId]
    },
    getSecurity: state => {
      return state.content.security
    },
    getQAndA: state => {
      return state.content.qanda
    },
    getAll: state => {
      return state.content.all
    },
    getMinted: state => {
      return state.content.minted
    },
    getOnsale: state => {
      return state.content.onsale
    },
    getSold: state => {
      return state.content.sold
    },
    getUploaded: state => {
      return state.content.uploaded
    },
    getApplications: state => {
      return state.content.applications
    },
    getArtists: state => {
      return state.content.artists
    },
    getArtistById: state => id => {
      return state.content.artists.find((o) => o.uid === id)
    },
    getAbout: state => {
      return state.content.about
    },
    getInformationById: state => id => {
      return state.content.information.find((o) => o.uid === id)
    },
    getHowItWorksById: state => id => {
      return state.content.howItWorks.find((o) => o.uid === id)
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
    }
  },
  mutations: {
    addHomeContent (state, o) {
      state.content.homepage = o
    },
    addTooltips (state, o) {
      state.content.tooltips = o
    },
    addAbout (state, o) {
      state.content.about = o
    },
    addQAndA (state, o) {
      state.content.qanda = o
    },
    addAll (state, o) {
      state.content.all = o
    },
    addMinted (state, o) {
      state.content.minted = o
    },
    addOnsale (state, o) {
      state.content.onsale = o
    },
    addSold (state, o) {
      state.content.sold = o
    },
    addUploaded (state, o) {
      state.content.uploaded = o
    },
    addSecurity (state, o) {
      state.content.security = o
    },
    addHowItWorks (state, o) {
      state.content.howItWorks = o
    },
    addInformation (state, o) {
      state.content.information = o
    }
  },
  actions: {
  }
}
export default contentStore
