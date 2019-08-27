<template>
  <div>
    <section v-if="loaded">
      <div class="columns">
        <div class="column is-narrow">
          <b-field label="Join Lock Message">
            <b-input v-model="joinLockMessage" @input="saveSnackbar" type="textarea" maxlength="200" />
          </b-field>
        </div>
      </div>
    </section>
    <b-loading :active="!loaded" />
  </div>
</template>

<script>
export default {
  name: 'DashboardModeration',
  props: [ 'guild' ],
  data: () => ({
    loaded: false,
    snackbar: false,
    joinLockMessage: null
  }),
  mounted () {
    Promise.all([
      this.$api.guildConfiguration(this.guild.id).then(({ joinLockMessage }) => {
        this.joinLockMessage = joinLockMessage
      })
    ]).catch(e => this.errorToast())
      .then(() => { this.loaded = true })
  },
  methods: {
    saveSnackbar () {
      if (this.snackbar) return
      this.snackbar = true
      const snackbar = this.$snackbar.open({
        message: 'You have unsaved changes!',
        position: 'is-top',
        type: 'is-primary',
        actionText: 'Save',
        duration: 10000,
        onAction: () => this.save()
      })

      const self = this
      snackbar.realClose = snackbar.close
      snackbar.close = function (...args) {
        self.snackbar = false
        this.realClose(...args)
      }
    },
    save () {
      const { joinLockMessage } = this
      this.$api.saveGuildConfiguration(this.guild.id, { joinLockMessage })
        .then(() => {
          this.$toast.open({
            message: 'Server configuration saved!',
            type: 'is-success'
          })
        })
        .catch(e => this.errorToast())
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
