<template>
  <nav class="navbar is-transparent is-unselectable" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
        SWITCHBLADE
      </a>
      <a class="navbar-burger" v-on:click="burger" data-target="navMenu" role="button" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" id="navMenu">
      <div class="navbar-end">
        <div v-if="logged" class="navbar-item has-dropdown" id="navDropdown">
          <a class="navbar-link" v-on:click="dropdown" data-target="navDropdown">
            <span class="icon user-pic">
              <img class="round" :src="avatarUrl" />
            </span>
            <span>davipatury</span>
          </a>
          <div class="navbar-dropdown is-boxed">
            <a class="navbar-item">
              <span class="icon">
                <fai icon="tachometer-alt" />
              </span>
              <span>Dashboard</span>
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item" v-on:click="logout">
              <span class="icon">
                <fai icon="sign-out-alt" />
              </span>
              <span>Logout</span>
            </a>
          </div>
        </div>
        <a v-else class="navbar-item" :href="oauthUrl">
          <span class="icon">
            <fai icon="sign-in-alt" />
          </span>
          <span>Login</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    const logged = this.$session.exists()
    return {
      logged,
      avatarUrl: 'https://cdn.discordapp.com/avatars/135152303773712384/38ea62493b1b22541426b99d835b87ba.png?size=2048',
      oauthUrl: 'https://discordapp.com/oauth2/authorize?client_id=346014632395407362&redirect_uri=http://localhost:8080/loginCallback&response_type=token&scope=guilds%20identify'
    }
  },
  methods: {
    burger (event) {
      const $burger = event.target
      const $target = document.getElementById($burger.dataset.target)
      $burger.classList.toggle('is-active')
      $target.classList.toggle('is-active')
    },
    dropdown (event) {
      const $dropdown = event.target
      const $target = document.getElementById($dropdown.dataset.target)
      $target.classList.toggle('is-active')
    },

    logout () {
      this.$session.destroy()
      this.logged = false
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
    margin-right: 0.5rem;
  }

  .round {
    border-radius: 100%;
  }
</style>
