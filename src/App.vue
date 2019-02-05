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
  head: {
    link: [
      { r: 'shortcut icon', t: 'image/png', h: '/static/favicon.png' }
    ],
    meta: [
      { ch: 'utf-8' },
      { n: 'viewport', c: 'width=device-width, initial-scale=1' }
    ]
  },

  created () {
    const token = this.$localStorage.get('token')
    if (token) {
      this.$api.loginWithToken(token).catch(e => {
        console.error(e)
        this.$api.logout()
        this.$localStorage.remove('token')
      })
    }
  }
}
</script>

<style lang="scss">
  @import "assets/main";

  html {
    overflow: auto;
  }
</style>
