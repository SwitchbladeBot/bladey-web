<template>
  <nav class="navbar ">
    <div class="navbar-brand">
      <a class="navbar-item wave" href="#">
        SWITCHBLADE
      </a>

      <a class="navbar-item is-hidden-desktop" href="https://github.com/jgthms/bulma" target="_blank">
        <span class="icon" style="color: #333;">
          <i class="fa fa-github"></i>
        </span>
      </a>

      <a class="navbar-item is-hidden-desktop" href="https://twitter.com/jgthms" target="_blank">
        <span class="icon" style="color: #55acee;">
          <i class="fa fa-twitter"></i>
        </span>
      </a>

      <div class="navbar-burger burger" data-target="navMenubd-example">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:900i,400');

  .navbar-brand {
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    font-style: italic;
    color: white;
  }
  .navbar-brand a:hover {
    color: white;
  }
</style>
