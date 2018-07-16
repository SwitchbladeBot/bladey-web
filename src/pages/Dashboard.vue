<template>
  <div>
    <ServerHero v-if="guild" :guild="guild" />
    <b-loading :active="!guild" />
  </div>
</template>

<script>
import ServerHero from '../components/ServerHero.vue'

export default {
  name: 'Dashboard',
  metaInfo: {
    title: 'Dashboard'
  },
  components: { ServerHero },
  data () {
    return {
      guild: null
    }
  },
  methods: {
    onFailed () {
      this.$router.push('/')
    },
    onLogin () {
      console.log(this.$router)
      this.guild = this.$discord.guilds.find(g => g.id === this.$route.params.id)
    }
  }
}
</script>
