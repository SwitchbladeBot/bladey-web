<template>
  <div>
    <ServerHero v-if="guild" :guild="guild" :user="user"/>
    <b-loading :active="isLoading"></b-loading>
  </div>
</template>

<script>
import Discord from '../oauth/Discord'
import ServerHero from '../components/ServerHero.vue'

export default {
  name: 'Dashboard',
  metaInfo: {
    title: 'Dashboard'
  },
  components: { ServerHero },
  data () {
    return {
      id: this.$route.params.id,
      guild: null,
      user: null,
      isLoading: true
    }
  },
  beforeCreate: function () {
    if (!this.$localStorage.get('accessToken')) {
      this.$router.push('/')
    }
  },
  created () {
    this.configureOAuth()
  },
  methods: {
    configureOAuth () {
      this.oauth = new Discord()
      this.oauth.on('login', p => {
        this.user = p
        this.oauth.guilds().then(gs => {
          this.isLoading = false
          this.guild = gs.find(g => g.id === this.id)
          if (!this.guild) this.$router.push('/dashboard')
        })
      })
      this.oauth.updateStatus(this.$localStorage.get('accessToken'))
    }
  }
}
</script>

<style scoped>

</style>
