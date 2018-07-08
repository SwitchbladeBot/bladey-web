<template>
  <div id="app">
    <Navbar/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {Navbar}
}
</script>

<style lang="scss">
  @import "assets/_custom.scss";
  @import "~bootstrap/scss/bootstrap.scss";

  body {
    background-color: #23272A;
  }
</style>
