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
          <div v-if="!!discord.user" class="navbar-item has-dropdown" id="navDropdown">
            <div class="navbar-link is-flex" v-on:click="dropdown" data-target="navDropdown">
              <span class="icon user-pic">
                <img class="round" :src="discord.user.displayAvatarURL" />
              </span>
              <span>{{ discord.user.username }}</span>
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
          <a v-else class="navbar-item is-flex" v-on:click="login">
            <template v-if="discord.logging">
              <span class="icon">
                <fai icon="spinner" spin />
              </span>
              <span>Logging in...</span>
            </template>
            <template v-else>
              <span class="icon">
                <fai icon="sign-in-alt" />
              </span>
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
      const $target = document.getElementById($burger.dataset.target)
      $burger.classList.toggle('is-active')
      $target.classList.toggle('is-active')
    },
    dropdown (event) {
      const $dropdown = event.target.closest('.navbar-link')
      const $target = document.getElementById($dropdown.dataset.target)
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
</style>
