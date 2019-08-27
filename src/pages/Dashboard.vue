<template>
  <div class="dashboard-container">
    <div v-if="guild">
      <ServerHero :guild="guild" />
      <div class="section container">
        <div class="columns">
          <div class="column">
            <aside class="menu">
              <p class="menu-label">
                Dashboard
              </p>
              <ul class="menu-list">
                <li v-for="cat in categories" v-bind:key="cat" v-on:click="currentCat = cat">
                  <a v-bind:class="[{ 'is-active': currentCat === cat }]">{{ cat }}</a>
                </li>
              </ul>
            </aside>
          </div>
          <div class="column is-full">
            <h1 class="title is-spaced">{{ currentCat }}</h1>
            <component :guild="guild" v-bind:is="currentCategoryComponent" />
          </div>
        </div>
      </div>
    </div>
    <b-loading :active="!guild" />
  </div>
</template>

<script>
import ServerHero from '../components/ServerHero.vue'
import DashboardGeneral from '../components/dashboard/DashboardGeneral'
import DashboardModeration from '../components/dashboard/DashboardModeration'

export default {
  name: 'Dashboard',
  head: { title: { inner: 'Dashboard' } },
  components: { DashboardGeneral, DashboardModeration, ServerHero },
  data () {
    return {
      discord: this.$api.state,
      categories: [ 'General', 'Moderation' ],
      currentCat: 'General'
    }
  },
  computed: {
    guild () {
      if (!this.discord.guilds) return
      const guild = this.discord.guilds.find(g => g.id === this.$route.params.id)
      return guild && guild.common && guild.permissions.has('MANAGE_SERVER') ? guild : null
    },
    currentCategoryComponent () { return `Dashboard${this.currentCat}` }
  }
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
