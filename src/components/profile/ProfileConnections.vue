<template>
  <div>
    <section v-if="loaded">
      <div class="connections">
        <component v-for="connection in connections" v-bind:key="connection" v-bind:is="getConnectionComponent(connection.name)" v-bind:data="connection" />
        <!--{{ getConnectionComponent(connection.name) }}-->
      </div>
    </section>
    <b-loading :active="!loaded" />
  </div>
</template>

<script>
import LastfmConnection from './connections/LastfmConnection'
import SpotifyConnection from './connections/SpotifyConnection'
export default {
  name: 'ProfileConnections',
  components: { LastfmConnection, SpotifyConnection },
  data: () => ({
    loaded: false,
    connections: null
  }),
  async mounted () {
    this.updateConnections()
  },
  methods: {
    openConnectWindow (service) {
      this.$api.openConnectionPopup(service)
    },
    async updateConnections () {
      this.$api.connections().then(connections => {
        this.connections = connections
      })
        .catch(e => this.errorToast())
        .finally(() => {
          this.loaded = true
        })
    },
    getConnectionComponent (connection) {
      console.log(connection.charAt(0).toUpperCase() + connection.slice(1) + 'Connection')
      return connection.charAt(0).toUpperCase() + connection.slice(1) + 'Connection'
    },
    update (success) {
      console.log('updated: ', success)
    }
  }
}
</script>

<style scoped>

</style>
