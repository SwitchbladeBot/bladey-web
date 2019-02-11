<template>
  <div id="app">
    <section class="main-container">
      <Navbar/>
      <router-view/>
      <Footer/>
    </section>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: { Navbar, Footer },
  head: {
    link: [
      { r: 'shortcut icon', t: 'image/png', h: '/static/favicon.png' }
    ],
    meta: [
      { ch: 'utf-8' },
      { n: 'viewport', c: 'width=device-width, initial-scale=1' }
    ]
  }
}
</script>

<style lang="scss">
  @import "assets/main";
  @import "vue-swatches/dist/vue-swatches.min.css";

  html {
    overflow: auto;
  }

  .main-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
