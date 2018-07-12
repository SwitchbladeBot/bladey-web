<template>
  <div id="app">
    <Navbar/>
    <section class="hero is-fullheight">
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
  metaInfo: {
    title: 'Homepage',
    titleTemplate: '%s - Switchblade',
    link: [
      { rel: 'shortcut icon', type: 'image/png', href: '/static/favicon.png' }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  }
}
</script>

<style lang="scss">
  @import "assets/main";

  html {
    overflow: auto;
  }

  app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  .page {
    flex: 1;
  }
</style>
