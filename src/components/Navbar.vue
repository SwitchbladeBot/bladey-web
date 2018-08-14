<template>
  <nav class="navbar is-transparent is-unselectable" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          SWITCHBLADE
        </router-link>
        <a class="navbar-burger" v-on:click="burger" role="button" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" ref="navMenu">
        <div class="navbar-start">
          <router-link to="/contributors" class="navbar-item">
            <b-icon icon="account-group" custom-size="mdi-18px" class="is-hidden-desktop" />
            <span>Contributors</span>
          </router-link>
          <a class="navbar-item" href="https://github.com/switchbladebot/" target="_blank">
            <span>GitHub</span>
          </a>
        </div>
        <div class="navbar-end">
          <div v-if="!!discord.user" class="navbar-item has-dropdown" ref="navDropdown">
            <div class="navbar-link is-flex" v-on:click="dropdown">
              <figure class="image is-24x24 user-pic">
                <img class="round" :src="discord.user.displayAvatarURL" />
              </figure>
              <span>{{ discord.user.username }}</span>
            </div>
            <div class="navbar-dropdown is-boxed">
              <router-link to="/dashboard" class="navbar-item">
                <b-icon icon="view-dashboard" custom-size="mdi-18px" />
                <span>Dashboard</span>
              </router-link>
              <hr class="navbar-divider">
              <a class="navbar-item" v-on:click="logout">
                <b-icon icon="logout-variant" custom-size="mdi-18px" />
                <span>Logout</span>
              </a>
            </div>
          </div>
          <a v-else class="navbar-item" v-on:click="login">
            <template v-if="discord.logging">
              <b-icon icon="loading" custom-size="mdi-18px" class="loading-spinner" />
              <span>Logging in...</span>
            </template>
            <template v-else>
              <b-icon icon="login-variant" custom-size="mdi-18px" />
              <span>Login</span>
            </template>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      discord: this.$discord.state
    }
  },
  methods: {
    burger (event) {
      const $burger = event.target.closest('.navbar-burger')
      const $target = this.$refs.navMenu
      $burger.classList.toggle('is-active')
      $target.classList.toggle('is-active')
    },
    dropdown () {
      const $target = this.$refs.navDropdown
      $target.classList.toggle('is-active')
    },

    login () {
      this.$discord.loginPopup(process.env.CLIENT_ID, process.env.REDIRECT_URI)
    },
    logout () {
      this.$discord.logout()
    }
  }
}
</script>

<style scoped>
.navbar-brand > .navbar-item, .navbar-burger {
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

.loading-spinner {
  -webkit-animation: spin 1s linear infinite;
  -moz-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
}
@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
</style>
