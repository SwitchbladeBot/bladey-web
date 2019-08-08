<template>
  <div>
    <section v-if="loaded">
      <div class="columns">
        <div class="column is-narrow">
          <b-field label="Roles">
            <b-select v-model="role.id">
              <option disabled value="">Please select a role</option>
              <option
                v-for="r in roles"
                :value="r.id"
                :key="r.id"
                class="dashboard-option">
                {{ r.name }}
              </option>
            </b-select>
          </b-field>
          <b-checkbox v-model="role.onlyBots" id="onlyBots" type="checkbox" value="onlyBots">
            <label for="onlyBots">Role only for bots?</label>
          </b-checkbox>
          <a class="button is-small is-green" @click="pushRole">
              <span>Add</span>
          </a>
        </div>
      </div>
    </section>
    <b-loading :active="!loaded" />
  </div>
</template>

<script>
export default {
  name: 'DashboardAutoRole',
  props: [ 'guild' ],
  data: () => ({
    loaded: false,
    snackbar: false,
    roles: null,
    automaticRoles: null,
    role: {},
    rolesToPush: []
  }),
  mounted () {
    Promise.all([
      this.$api.guildRoles(this.guild.id).then(({ roles }) => {
        this.roles = roles
      }),
      this.$api.guildConfiguration(this.guild.id).then(({ automaticRoles }) => {
        this.automaticRoles = automaticRoles
      })
    ]).catch(e => this.errorToast())
      .then(() => { this.loaded = true })
  },
  methods: {
    pushRole () {
      if (!this.role.onlyBots) this.role.onlyBots = false
      console.log({ id: this.role.id, onlyBots: this.role.onlyBots })
      this.rolesToPush.push({ id: this.role.id, onlyBots: this.role.onlyBots })
      this.saveSnackbar()
    },
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
      const { rolesToPush } = this
      this.$api.setAutoRoles(this.guild.id, rolesToPush)
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

<style scoped>
.dashboard-option {
  color: #fff;
  background-color: #484B52;
}
</style>
