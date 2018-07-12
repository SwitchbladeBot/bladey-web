<template>
  <nav class="navbar is-transparent is-unselectable" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          SWITCHBLADE
        </router-link>
        <a class="navbar-burger" v-on:click="burger" data-target="navMenu" role="button" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" id="navMenu">
        <div class="navbar-end">
          <div v-if="!!user" class="navbar-item has-dropdown" id="navDropdown">
            <div class="navbar-link is-flex" v-on:click="dropdown" data-target="navDropdown">
              <span class="icon user-pic">
                <img class="round" :src="user.displayAvatarURL" />
              </span>
              <span>{{ user.username }}</span>
            </div>
            <div class="navbar-dropdown is-boxed">
              <router-link to="/dashboard" class="navbar-item">
                <span class="icon">
                  <fai icon="tachometer-alt" />
                </span>
                <span>Dashboard</span>
              </router-link>
              <hr class="navbar-divider">
              <a class="navbar-item" v-on:click="logout">
                <span class="icon">
                  <fai icon="sign-out-alt" />
                </span>
                <span>Logout</span>
              </a>
            </div>
          </div>
          <a v-else class="navbar-item" v-on:click="login">
            <div v-if="loading">
              <span class="icon">
                <fai icon="spinner" spin />
              </span>
              <span>Logging in...</span>
            </div>
            <div v-else>
              <span class="icon">
                <fai icon="sign-in-alt" />
              </span>
              <span>Login</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Discord from '../oauth/Discord'

export default {
  name: 'navbar',
  created () {
    this.configureOAuth()
  },
  destroyed () {
    this.oauth.removeAllListeners()
  },
  mounted () {
    Object.defineProperty(window, '__onLogin__', {
      value: this.onLogin.bind(this),
      writable: false,
      enumerable: true,
      configurable: true
    })
  },
  data () {
    return {
      loading: true,
      user: null
    }
  },
  methods: {
    burger (event) {
      const $burger = event.target.closest('.navbar-burger')
      const $target = document.getElementById($burger.dataset.target)
      $burger.classList.toggle('is-active')
      $target.classList.toggle('is-active')
    },
    dropdown (event) {
      const $dropdown = event.target.closest('.navbar-link')
      const $target = document.getElementById($dropdown.dataset.target)
      $target.classList.toggle('is-active')
    },

    onLogin (token) {
      this.loading = true
      this.oauth.login(token)
    },
    login () {
      if (this.loading) return
      const AUTHORIZE_ENDPOINT = 'https://discordapp.com/oauth2/authorize'
      const EXTRA_OPTIONS = '&response_type=token&scope=guilds%20identify'
      const OAUTH_URL = `${AUTHORIZE_ENDPOINT}?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}${EXTRA_OPTIONS}`
      window.open(OAUTH_URL, '_blank', 'directories=0,titlebar=0,toolbar=0,location=false,status=0,menubar=0,scrollbars=no,resizable=no,height=570,width=500')
    },
    logout () {
      this.loading = true
      this.oauth.logout()
    },

    configureOAuth () {
      this.oauth = new Discord()
      this.oauth.on('login', (p) => { this.user = p; this.loading = false })
      this.oauth.on('loginError', this.resetProps)
      this.oauth.on('logout', () => {
        this.$localStorage.remove('accessToken')
        this.$router.push('/')
        this.resetProps()
      })
      this.oauth.on('token', (token) => {
        this.$localStorage.set('accessToken', token)
      })
      this.oauth.updateStatus(this.$localStorage.get('accessToken'))
    },
    resetProps () {
      this.user = null
      this.loading = false
    }
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,600,900,900i');

  .navbar-brand > .navbar-item, .navbar-burger {
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    font-style: italic;
    color: white;
  }

  .navbar-brand > .navbar-item:hover, .navbar-burger:hover {
    color: white;
  }

  .user-pic {
    margin-right: 0.6rem;
  }

  .round {
    border-radius: 100%;
  }
</style>
