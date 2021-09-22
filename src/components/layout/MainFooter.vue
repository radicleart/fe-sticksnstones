<template>
<div v-if="content" class="mt-5">
  <footer id="footer" class="mt-5 text-white" :style="bannerImage">
    <div class="container">
      <div class="row m-0 d-flex">
        <div class="col-lg-5 col-12 d-flex flex-column justify-content-center align-items-lg-start align-items-center">
          <router-link to="/" class="navbar-brand text-white"><img :src="logo" alt="risidio-logo" class="footer-logo"/></router-link>
          <p class="footer__pitch">Risidio Universal Minting Application gives you everything you need for minting digital property on the Bitcoin blockchain. We use the Stacks Network and Clarity Smart Contracts to ensure the most secure and long lasting NFTs currently available on the Internet. We are looking for partners and clients to help get the platform to the next level and make it a production ready viable alternative to similar projects like Open Sea on Ethereum.</p>
        </div>
        <div class="col-lg-7 col-12 d-flex columns3-content__container">
            <div class="footer__column-content ml-lg-auto">
              <div class="text-secondary">NFT</div>
              <!-- <b-navbar-nav v-if="profile.loggedIn" class="ml-auto"> -->
              <div><b-link to="/my-items">My Items</b-link></div>
              <div><b-link to="/create">Mint an NFT</b-link></div>
              <div><b-link to="/information/buy-now-tutorial">Minting and Buying</b-link></div>
              <!-- </b-navbar-nav> -->
              <!-- <b-navbar-nav v-else class="ml-auto"> -->
              <!-- <div><b-link to="/information/buy-now-tutorial">Minting and Buying</b-link></div> -->
               <!-- </b-navbar-nav> -->
              <div style="height: 17px; width: 50px; bg-secondary"></div>
            </div>
            <div class="footer__column-content">
              <div class="text-secondary">How It Works</div>
                   <div v-scroll-to="{ offset: -60, element: '#g1', duration: 1000 }">
                  <b-link to="/how-it-works">Get Your Stacks Wallet</b-link>
                </div>
                <div v-scroll-to="{ offset: -60, element: '#g2', duration: 1000 }">
                  <b-link to="/how-it-works">Upload Your Item</b-link>
                </div>
                <div v-scroll-to="{ offset: -60, element: '#g3', duration: 1000 }">
                  <b-link to="/how-it-works">Mint an NFT</b-link>
                </div>
                <div v-scroll-to="{ offset: -60, element: '#g4', duration: 1000 }">
                  <b-link to="/how-it-works">Set Royalties</b-link>
                </div>
            </div>
            <div class="footer__column-content">
              <div class="text-secondary">What we do</div>
              <div><router-link to="/get-in-touch">Get in Touch</router-link></div>
              <div><router-link to="/developers">Developers</router-link></div>
              <div style="height: 20px; width: 50px; bg-secondary"></div>
              <div style="height: 20px; width: 50px; bg-secondary"></div>
            </div>
        </div>
      </div>
      <div class="footer__divider"></div>
      <div class="col-12 d-lg-flex d-none justify-content-between footer__bottom-row">
        <div>
          &copy; &nbsp; {{ year }} Risidio Ltd. All right reserved.
        </div>
        <div>
          <a href="https://discord.gg/qvuxB9P"><img :src="discordLogo" alt="discord-logo"></a>
          <a href="https://www.instagram.com/risidio_official/"><img :src="instagramLogo" alt="instagram-logo"></a>
          <a href="https://twitter.com/Risidio1"><img :src="twitterLogo" alt="twitter-logo"></a>
          <a href="https://www.youtube.com/channel/UCrMDxxhMvpeyErw7m92IIXA/featured"><img :src="youtubeLogo" alt="youtube-logo"></a>
        </div>
        <div>
          <router-link to="/privacy">Privacy Policy</router-link>
          <router-link to="/terms">Terms of Use</router-link>
        </div>
      </div>
      <!-- MOBILE DESIGN LAST ROW -->
      <div class="col-12 d-flex d-lg-none flex-column align-items-center footer__bottom-row">
        <div>
          <a href="https://discord.gg/qvuxB9P"><img :src="discordLogo" alt="discord-logo"></a>
          <a href="https://www.instagram.com/risidio_official/"><img :src="instagramLogo" alt="instagram-logo"></a>
          <a href="https://twitter.com/Risidio1"><img :src="twitterLogo" alt="twitter-logo"></a>
          <a href="https://www.youtube.com/channel/UCrMDxxhMvpeyErw7m92IIXA/featured"><img :src="youtubeLogo" alt="youtube-logo"></a>
        </div>
        <div>
          &copy; &nbsp; {{ year }} Risidio Ltd. All right reserved.
        </div>
        <div>
          <span>Privacy Policy</span>
          <router-link to="/terms">Terms of Use</router-link>
        </div>
      </div>
    </div>
  </footer>
