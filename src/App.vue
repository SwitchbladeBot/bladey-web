<template>
  <div id="app">
    <section class="hero is-fullheight">
      <section class="hero-head">
        <Navbar/>
      </section>
      <router-view/>
      <section class="hero-foot">
        <Footer/>
      </section>
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
</style>
