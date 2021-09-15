const contentStore = {
  namespaced: true,
  state: {
    content: {
      mainFooter: null,
      information: null,
      navigation: null,
      homepage: null,
      about: null,
      tooltips: null,
      howitworks: null,
      nft: null,
      terms: null,
      faq: null,
      developers: null,
      privacy: null
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
    getWaitingImage: state => gaiaItem => {
      let attrs = gaiaItem.attributes
      if (!attrs || !attrs.artworkFile) {
        attrs = {
          artworkFile: {
            fileUrl: state.waitingImage,
            type: 'image/jpg',
            name: 'Waiting Image'
          }
        }
      }
      if (!attrs.coverImage) {
        attrs.coverImage = {
          fileUrl: state.waitingImage,
          type: 'image/jpg',
          name: 'Waiting Image'
        }
      }
      return attrs
    },
    getBreakLine: state => {
      if (!state.content.homepage) return
      return state.content.homepage.breakline.url
    },
    getTooltip: state => tooltipId => {
      if (!state.content.tooltips || !state.content.tooltips[tooltipId]) return
      return state.content.tooltips[tooltipId]
    },
    getApplications: state => {
      return state.content.applications
    },
    getArtists: state => {
      return state.content.artists
    },
    getArtistById: state => id => {
      return (state.content.artists) ? state.content.artists.find((o) => o.uid === id) : null
    },
    getAbout: state => {
      return state.content.about
    },
    getTerms: state => {
      return state.content.terms
    },
    getPrivacy: state => {
      return state.content.privacy
    },
    getFAQ: state => {
      return state.content.faq
    },
    getDevelopers: state => {
      return state.content.developers
    },
    getInformationById: state => id => {
      return (state.content.information) ? state.content.information.find((o) => o.uid === id) : null
    },
    getHowItWorks: state => {
      return state.content.howitworks
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
    addFAQ (state, o) {
      state.content.faq = o
    },
    addTerms (state, o) {
      state.content.terms = o
    },
    addDevelopers (state, o) {
      state.content.developers = o
    },
    addPrivacy (state, o) {
      state.content.privacy = o
    },
    addTooltips (state, o) {
      state.content.tooltips = o
    },
    addHomeContent (state, o) {
      state.content.homepage = o
    },
    addAbout (state, o) {
      state.content.about = o
    },
    addHowItWorks (state, o) {
      state.content.howitworks = o
    },
    addInformation (state, o) {
      state.content.information = o
    }
  },
  actions: {
  }
}
export default contentStore
