<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: { Navbar },
  metaInfo: {
    title: 'Homepage',
    titleTemplate: '%s - Switchblade',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  }
}
</script>

<style lang="scss">
  @import "assets/main";

</style>