</div>
</template>
<script>

export default {
  components: {
  },
  props: {
    backgroundColor: String,
    type: String
  },
  data () {
    return {
      banner: 'https://images.prismic.io/digirad/1f147c92-5945-4d4e-a578-aa085e6603ef_Ruma_bg.png?auto=compress,format',
      logo: require('@/assets/img/risidio_white.png'),
      year: new Date().getFullYear(),
      discordLogo: require('@/assets/img/discord-logo.svg'),
      instagramLogo: require('@/assets/img/instagram-logo.svg'),
      twitterLogo: require('@/assets/img/twitter-logo.svg'),
      youtubeLogo: require('@/assets/img/youtube-logo.svg')
    }
  },
  methods: {
    getContent (contentType) {
      const content = this.$store.getters['contentStore/getHomepage']
      if (content) {
        let sitecontent = ''
        content.footer[0][contentType].forEach(function (option) {
          sitecontent += option.text
        })
        return sitecontent
      }
      return {}
    }
  },
  computed: {
    bannerImage () {
      return {
        height: 'auto',
        width: '100%',
        'background-repeat': 'no-repeat',
        'background-image': `url(${this.banner})`,
        'background-position': 'center center',
        '-webkit-background-size': 'cover',
        '-moz-background-size': 'cover',
        '-o-background-size': 'cover',
        'background-size': 'cover'
      }
    },
    content () {
      const content = this.$store.getters['contentStore/getHomepage']
      return content
    }
  }
}
</script>
<style scoped>
/* FOOTER STYLE */
footer {
  /*height: 440px;*/
  background-color: #5154A1;
}

footer .container {
  padding-top: 90px;
  padding-bottom: 50px;
}

footer a {
  color: #fff;
}

/* FOOTER LOGO COLUMN */
.footer-logo {
  width: auto;
  height: 71px;
}

footer .navbar-brand {
  width: auto;
  height: 80px;
}

.footer__pitch {
  margin: 30px 0;
  font-size: 1.2rem;
}

/* FOOTER CONTENT COLUMN */
.columns3-content__container {
  align-items: flex-end;
}

.footer__column-content:not(:last-child) {
  padding-right: 100px;
}

.footer__column-content {
  font-size: 1.2rem;
}

.footer__column-content div:first-child {
  font-weight: 300;
  color: #E3E3E3;
  margin-bottom: 15px;
}

.footer__column-content div {
  margin-bottom: 9px;
}

/* FOOTER DIVIDER AND BOTTOM ROW */
.footer__divider {
  margin: 60px 15px 50px;
  border-top: 1px solid #E3E3E3;
  opacity: 0.2;
}

.footer__bottom-row {
  font-size: 1.2rem;
  font-weight: 300;
}

.footer__bottom-row a, .footer__bottom-row a:hover {
  color: #fff;
}

.footer__bottom-row a:not(:last-child) {
  margin-right: 15px;
}

.footer__bottom-row span:first-child {
  margin-right: 40px;
}

/* FOOTER ON MOBILE */
@media only screen and (max-width: 991px) {
  footer .container {
    padding-top: 60px;
  }
  .footer__pitch {
    margin: 30px 0 60px;
    text-align: center;
  }
  .columns3-content__container {
    justify-content: center;
    align-items: flex-start;
  }
  .footer__divider {
    margin: 40px 15px;
  }
  .footer__bottom-row div:first-child {
    margin-bottom: 40px;
  }
  .footer__bottom-row div:nth-child(2) {
    margin-bottom: 20px;
  }
  .footer__bottom-row span:first-child {
    margin-right: 49px;
  }
}

@media only screen and (max-width: 500px) {
  .footer__column-content:not(:last-child) {
    padding-right: 40px;
  }
}

@media only screen and (max-width: 400px) {
  .footer__column-content:not(:last-child) {
    padding-right: 25px;
  }
}

@media only screen and (max-width: 359px) {
  .footer__column-content {
    font-size: 0.9rem;
  }
}
</style>
