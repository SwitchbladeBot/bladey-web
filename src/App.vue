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
    this.$discord.on('login', () => {
      this.$localStorage.set('accessToken', this.$discord.accessToken)
      this.$discord.fetchGuilds().then(() => this.$discord.state.$emit('login')).catch(console.error)
    })
    this.$discord.on('logout', () => {
      this.$localStorage.remove('accessToken')
      if (this.$route.meta.requiresAuth) {
        this.$router.push('/')
      }
    })

    const token = this.$localStorage.get('accessToken')
    if (token) {
      this.$discord.login(token).catch(e => this.$localStorage.remove('accessToken'))
    }
  },
  destroyed () {
    this.$discord.removeAllListeners()
  }
}
</script>

<style lang="scss">
  @import "assets/main";

  html {
    overflow: auto;
  }
</style>
