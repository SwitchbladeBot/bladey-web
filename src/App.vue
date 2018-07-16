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
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { property: 'og:title', content: 'Switchblade' },
      { property: 'og:url', content: 'https://switchblade.xyz'},
      { property: 'og:description', content: 'Multi purpose Discord Bot made using discord.js, focused on quality, organization and enjoyability.'},
      { property: 'og:image', content: 'https://i.imgur.com/bBVHhWT.png'}
    ]
  },

  created () {
    this.$discord.on('login', () => {
      this.$localStorage.set('accessToken', this.$discord.accessToken)
      this.$discord.fetchGuilds().then(() => this.$discord.state.$emit('login')).catch(console.error)
    })
    this.$discord.on('logout', () => {
      this.$localStorage.remove('accessToken')
      this.$router.push('/')
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
