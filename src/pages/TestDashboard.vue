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
              <b-input v-model="featureSearch"
                placeholder="Search..."
                type="search"
                icon="magnify">
              </b-input>
            </b-field>
            <div class="conf-cards">
              <div class="columns is-multiline">
                <div v-for="feature in filteredFeatures" v-bind:key="feature.key" class="column is-half">
                  <div class="card">
                    <header class="card-header">
                      <p class="card-header-title">
                        {{ feature.displayName }}
                      </p>
                      <div v-if="feature.toggleable" class="card-header-icon" aria-label="toggle">
                        <div class="field">
                          <b-switch @input="value => toggleFeature(feature.key, value)" v-model="feature.toggled" />
                        </div>
                      </div>
                    </header>
                    <div class="card-content">
                      <div class="content">
                        <div class="cards">
                          <div class="columns">
                            <div class="column">
                              {{ feature.description }}
                            </div>
                            <div v-if="feature.configurable" class="column is-narrow conf-column">
                              <b-field>
                                <p class="control">
                                  <button @click="configurationModal(feature.key)" class="button is-primary is-fullwidth">
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

export default {
  name: 'TestDashboard',
  head: { title: { inner: 'Test Dashboard' } },
  components: { GuildIcon },
  data () {
    return {
      discord: this.$api.state,
      activeTab: 0,
      featureSearch: '',
      features: [{
        key: 'prefix',
        displayName: 'Prefix',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        configurable: true
      }, {
        key: 'joinlock',
        displayName: 'Join lock',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        configurable: true,
        toggleable: true,
        toggled: true
      }, {
        key: 'language',
        displayName: 'Language',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        configurable: true
      }]
    }
  },
  computed: {
    guild () {
      if (!this.discord.guilds) return
      const guild = this.discord.guilds.find(g => g.id === this.$route.params.id)
      return guild && guild.common && guild.permissions.has('MANAGE_SERVER') ? guild : null
    },
    filteredFeatures () {
      return this.features
        ? this.features.filter(f => f.displayName.toLowerCase().indexOf(this.featureSearch.toLowerCase()) >= 0)
        : []
    }
  },
  methods: {
    toggleFeature (key, value) {
      const feature = this.features && this.features.find(f => f.key === key)
      if (!feature || !feature.toggleable) return

      feature.toggled = value
      console.log(`"${feature.displayName}" is ${value ? 'on' : 'off'}`)
    },
    configurationModal (key) {
      const feature = this.features && this.features.find(f => f.key === key)
      if (!feature) return

      console.log(`Open "${feature.displayName}" modal`)
    }
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
