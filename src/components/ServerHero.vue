<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container is-flex">
        <GuildIcon :guild="guild" :tooltip="false" :size="128" />
        <div class="container text-container">
          <h1 class="title">
            {{ guild.name }}
          </h1>
          <router-link to="/dashboard" class="button is-small is-dark is-rounded">
            Change servers
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import GuildIcon from './GuildIcon'

export default {
  props: {
    guild: Object
  },
  components: { GuildIcon }
}
</script>

<style scoped>
.guild-icon {
  max-width: 128px;
  margin-right: 2rem;
}
</style>
