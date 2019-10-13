<template>
  <div class="dash-flex">
    <nav class="level" v-if="guildStats">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Members</p>
          <p class="title">{{ format(guildStats.totalMembers) }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Users</p>
          <p class="title">{{ format(guildStats.userMembers) }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Bots</p>
          <p class="title">{{ format(guildStats.botMembers) }}</p>
        </div>
      </div>
    </nav>
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
    },
    format (nmb) {
      return new Intl.NumberFormat().format(nmb)
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
