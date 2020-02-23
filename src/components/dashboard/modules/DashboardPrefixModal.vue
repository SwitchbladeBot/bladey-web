<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ module.displayName }}</p>
      <button class="delete" aria-label="close" @click="$parent.close()"></button>
    </header>
    <section class="modal-card-body">
      <b-field>
        <b-input
          v-model="moduleValues.prefix"
          ref="prefix"
          :maxlength="module.input.prefix.max"
          placeholder="Prefix used to execute commands. Ex.: s!"
          required>
        </b-input>
      </b-field>
      <b-switch v-model="moduleValues.spacePrefix">Ignore spaces after prefix</b-switch>
    </section>
    <footer class="modal-card-foot module-card-footer">
      <b-button type="is-primary" :loading="saving" :disabled="!changed" @click="save()">Save</b-button>
    </footer>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'DashboardPrefixModal',
  props: [ 'guild', 'module', 'saveCallback' ],
  data () {
    return {
      saving: false,
      moduleValues: JSON.parse(JSON.stringify(this.module.values))
    }
  },
  computed: {
    changed () {
      return !_.isEqual(this.moduleValues, this.module.values) && this.$refs.prefix.checkHtml5Validity()
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
