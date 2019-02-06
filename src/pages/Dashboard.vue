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
  head: { title: { inner: 'Dashboard' } },
  components: { ServerHero },
  data () { return { discord: this.$api.state } },
  computed: {
    guild () {
      if (!this.discord.guilds) return
      const guild = this.discord.guilds.find(g => g.id === this.$route.params.id)
      if (!guild || !guild.permissions.has('MANAGE_SERVER')) return
      return guild
    }
  }
}
</script>
