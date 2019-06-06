<template>
  <div>
    <section v-if="loaded">
      <div class="connections">
        <div class="column is-four-fifths" v-for="connection in connections" :key="connection.name">
          <div class="">
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
export default {
  name: 'ProfileConnections',
  components: { LastfmConnection },
  data: () => ({
    loaded: false,
    connections: null,
    snackbar: false
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
        .catch(() => this.errorToast())
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
    disconnect ({ name, displayName }) {
      this.$dialog.confirm({
        title: 'Disconnecting account',
        message: `Are you sure you want disconnect your <b>${displayName}</b> account? This action cannot be undone.`,
        confirmText: 'Disconnect account',
        type: 'is-danger is-outlined',
        onConfirm: () => this.disconnectAccount({ name, displayName })
      })
    },
    async disconnectAccount ({ name, displayName }) {
      await this.$api.removeConnection(name)
        .then(() => this.$toast.open({
          message: `Your ${displayName} account was successfully disconnected`,
          type: 'is-success'
        }))
        .catch(() => this.errorToast())
      this.loaded = false
      this.updateConnections()
    },
    createListener () {
      window.addEventListener('message', ({ data }) => {
        if (data.event === 'update') {
          if (data.success) {
            this.loaded = false
            this.updateConnections()
          } else {
            this.errorToast()
          }
        }
      }, false)
    },
    saveSnackbar () {
      if (this.snackbar) return
      this.snackbar = true
      this.$snackbar.open({
        message: 'You have unsaved changes!',
        position: 'is-top',
        actionText: 'Save',
        indefinite: true,
        onAction: () => this.save()
      })
    },
    save () {
      const { connections } = this
      let success = []
      connections.forEach(async ({ name, configuration }) => {
        await this.$api.saveConnectionConfig(name, configuration)
          .then(() => success.push(true))
          .catch(() => success.push(false))
      })
      if (!success.includes(false)) {
        this.$toast.open({
          message: 'All connections configuration successfully saved!',
          type: 'is-success'
        })
      } else this.errorToast()
      this.snackbar = false
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
