<template>
  <section class="section">
    <div class="container has-text-centered">
      <h1 class="title is-spaced">Servers</h1>
      <div class="columns is-multiline is-centered">
        <div
          v-for="guild in guilds"
          :key="guild.id"
          class="column is-2 has-text-centered">
            <router-link v-if="guild.common" :to="`/dashboard/${guild.id}`">
              <GuildIcon :guild="guild" />
            </router-link>
            <a v-else class="not-common-guild" @click="openInvite(guild)">
              <GuildIcon :guild="guild" />
            </a>
        </div>
        <span v-if="guilds.length === 0" class="error">
          Couldn't find any manageable server :(
        </span>
      </div>
    </div>
    <b-loading :active="!guilds" />
  </section>
</template>

<script>
import GuildIcon from '../components/GuildIcon'

export default {
  name: 'ServerSelector',
  head: { title: { inner: 'Select a server' } },
  components: { GuildIcon },
  data () { return { discord: this.$api.state } },
  computed: {
    guilds () {
      return this.discord.guilds
        ? this.discord.guilds.filter(guild => guild.permissions.has('MANAGE_GUILD'))
        : []
    }
  },
  methods: {
    openInvite (guild) {
      return this.$api.openInvite(guild)
    }
  }
}
</script>

<style scoped>
.title {
  font-weight: 900;
  font-style: italic;
  font-size: 50px;
}

.error {
  font-size: 35px;
}
</style>

<style>
.not-common-guild .image img {
  filter: grayscale(1);
}
</style>
