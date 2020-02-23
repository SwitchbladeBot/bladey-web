<template>
  <div class="auto-role-modal modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ module.displayName }}</p>
      <button class="delete" aria-label="close" @click="$parent.close()"></button>
    </header>
    <section class="modal-card-body">
      <b-field>
        <template slot="label">
          User roles
          <p><small>These roles will automatically be given to users when they join the server.</small></p>
        </template>
        <b-taginput
          v-model="moduleValues.userRoles"
          :data="filteredUserRoles"
          autocomplete
          field="name"
          icon="label"
          placeholder="Add a role"
          type="is-primary"
          @typing="getFilteredUserRoles">
          <template slot="empty">No results</template>
        </b-taginput>
      </b-field>
      <b-field>
        <template slot="label">
          Bot roles
          <p><small>These roles will automatically be given to bots when they join the server.</small></p>
        </template>
        <b-taginput
          v-model="moduleValues.botRoles"
          :data="filteredBotRoles"
          autocomplete
          field="name"
          icon="label"
          placeholder="Add a role"
          type="is-primary"
          @typing="getFilteredBotRoles">
          <template slot="empty">No results</template>
        </b-taginput>
      </b-field>
    </section>
    <footer class="modal-card-foot module-card-footer">
      <b-button type="is-primary" :loading="this.saving" :disabled="!changed" @click="save()">Save</b-button>
    </footer>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'DashboardAutoRoleModal',
  props: [ 'guild', 'module', 'saveCallback' ],
  data () {
    return {
      saving: false,
      moduleValues: JSON.parse(JSON.stringify(this.module.values)),
      filteredUserRoles: this.module.input.roles,
      filteredBotRoles: this.module.input.roles
    }
  },
  computed: {
    changed () {
      return !_.isEqual(this.parseSave(), this.module.values)
    }
  },
  methods: {
    save () {
      this.saving = true
      this.saveCallback(this.module, this.parseSave())
    },
    parseSave () {
      return {
        userRoles: this.moduleValues.userRoles.map(r => r.id),
        botRoles: this.moduleValues.botRoles.map(r => r.id)
      }
    },
    filter (text) {
      return r => r.name
        .toLowerCase()
        .includes(text.toLowerCase())
    },
    getFilteredUserRoles (text) {
      this.filteredUserRoles = this.module.input.roles.filter(this.filter(text))
    },
    getFilteredBotRoles (text) {
      this.filteredBotRoles = this.module.input.roles.filter(this.filter(text))
    },
    parseRoles () {
      const mapF = i => this.module.input.roles.find(r => r.id === i)
      this.moduleValues.userRoles = this.moduleValues.userRoles.map(mapF)
      this.moduleValues.botRoles = this.moduleValues.botRoles.map(mapF)
    }
  },
  mounted () {
    this.parseRoles()
  }
}
</script>

<style scoped>
.modal .field small {
  font-weight: 400;
}
</style>
