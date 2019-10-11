<template>
  <section class="section">
    <div class="container has-text-centered">
      <h1 class="title is-spaced">Servers</h1>
      <div class="columns is-multiline is-centered">
        <div class="column is-2 has-text-centered" v-for="guild in guilds" v-bind:key="guild.id">
          <router-link :to="`/dashboard/${guild.id}`">
            <GuildIcon :guild="guild" />
          </router-link>
        </div>
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
        ? this.discord.guilds.filter(guild => guild.common && guild.permissions.has('MANAGE_GUILD'))
        : null
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
</style>
