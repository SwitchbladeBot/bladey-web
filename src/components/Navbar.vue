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
        <div class="navbar-item has-dropdown" id="navDropdown">
          <a class="navbar-link" v-on:click="dropdown" data-target="navDropdown">
            <span class="icon user-pic">
              <img class="round" src="https://cdn.discordapp.com/avatars/135152303773712384/38ea62493b1b22541426b99d835b87ba.png?size=2048" />
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
            <a class="navbar-item">
              <span class="icon">
                <fai icon="sign-out-alt" />
              </span>
              <span>Logout</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  methods: {
    burger: function (event) {
      const $burger = event.target
      const $target = document.getElementById($burger.dataset.target)
      $burger.classList.toggle('is-active')
      $target.classList.toggle('is-active')
    },
    dropdown: function (event) {
      const $dropdown = event.target
      const $target = document.getElementById($dropdown.dataset.target)
      $target.classList.toggle('is-active')
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
