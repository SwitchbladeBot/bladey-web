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
          <a class="navbar-item" href="https://github.com/switchbladebot/" target="_blank">
            <b-icon icon="github-circle" custom-size="mdi-18px" class="is-hidden-desktop" />
            <span>GitHub</span>
          </a>
        </div>
        <div class="navbar-end">
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () { return { discord: this.$discord.state } },
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

    login () { this.$discord.loginPopup() },
    logout () { this.$discord.logout() }
  }
}
</script>

<style scoped>
.navbar-brand > .navbar-item,
.navbar-burger {
  font-weight: 900;
  font-style: italic;
  color: white;
}

.navbar-brand > .navbar-item:hover,
.navbar-burger:hover {
  color: white;
}

.navbar-link,
a.navbar-item {
  -webkit-transition: 0.25s color ease-out;
  -moz-transition: 0.25s color ease-out;
  transition: 0.25s color ease-out;
}

.user-pic {
  margin-right: 0.6rem;
}

.loading-spinner {
  -webkit-animation: spin 1s linear infinite;
  -moz-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
}
@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
