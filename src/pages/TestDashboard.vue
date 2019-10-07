<template>
  <div class="dashboard-container">
    <div v-if="guild">
      <section class="hero is-primary">
        <div class="hero-body">
          <div class="container">
            <GuildIcon :guild="guild" :tooltip="false" :size="128" class="flex-center" />
            <div class="flex-center has-text-centered">
              <h1 class="title"> {{ guild.name }} </h1>
            </div>
          </div>
        </div>
      </section>
      <b-tabs position="is-centered" size="is-medium" v-model="activeTab">
        <b-tab-item label="Configuration">
          <div class="container dash-flex conf-tab">
            <b-field>
              <b-input v-model="moduleSearch"
                placeholder="Search..."
                type="search"
                icon="magnify">
              </b-input>
            </b-field>
            <div class="conf-cards">
              <div class="columns is-multiline">
                <div v-if="filteredFeatures.length === 0" class="column is-full">
                  <p class="has-text-centered sad-face">Nothing found :(</p>
                </div>
                <div v-for="module in filteredFeatures" :key="module.name" class="column is-half">
                  <div class="card">
                    <header class="card-header">
                      <p class="card-header-title">
                        {{ module.displayName }}
                      </p>
                      <div v-if="module.toggleable" class="card-header-icon" aria-label="toggle">
                        <div class="field">
                          <b-switch @input="value => toggleModule(module.name, value)" v-model="module.active" />
                        </div>
                      </div>
                    </header>
                    <div class="card-content">
                      <div class="content">
                        <div class="cards">
                          <div class="columns">
                            <div class="column">
                              {{ module.description || 'Lorem ipsum dolor sit amet.' }}
                            </div>
                            <div class="column is-narrow conf-column">
                              <b-field>
                                <p class="control">
                                  <button @click="configurationModal(module.name)" class="button is-primary is-fullwidth">
                                    <b-icon icon="settings" />
                                    <span class="is-hidden-desktop">Configure</span>
                                  </button>
                                </p>
                              </b-field>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <b-modal
            v-if="currentModule"
            :active.sync="moduleModalOpen"
            :can-cancel="['escape', 'outside']"
            has-modal-card
            trap-focus>
              <component :guild="guild" :module="currentModule" :saveCallback="save" :is="currentModuleComponent" />
          </b-modal>
        </b-tab-item>
        <b-tab-item label="Statistics">
          <div class="container flex-center">zop</div>
        </b-tab-item>
      </b-tabs>
    </div>
    <b-loading :active="!guild" />
  </div>
</template>

<script>
import GuildIcon from '../components/GuildIcon'

import DashboardLanguageModal from '../components/dashboard/DashboardLanguageModal'
import DashboardPrefixModal from '../components/dashboard/DashboardPrefixModal'

export default {
  name: 'TestDashboard',
  head: { title: { inner: 'Test Dashboard' } },
  components: { GuildIcon, DashboardLanguageModal, DashboardPrefixModal },
  data () {
    return {
      discord: this.$api.state,
      activeTab: 0,
      moduleSearch: '',
      modules: [],
      currentModule: null,
      moduleModalOpen: true
    }
  },
  computed: {
    guild () {
      if (!this.discord.guilds) return
      const guild = this.discord.guilds.find(g => g.id === this.$route.params.id)
      return guild && guild.common && guild.permissions.has('MANAGE_SERVER') ? guild : null
    },
    filteredFeatures () {
      return this.modules
        ? this.modules.filter(m => m.displayName.toLowerCase().indexOf(this.moduleSearch.toLowerCase()) >= 0)
        : []
    },
    currentModuleComponent () {
      return this.currentModule ? `Dashboard${this.currentModule.displayName}Modal` : 'Dashboard'
    }
  },
  methods: {
    toggleModule (name, value) {
      const mod = this.modules && this.modules.find(f => f.name === name)
      if (!mod || !mod.toggleable) return

      mod.active = value
      console.log(`"${mod.displayName}" is ${value ? 'on' : 'off'}`)
      this.saveState(mod)
    },
    configurationModal (name) {
      const mod = this.modules && this.modules.find(f => f.name === name)
      if (!mod) return

      this.currentModule = mod
      this.moduleModalOpen = true
      console.log(`Open "${this.currentModuleComponent}" modal`)
    },
    save () {
      if (!this.currentModule) return
      this.$api.saveModuleValues(this.guild.id, this.currentModule).then(() => {
        this.moduleModalOpen = false
        this.savedToast()
      })
    },
    saveState (mod) {
      if (!mod) return
      this.$api.saveModuleState(this.guild.id, mod).then(() => this.savedToast(mod))
    },
    savedToast (mod = this.currentModule) {
      this.$toast.open({
        message: `${mod.displayName} module saved successfully!`,
        type: 'is-success'
      })
    }
  },
  async mounted () {
    const { modules } = await this.$api.modules(this.$route.params.id)
    console.log(modules)
    this.modules = modules
  }
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.dash-flex {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.flex-center {
  display: flex;
  justify-content: center;
}

.field:not(:last-child) {
  margin-bottom: 1.5rem;
}

.conf-column {
  display: flex;
  flex-direction: column-reverse;
}

.card-header-title {
  min-height: 54px;
}

@media screen and (min-width: 1088px) {
  .button .icon:first-child:not(:last-child) {
    margin-right: calc(-0.375em - 1px) !important;
  }
}

.sad-face {
  font-size: 8vh;
}
</style>

<style>
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
  padding: 1.5rem;
}
</style>
