<template>
  <div>
    <section v-if="loaded">
      <div class="connections">
        <div class="columns" v-for="connection in connections" :key="connection.name">
          <div class="column is-four-fifths">
            <component :is="getConnectionComponent(connection.name)" :data="connection"/>
          </div>
        </div>
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
    this.createListener()
  },
  methods: {
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
      return connection.charAt(0).toUpperCase() + connection.slice(1) + 'Connection'
    },
    openConnectWindow ({ name }) {
      this.$api.openConnectionPopup(name)
    },
    createListener () {
      window.addEventListener('message', ({ data }) => {
        if (data.event === 'update') {
          if (data.success) {
            this.loaded = false
            this.updateConnections()
          } else {
            this.errorToast()
            console.error(data)
          }
        }
      }, false)
    },
    errorToast () {
      this.$toast.open({
        message: 'An error occured!',
        type: 'is-danger'
      })
    }
  }
}
</script>

<style scoped>

</style>
