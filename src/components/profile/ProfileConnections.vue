<template>
  <div>
    <section v-if="loaded">
      <div class="connections">
        <div class="columns" v-for="connection in connections" :key="connection">
          <div class="column is-half">
            <component :is="getConnectionComponent(connection.name)" :data="connection" />
          </div>
        <!--{{ getConnectionComponent(connection.name) }}-->
        </div>
      </div>
    </section>
    <b-loading :active="!loaded" />
  </div>
</template>

<script>
import LastfmConnection from './connections/LastfmConnection'
export default {
  name: 'ProfileConnections',
  components: { LastfmConnection },
  data: () => ({
    loaded: false,
    connections: null
  }),
  async mounted () {
    this.updateConnections()
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
      console.log(connection.charAt(0).toUpperCase() + connection.slice(1) + 'Connection')
      return connection.charAt(0).toUpperCase() + connection.slice(1) + 'Connection'
    },
    update (success) {
      console.log('updated: ', success)
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
