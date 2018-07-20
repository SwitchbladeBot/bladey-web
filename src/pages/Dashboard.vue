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
  head: {
    title: { inner: 'Dashboard' }
  },
  components: { ServerHero },
  data () {
    return {
      guild: null
    }
  },
  methods: {
    onLogin () {
      this.guild = this.$discord.guilds.find(g => g.id === this.$route.params.id)
      if (!this.guild.permissions.has('MANAGE_SERVER')) {
        this.$router.push('/dashboard')
      }
    }
  }
}
</script>
