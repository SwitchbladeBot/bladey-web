<template>
  <div class="fill-flex dashboard-container">
    <div class="fill-flex" v-if="guild">
      <section class="hero is-primary">
        <div class="hero-body header-body">
          <div class="container">
            <GuildIcon :guild="guild" :tooltip="false" :size="128" class="flex-center" />
            <div class="flex-center has-text-centered">
              <h1 class="title"> {{ guild.name }} </h1>
              <span>
                <b-button
                  rounded
                  size="is-small"
                  type="is-dark"
                  tag="router-link"
                  to="/dashboard">
                    Change server
                </b-button>
              </span>
            </div>
          </div>
        </div>
      </section>
      <b-tabs
        class="fill-flex"
        position="is-centered"
        size="is-medium"
        v-model="activeTab">
          <b-tab-item class="fill-flex" label="Modules">
            <DashboardModules :guild="guild" />
          </b-tab-item>
          <b-tab-item class="fill-flex" label="Statistics">
            <DashboardStats :guild="guild" />
          </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import GuildIcon from '../components/GuildIcon'

import DashboardModules from '../components/dashboard/DashboardModules'
import DashboardStats from '../components/dashboard/DashboardStats'

export default {
  name: 'Dashboard',
  head: { title: { inner: 'Dashboard' } },
  components: { GuildIcon, DashboardModules, DashboardStats },
  data () {
    return {
      discord: this.$api.state,
      activeTab: 0
    }
  },
  computed: {
    guild () {
      if (!this.discord.guilds) return
      const guild = this.discord.guilds.find(g => g.id === this.$route.params.id)
      return guild && guild.common && guild.permissions.has('MANAGE_SERVER') ? guild : null
    }
  }
}
</script>

<style scoped>
.header-body {
  padding-bottom: 1.5rem;
}

.fill-flex {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.flex-center {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>

<style>
.modal .animation-content .modal-card {
  overflow: visible !important;
}

.modal-card-body {
  overflow: visible !important;
}

.dashboard-container .tab-content {
  flex: 1;
}

.dashboard-container .b-tabs .tabs {
  background-color: #7289DA !important;
}
.dashboard-container .tabs ul,
.dashboard-container .tabs li a {
  border-bottom-color: #7289DA;
}

.dashboard-container .tabs li.is-active a {
  border-bottom-color: white;
}
.dashboard-container .tabs li.is-active a,
.dashboard-container .tabs a:hover {
  color: white;
}

.dashboard-container .tab-content {
  padding: 1.5rem !important;
}
</style>
