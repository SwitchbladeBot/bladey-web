<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ module.displayName }}</p>
      <button class="delete" aria-label="close" @click="$parent.close()"></button>
    </header>
    <section class="modal-card-body">
      <b-field>
        <template slot="label">
          Kick message
          <b-tooltip type="is-primary" label="You can use placeholder expressions. Ex. {server}">
            <b-icon size="is-small" icon="information-outline"></b-icon>
          </b-tooltip>
        </template>
        <PlaceholderInput
          v-model="moduleValues.message"
          field="name"
          :data="module.input.placeholders"
          :maxlength="module.input.message.max"
          placeholder="You've been kicked from {server} because the join lock is enabled. Please try joining again later.">
          <template slot="header">
            <strong class="placeholder-header">Placeholders</strong>
          </template>
          <template slot-scope="props">
            <span v-pre>{</span>{{ props.option.name }}<span v-pre>}</span>
            <small>{{ props.option.description }}</small>
          </template>
          <template slot="empty" slot-scope="props">
            No results found for {{ props.value }}
          </template>
        </PlaceholderInput>
      </b-field>
    </section>
    <footer class="modal-card-foot module-card-footer">
      <b-button type="is-primary" :loading="saving" :disabled="!changed" @click="save()">Save</b-button>
    </footer>
  </div>
</template>

<script>
import _ from 'lodash'
import PlaceholderInput from '../util/PlaceholderInput'

export default {
  name: 'DashboardJoinLockModal',
  props: [ 'guild', 'module', 'saveCallback' ],
  components: { PlaceholderInput },
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
.placeholder-header {
  color: white;
}
</style>
