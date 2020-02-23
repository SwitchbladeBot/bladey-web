<template>
  <div>
    <div class="container dash-flex">
      <b-field grouped>
        <b-input expanded
          v-model="moduleSearch"
          placeholder="Search..."
          type="search"
          icon="magnify">
        </b-input>
        <b-button type="is-primary" icon-right="refresh" @click="reloadModules()" />
      </b-field>
      <div class="conf-cards">
        <div class="columns is-multiline">
          <div v-if="filteredFeatures.length === 0" class="column is-full">
            <p class="has-text-centered sad-face">Nothing found :(</p>
          </div>
          <div v-for="mod in filteredFeatures" :key="mod.name" class="column is-half">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  {{ mod.displayName }}
                </p>
                <div v-if="mod.toggleable" class="card-header-icon" aria-label="toggle">
                  <b-field>
                    <b-switch @input="value => toggleModule(mod, value)" v-model="mod.active" />
                  </b-field>
                </div>
              </header>
              <div class="card-content">
                <div class="content">
                  <div class="cards">
                    <div class="columns">
                      <div class="column">
                        {{ mod.description || 'No description available.' }}
                      </div>
                      <div class="column is-narrow conf-column">
                        <b-field>
                          <p class="control">
                            <button @click="moduleModal(mod)" class="button is-primary is-fullwidth">
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
              <b-loading :active="loadingModules.includes(mod.name)" :is-full-page="false" />
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
    <b-loading :active="!modules.length" />
  </div>
</template>

<script>
import _ from 'lodash'
import DashboardModals from './modules'

export default {
  name: 'DashboardModules',
  props: [ 'guild' ],
  components: { ...DashboardModals },
  data () {
    return {
      discord: this.$api.state,
      moduleSearch: '',
      modules: [],
      loadingModules: [],
      currentModule: null,
      moduleModalOpen: true
    }
  },
  computed: {
    filteredFeatures () {
      const search = this.moduleSearch.toLowerCase()
      return this.modules
        ? this.modules.filter(m => m.displayName.toLowerCase().indexOf(search) >= 0 || m.name.toLowerCase().indexOf(search) >= 0)
        : []
    },
    currentModuleComponent () {
      return this.currentModule ? `Dashboard${_.upperFirst(this.currentModule.name)}Modal` : 'DashboardInvalidModal'
    }
  },
  methods: {
    // Reload list
    reloadModules () {
      this.modules = []
      this.updateModules()
    },

    // Loading
    toggleModuleLoading (mod, on = true) {
      if (on) {
        if (!this.loadingModules.includes(mod.name)) this.loadingModules.push(mod.name)
        return
      }

      this.loadingModules.splice(this.loadingModules.indexOf(mod.name), 1)
    },

    // Toggling
    toggleModule (mod, value) {
      this.toggleModuleLoading(mod, true)
      mod.active = value
      console.log(`"${mod.displayName}" is ${value ? 'on' : 'off'}`)
      this.saveState(mod, value)
    },

    // Modal
    moduleModal (mod) {
      this.currentModule = mod
      this.moduleModalOpen = true
      console.log(`Open "${this.currentModuleComponent}" modal`)
    },

    // Toasts
    successSaveToast (mod) {
      this.$toast.open({
        message: `${mod.displayName} module saved successfully!`,
        type: 'is-success'
      })
    },
    successToggleToast (mod, state) {
      this.$toast.open({
        message: `${mod.displayName} module toggled ${state ? 'on' : 'off'} successfully!`,
        type: 'is-success'
      })
    },
    errorToast (e) {
      console.error(e)
      this.$toast.open({
        message: 'An error occured!',
        type: 'is-danger'
      })
    },

    // Requests
    async updateModules () {
      if (!this.guild) return
      const { modules } = await this.$api.modules(this.guild.id)
      this.modules = modules
    },
    save (mod, values, justToast = false) {
      if (!mod) return
      if (justToast) return this.successSaveToast(mod)

      this.$api.saveModuleValues(this.guild.id, mod.name, values).then(() => {
        this.moduleModalOpen = false
        mod.values = values
        this.successSaveToast(mod)
      }).catch(e => this.errorToast(e))
    },
    saveState (mod, state) {
      if (!mod) return
      this.$api.saveModuleState(this.guild.id, mod.name, state)
        .then(() => {
          this.toggleModuleLoading(mod, false)
          this.successToggleToast(mod, state)
        })
        .catch((e) => this.errorToast(e))
    }
  },
  watch: {
    discord: {
      deep: true,
      handler () {
        if (this.modules.length) return
        this.updateModules()
      }
    }
  },
  mounted () {
    this.updateModules()
  }
}
</script>

<style scoped>
.dash-flex {
  display: flex;
  justify-content: center;
  flex-direction: column;
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

.conf-cards .card-header-title {
  padding-left: 1.5rem;
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
