<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ module.displayName }}</p>
      <button class="delete" aria-label="close" @click="$parent.close()"></button>
    </header>
    <section class="modal-card-body">
      <b-field label="Kick message">
        <b-input
          v-model="moduleValues.message"
          :maxlength="module.input.message.max"
          type="textarea"
          placeholder="You've been kicked from {server} because the join lock is enabled. Please try joining again later.">
        </b-input>
      </b-field>
    </section>
    <footer class="modal-card-foot module-card-footer">
      <b-button type="is-primary" :loading="saving" :disabled="!changed" @click="save()">Save</b-button>
    </footer>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'DashboardJoinLockModal',
  props: [ 'guild', 'module', 'saveCallback' ],
  data () {
    return {
      saving: false,
      moduleValues: JSON.parse(JSON.stringify(this.module.values))
    }
  },
  computed: {
    changed () {
      return !_.isEqual(this.moduleValues, this.module.values)
    }
  },
  methods: {
    save () {
      this.saving = true
      this.saveCallback(this.module, this.moduleValues)
    }
  }
}
</script>

<style scoped>

</style>
