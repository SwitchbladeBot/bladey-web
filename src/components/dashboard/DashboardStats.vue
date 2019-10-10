<template>
  <div class="container dash-flex">
    <span v-if="guildStats" class="bigbig">Members: {{ guildStats.memberCount }}</span>
    <b-loading :active="!guildStats" />
  </div>
</template>

<script>

export default {
  name: 'DashboardStats',
  props: [ 'guild' ],
  data () {
    return {
      discord: this.$api.state,
      guildStats: null
    }
  },
  methods: {
    async updateStats () {
      if (!this.guild) return
      this.guildStats = await this.$api.members(this.guild.id)
    }
  },
  watch: {
    discord: {
      deep: true,
      handler () {
        if (this.modules.length) return
        this.updateStats()
      }
    }
  },
  mounted () {
    this.updateStats()
  }
}
</script>

<style scoped>
.dash-flex {
  justify-content: center;
  flex-direction: column;
  text-align: center;
}

.bigbig {
  font-size: 8vh;
}
</style>
